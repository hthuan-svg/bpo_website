// Applies the documented data-binding attributes to a page or cloned template.
function findValue(source, path) {
  return path.split('.').reduce((value, key) => (
    value !== null && typeof value === 'object' ? value[key] : undefined
  ), source);
}

function safeUrl(value) {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  const normalized = trimmed.replace(/[\u0000-\u0020]/g, '');
  const scheme = normalized.match(/^([a-z][a-z\d+.-]*):/i)?.[1]?.toLowerCase();
  if (scheme && !['http', 'https', 'mailto', 'tel'].includes(scheme)) {
    return '';
  }
  return trimmed;
}

function sanitizedMarkup(markup) {
  const parsed = new DOMParser().parseFromString(markup, 'text/html');
  const allowedTags = new Set(['B', 'I', 'EM', 'STRONG', 'BR', 'A']);

  function copyNode(node, parent) {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.append(document.createTextNode(node.nodeValue ?? ''));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const sourceElement = node;
    if (!allowedTags.has(sourceElement.tagName)) {
      sourceElement.childNodes.forEach((child) => copyNode(child, parent));
      return;
    }

    const safeElement = document.createElement(sourceElement.tagName.toLowerCase());
    if (sourceElement.tagName === 'A') {
      const href = safeUrl(sourceElement.getAttribute('href') ?? '');
      if (href) {
        safeElement.setAttribute('href', href);
      }
    }
    sourceElement.childNodes.forEach((child) => copyNode(child, safeElement));
    parent.append(safeElement);
  }

  const fragment = document.createDocumentFragment();
  parsed.body.childNodes.forEach((node) => copyNode(node, fragment));
  return fragment;
}

function applyImage(element, slotName, images, language) {
  const slot = images.slots?.[slotName];
  if (!slot) {
    console.warn(`Missing image slot "${slotName}".`);
    return;
  }
  element.src = slot.src;
  element.alt = slot.alt?.[language] ?? slot.alt?.vi ?? '';
}

function applyBackground(element, slotName, images) {
  const slot = images.slots?.[slotName];
  if (!slot) {
    console.warn(`Missing image slot "${slotName}".`);
    return;
  }
  const src = safeUrl(slot.src);
  if (src) {
    element.style.backgroundImage = `url("${src.replace(/["\\\n\r]/g, '\\$&')}")`;
  }
}

function applyConfig(element, value) {
  const configValue = value === null || value === undefined ? '' : String(value);
  element.hidden = configValue === '';
  if (element instanceof HTMLAnchorElement) {
    const href = safeUrl(configValue);
    if (href) {
      element.setAttribute('href', href);
    } else {
      element.removeAttribute('href');
    }
    return;
  }
  if (element instanceof HTMLImageElement || element instanceof HTMLIFrameElement) {
    const src = safeUrl(configValue);
    if (src) {
      element.setAttribute('src', src);
    } else {
      element.removeAttribute('src');
    }
    return;
  }
  element.textContent = configValue;
}

function resolveConfigOrContent(path, context) {
  const configValue = findValue(context.siteConfig, path);
  if (configValue !== undefined) {
    return configValue;
  }
  return context.t(path);
}

function bindList(element, context) {
  const template = Array.from(element.children).find((child) => (
    child instanceof HTMLTemplateElement
  ));
  if (!template) {
    console.warn(`data-list="${element.dataset.list}" has no direct <template>.`);
    return;
  }

  element.querySelectorAll(':scope > [data-rendered-item]').forEach((item) => item.remove());
  const items = context.t(element.dataset.list);
  if (!Array.isArray(items)) {
    console.warn(`data-list="${element.dataset.list}" did not resolve to an array.`);
    return;
  }

  items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelectorAll('[data-field]').forEach((field) => {
      const value = field.dataset.field === '.' && typeof item === 'string'
        ? item
        : findValue(item, field.dataset.field);
      field.textContent = value === null || value === undefined ? '' : String(value);
    });
    fragment.querySelectorAll('[data-img-field]').forEach((image) => {
      const slotName = image.dataset.imgField === '.' && typeof item === 'string'
        ? item
        : findValue(item, image.dataset.imgField);
      if (typeof slotName === 'string') {
        applyImage(image, slotName, context.images, context.language);
      }
    });
    fragment.querySelectorAll('[data-link-field]').forEach((link) => {
      const value = findValue(item, link.dataset.linkField);
      const href = safeUrl(value);
      if (link instanceof HTMLAnchorElement && href) {
        link.setAttribute('href', href);
      } else if (link instanceof HTMLAnchorElement) {
        link.removeAttribute('href');
      }
    });
    fragment.querySelectorAll('[data-map-field]').forEach((link) => {
      const address = findValue(item, link.dataset.mapField);
      if (link instanceof HTMLAnchorElement && typeof address === 'string' && address.trim()) {
        const mapUrl = new URL('https://www.google.com/maps/search/');
        mapUrl.searchParams.set('api', '1');
        mapUrl.searchParams.set('query', address);
        link.href = mapUrl.href;
      } else if (link instanceof HTMLAnchorElement) {
        link.removeAttribute('href');
      }
    });

    const renderedNodes = Array.from(fragment.childNodes).filter((node) => (
      node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim()
    ));
    renderedNodes.forEach((node) => {
      if (node instanceof Element) {
        node.dataset.renderedItem = '';
      }
    });
    element.append(...renderedNodes);
  });
}

export function renderPage(context, root = document) {
  root.querySelectorAll('[data-list]').forEach((element) => bindList(element, context));

  root.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = context.t(element.dataset.i18n);
    element.textContent = value === null || value === undefined ? '' : String(value);
  });

  root.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const value = context.t(element.dataset.i18nHtml);
    element.replaceChildren(
      sanitizedMarkup(value === null || value === undefined ? '' : String(value))
    );
  });

  root.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(',').forEach((binding) => {
      const separator = binding.indexOf(':');
      if (separator < 1) {
        console.warn(`Invalid data-i18n-attr binding "${binding}".`);
        return;
      }
      const attribute = binding.slice(0, separator).trim();
      const path = binding.slice(separator + 1).trim();
      const value = context.t(path);
      if (attribute && value !== null && value !== undefined) {
        element.setAttribute(attribute, String(value));
      }
    });
  });

  root.querySelectorAll('[data-img]').forEach((element) => {
    applyImage(element, element.dataset.img, context.images, context.language);
  });

  root.querySelectorAll('[data-bg]').forEach((element) => {
    applyBackground(element, element.dataset.bg, context.images);
  });

  root.querySelectorAll('[data-config]').forEach((element) => {
    applyConfig(element, findValue(context.siteConfig, element.dataset.config));
  });

  root.querySelectorAll('[data-show-if]').forEach((element) => {
    const value = resolveConfigOrContent(element.dataset.showIf, context);
    element.hidden = value === '' || value === null || value === undefined || value === false;
  });
}
