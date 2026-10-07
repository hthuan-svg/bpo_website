// Renders the three service pages from localized content and image slots.
function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = String(text);
  }
  return element;
}

function getSlot(context, slotName) {
  const slot = context.images.slots?.[slotName];
  if (!slot) {
    console.warn(`Missing image slot "${slotName}".`);
    return null;
  }
  return slot;
}

function createImage(context, slotName, className = '') {
  const slot = getSlot(context, slotName);
  if (!slot) {
    return null;
  }

  const image = createElement('img', className);
  image.src = slot.src;
  image.alt = slot.alt?.[context.language] ?? slot.alt?.vi ?? '';
  image.loading = 'lazy';
  return image;
}

function createSectionHeading(context, titleKey, leadKey, level = 'h1') {
  const header = createElement('header', 'section-heading services-heading');
  header.dataset.reveal = '';
  header.append(
    createElement('p', 'eyebrow', context.t('services.page_title')),
    createElement(level, 'section-title', context.t(titleKey))
  );
  if (leadKey) {
    header.append(createElement('p', 'section-lead', context.t(leadKey)));
  }
  return header;
}

function createContactCta(context) {
  const section = createElement('section', 'services-cta section-shell');
  const link = createElement('a', 'button button--primary', context.t('ui.nav.contact'));
  link.href = 'contact.html';
  section.append(link);
  return section;
}

function createOverviewCard(context, { titleKey, leadKey, slotName, href }) {
  const link = createElement('a', 'services-overview-card');
  link.href = href;
  link.dataset.reveal = '';
  const slot = getSlot(context, slotName);
  if (slot) {
    const escapedSrc = slot.src.replace(/["\\\n\r]/g, '\\$&');
    link.style.backgroundImage = `linear-gradient(90deg, rgba(14, 26, 18, .82), rgba(14, 26, 18, .2)), url("${escapedSrc}")`;
  }

  const copy = createElement('span', 'services-overview-card__copy');
  copy.append(
    createElement('span', 'services-overview-card__title', context.t(titleKey)),
    createElement('span', 'services-overview-card__lead', context.t(leadKey))
  );
  link.append(copy, createElement('span', 'services-overview-card__arrow', '↗'));
  return link;
}

function createArrow() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 80 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('services-diagram__arrow');

  const line = document.createElementNS(svg.namespaceURI, 'line');
  line.setAttribute('x1', '2');
  line.setAttribute('y1', '12');
  line.setAttribute('x2', '70');
  line.setAttribute('y2', '12');
  line.setAttribute('stroke', 'currentColor');
  line.setAttribute('stroke-width', '2');

  const point = document.createElementNS(svg.namespaceURI, 'path');
  point.setAttribute('d', 'M 62 4 L 72 12 L 62 20');
  point.setAttribute('fill', 'none');
  point.setAttribute('stroke', 'currentColor');
  point.setAttribute('stroke-width', '2');

  svg.append(line, point);
  return svg;
}

function renderOverview(context, main) {
  const intro = createElement('section', 'services-overview section-shell');
  const container = createElement('div', 'page-container');
  container.append(
    createSectionHeading(context, 'services.page_title', 'services.lead'),
    createElement('p', 'services-overview__note', context.t('services.overview_note'))
  );

  const cards = createElement('div', 'services-overview__cards');
  cards.append(
    createOverviewCard(context, {
      titleKey: 'services.annotation.title',
      leadKey: 'services.annotation.lead',
      slotName: 'background_services_3d',
      href: 'services-annotation.html'
    }),
    createOverviewCard(context, {
      titleKey: 'services.collection.title',
      leadKey: 'services.collection.lead',
      slotName: 'background_services_2d',
      href: 'services-collection.html'
    })
  );
  container.append(cards);

  const diagram = createElement('div', 'services-diagram');
  diagram.setAttribute('role', 'group');
  diagram.setAttribute('aria-label', context.t('services.page_title'));
  [
    ['services.diagram.lidar_source', 'services.diagram.target_3d'],
    ['services.diagram.dashcam_source', 'services.diagram.target_2d']
  ].forEach(([sourceKey, targetKey]) => {
    const row = createElement('div', 'services-diagram__row');
    row.append(
      createElement('span', 'services-diagram__label', context.t(sourceKey)),
      createArrow(),
      createElement('span', 'services-diagram__label', context.t(targetKey))
    );
    diagram.append(row);
  });
  container.append(diagram);
  intro.append(container);
  main.append(intro);
}

function createLightbox(context) {
  const dialog = createElement('dialog', 'services-lightbox');
  dialog.setAttribute('aria-labelledby', 'services-lightbox-title');
  const title = createElement(
    'h2',
    'services-lightbox__title',
    context.t('services.annotation.title')
  );
  title.id = 'services-lightbox-title';
  const form = createElement('form', 'services-lightbox__form');
  form.method = 'dialog';
  const closeButton = createElement(
    'button',
    'services-lightbox__close',
    context.t('services.lightbox.close_image')
  );
  closeButton.type = 'submit';
  const image = createElement('img', 'services-lightbox__image');
  image.alt = '';
  form.append(closeButton, image);
  dialog.append(title, form);

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return dialog;
}

function createAnnotationItem(context, item, dialog) {
  const article = createElement('article', 'service-item card');
  article.dataset.reveal = '';
  article.append(
    createElement('h3', 'service-item__title', item.title),
    createElement('p', 'service-item__text', item.text)
  );

  const images = createElement('div', 'service-item__images');
  (Array.isArray(item.images) ? item.images.slice(0, 2) : []).forEach((slotName) => {
    if (typeof slotName !== 'string') {
      return;
    }
    const button = createElement('button', 'service-item__image-button');
    button.type = 'button';
    const image = createImage(context, slotName, 'service-item__image');
    if (!image) {
      return;
    }
    button.append(image);
    button.addEventListener('click', () => {
      const lightboxImage = dialog.querySelector('.services-lightbox__image');
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      dialog.showModal();
    });
    images.append(button);
  });
  article.append(images);
  return article;
}

function createAnnotationGroup(context, group, titleKey, items, dialog) {
  const section = createElement('section', 'service-group section-shell');
  section.setAttribute('aria-label', context.t(titleKey));
  const container = createElement('div', 'page-container');
  container.append(createElement('h2', 'section-title service-group__title', context.t(titleKey)));
  const grid = createElement('div', 'service-items');
  items
    .filter((item) => item.group === group)
    .forEach((item) => grid.append(createAnnotationItem(context, item, dialog)));
  container.append(grid);
  section.append(container);
  return section;
}

function renderAnnotation(context, main) {
  const content = context.t('services.annotation');
  const intro = createElement('section', 'service-intro section-shell');
  const introContainer = createElement('div', 'page-container');
  introContainer.append(createSectionHeading(
    context,
    'services.annotation.title',
    'services.annotation.lead'
  ));
  intro.append(introContainer);
  main.append(intro);

  const dialog = createLightbox(context);
  const items = Array.isArray(content?.items) ? content.items : [];
  main.append(
    createAnnotationGroup(context, '3d', 'services.annotation.group_3d', items, dialog),
    createAnnotationGroup(context, '2d', 'services.annotation.group_2d', items, dialog)
  );

  const quality = content?.quality ?? {};
  const qualitySection = createElement('section', 'service-quality section-shell');
  const qualityContainer = createElement('div', 'page-container service-quality__layout');
  const qualityCopy = createElement('div', 'service-quality__copy');
  qualityCopy.dataset.reveal = '';
  qualityCopy.append(
    createElement('h2', 'section-title', quality.title ?? ''),
    createElement('p', 'section-lead', quality.text ?? '')
  );
  const qualityImage = createImage(context, quality.image, 'service-quality__image');
  if (qualityImage) {
    qualityImage.dataset.reveal = '';
    qualityContainer.append(qualityCopy, qualityImage);
  } else {
    qualityContainer.append(qualityCopy);
  }
  qualitySection.append(qualityContainer);
  main.append(qualitySection, createContactCta(context), dialog);
}

function createCollectionItem(context, item) {
  const article = createElement('article', 'collection-item card');
  article.dataset.reveal = '';
  const image = createImage(context, item.image, 'collection-item__image');
  if (image) {
    article.append(image);
  }
  const body = createElement('div', 'collection-item__body');
  body.append(
    createElement('h2', 'collection-item__title', item.title),
    createElement('p', '', item.text)
  );
  article.append(body);
  return article;
}

function renderCollection(context, main) {
  const content = context.t('services.collection');
  const section = createElement('section', 'service-collection section-shell');
  const container = createElement('div', 'page-container');
  container.append(createSectionHeading(
    context,
    'services.collection.title',
    'services.collection.lead'
  ));

  const items = createElement('div', 'collection-items');
  (Array.isArray(content?.items) ? content.items : []).forEach((item) => {
    items.append(createCollectionItem(context, item));
  });
  container.append(items);

  const todo = content?.todo;
  if (typeof todo === 'string') {
    if (todo.startsWith('[') || todo.startsWith('【')) {
      const callout = createElement('aside', 'service-collection__callout', todo);
      callout.setAttribute('role', 'note');
      container.append(callout);
    }
  }
  section.append(container);
  main.append(section, createContactCta(context));
}

export function renderServices(context) {
  const main = document.querySelector('#main');
  if (!main) {
    return;
  }

  const page = document.body.dataset.page;
  if (!['services', 'services-annotation', 'services-collection'].includes(page)) {
    return;
  }
  main.replaceChildren();

  if (page === 'services') {
    renderOverview(context, main);
  } else if (page === 'services-annotation') {
    renderAnnotation(context, main);
  } else {
    renderCollection(context, main);
  }
}
