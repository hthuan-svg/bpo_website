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

function createList(items) {
  const list = document.createElement('ul');
  list.className = 'annotation-row__list';
  (Array.isArray(items) ? items : []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = String(item ?? '');
    list.append(li);
  });
  return list;
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
  if (Number.isInteger(slot.width) && Number.isInteger(slot.height)) {
    image.width = slot.width;
    image.height = slot.height;
  }
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
  image.width = 1200;
  image.height = 800;
  image.loading = 'lazy';
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
      lightboxImage.width = image.width;
      lightboxImage.height = image.height;
      dialog.showModal();
    });
    images.append(button);
  });
  article.append(images);
  return article;
}

function attachLightbox(button, image, dialog) {
  button.type = 'button';
  button.addEventListener('click', () => {
    const lightboxImage = dialog.querySelector('.services-lightbox__image');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxImage.width = image.width;
    lightboxImage.height = image.height;
    dialog.showModal();
  });
}

function createAnnotationRow(context, modality, type, index, dialog) {
  const layout = context.siteConfig?.layout?.annotationRows === 'zigzag' && index % 2 === 1
    ? 'zigzag'
    : 'image-left';
  const row = createElement('article', 'annotation-row');
  row.dataset.reveal = '';
  if (layout === 'zigzag') {
    row.classList.add('annotation-row--reverse');
  }

  const media = createElement('div', 'annotation-row__media');
  const gallery = createElement('div', 'annotation-row__gallery');
  const buttons = [];

  (Array.isArray(type.images) ? type.images : []).forEach((slotName) => {
    const image = createImage(context, slotName, 'annotation-row__image');
    if (!image) {
      return;
    }

    const button = createElement('button', 'annotation-row__image-button');
    attachLightbox(button, image, dialog);
    button.append(image);
    gallery.append(button);
    buttons.push(button);
  });

  if (buttons.length) {
    media.append(gallery);
    const captions = Array.isArray(type.captions) ? type.captions : [];
    captions.forEach((caption, captionIndex) => {
      if (captionIndex >= buttons.length) {
        return;
      }
      const chip = createElement('span', 'annotation-row__caption', caption);
      media.append(chip);
    });
  }

  const copy = createElement('div', 'annotation-row__copy');
  copy.append(
    createElement('span', 'annotation-row__index', String(index + 1).padStart(2, '0')),
    createElement('span', 'annotation-row__kicker', modality.label),
    createElement('p', 'annotation-row__name', type.name ?? ''),
    createElement('h3', 'annotation-row__title', type.title ?? ''),
    createElement('p', 'annotation-row__summary', type.summary ?? ''),
    createList(type.points ?? [])
  );

  row.append(media, copy);
  return row;
}

function createAnnotationTabs(context, tabsContent) {
  const nav = createElement('nav', 'annotation-tabs');
  nav.setAttribute('aria-label', context.t('ui.tabs_label'));
  nav.dataset.annotationTabs = 'true';

  const tabIds = ['modalities', 'workflow', 'quality', 'usecases'];
  tabIds.forEach((id) => {
    const label = tabsContent?.[id];
    if (!label) {
      return;
    }

    const link = createElement('a', 'annotation-tab');
    link.href = `#${id}`;
    link.dataset.annotationTab = id;
    link.textContent = label;
    link.setAttribute('aria-current', 'false');
    nav.append(link);
  });

  return nav;
}

function activateAnnotationTab(targetId) {
  const tabs = document.querySelectorAll('.annotation-tab');
  tabs.forEach((tab) => {
    const isActive = tab.dataset.annotationTab === targetId;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function bindAnnotationTabs() {
  const tabs = document.querySelectorAll('.annotation-tab');
  const sections = document.querySelectorAll('[data-annotation-section]');
  if (!tabs.length || !sections.length) {
    return;
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    const header = document.querySelector('.site-header');
    const offset = (header?.offsetHeight ?? 72) + 16;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = tab.dataset.annotationTab;
      if (!targetId) {
        return;
      }
      activateAnnotationTab(targetId);
      scrollToSection(targetId);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = [...entries]
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) {
      return;
    }
    activateAnnotationTab(visible[0].target.id);
  }, {
    rootMargin: '-25% 0px -55% 0px',
    threshold: [0.15, 0.3, 0.6]
  });

  sections.forEach((section) => observer.observe(section));
}

function createAnnotationModality(context, modality, dialog, index) {
  const section = createElement('section', 'annotation-modality section-shell');
  if (index === 1) {
    section.classList.add('annotation-modality--soft');
  }

  const container = createElement('div', 'page-container');
  const header = createElement('header', 'annotation-modality__header');
  header.append(
    createElement('span', 'annotation-modality__label', modality.label ?? ''),
    createElement('span', 'annotation-modality__tag', modality.tag ?? ''),
    createElement('h2', 'section-title annotation-modality__title', modality.title ?? '')
  );
  if (modality.text) {
    header.append(createElement('p', 'annotation-modality__lead', modality.text));
  }
  container.append(header);

  const rows = createElement('div', 'annotation-rows');
  (Array.isArray(modality.types) ? modality.types : []).forEach((type, typeIndex) => {
    rows.append(createAnnotationRow(context, modality, type, typeIndex, dialog));
  });
  container.append(rows);
  section.append(container);
  return section;
}

function createAnnotationWorkflow(context) {
  const section = createElement('section', 'annotation-workflow section-shell');
  section.id = 'workflow';
  section.dataset.annotationSection = 'workflow';

  const container = createElement('div', 'page-container');
  const heading = createElement('header', 'annotation-section-heading');
  heading.append(
    createElement('p', 'eyebrow', context.t('services.annotation.tabs.workflow')),
    createElement('h2', 'section-title', context.t('services.annotation.workflow.title'))
  );
  if (context.t('services.annotation.workflow.lead')) {
    heading.append(createElement('p', 'section-lead', context.t('services.annotation.workflow.lead')));
  }
  container.append(heading);

  const steps = createElement('ol', 'annotation-workflow__steps');
  const workflow = context.t('services.annotation.workflow');
  (Array.isArray(workflow?.steps) ? workflow.steps : []).forEach((step, index) => {
    const item = createElement('li', 'annotation-workflow__step');
    const label = createElement('span', 'annotation-workflow__number', String(index + 1).padStart(2, '0'));
    const copy = createElement('div', 'annotation-workflow__copy');
    copy.append(
      createElement('h3', 'annotation-workflow__title', step.title ?? ''),
      createElement('p', 'annotation-workflow__text', step.text ?? '')
    );
    item.append(label, copy);
    steps.append(item);
  });
  container.append(steps);
  section.append(container);
  return section;
}

function createAnnotationQualitySection(context) {
  const section = createElement('section', 'annotation-quality section-shell');
  section.id = 'quality';
  section.dataset.annotationSection = 'quality';

  const container = createElement('div', 'page-container');
  const heading = createElement('header', 'annotation-section-heading');
  heading.append(
    createElement('p', 'eyebrow', context.t('services.annotation.tabs.quality')),
    createElement('h2', 'section-title', context.t('services.annotation.quality.title'))
  );
  container.append(heading);
  section.append(container);
  return section;
}

function createAnnotationUsecases(context) {
  const section = createElement('section', 'annotation-usecases section-shell');
  section.id = 'usecases';
  section.dataset.annotationSection = 'usecases';

  const container = createElement('div', 'page-container');
  const heading = createElement('header', 'annotation-section-heading');
  heading.append(
    createElement('p', 'eyebrow', context.t('services.annotation.tabs.usecases')),
    createElement('h2', 'section-title', context.t('services.annotation.usecases.title'))
  );
  container.append(heading);

  const grid = createElement('div', 'annotation-usecases__grid');
  const usecases = context.t('services.annotation.usecases');
  (Array.isArray(usecases?.items) ? usecases.items : []).forEach((item) => {
    const card = createElement('article', 'annotation-usecase');
    card.append(
      createElement('span', 'annotation-usecase__index', '↗'),
      createElement('h3', 'annotation-usecase__title', item.title ?? ''),
      createElement('p', 'annotation-usecase__text', item.text ?? '')
    );
    grid.append(card);
  });
  container.append(grid);
  section.append(container);
  return section;
}

function createAnnotationSecurity(context) {
  const section = createElement('section', 'annotation-security');
  const container = createElement('div', 'page-container');
  const strip = createElement('div', 'annotation-security__strip');
  strip.append(
    createElement('span', 'annotation-security__label', context.t('services.annotation.security.title')),
    createElement('p', 'annotation-security__text', context.t('services.annotation.security.text'))
  );
  container.append(strip);
  section.append(container);
  return section;
}

function createAnnotationCta(context) {
  const section = createElement('section', 'annotation-cta');
  const container = createElement('div', 'page-container');
  const band = createElement('div', 'annotation-cta__band');
  const copy = createElement('div', 'annotation-cta__copy');
  copy.append(
    createElement('p', 'eyebrow', context.t('ui.nav.contact')),
    createElement('h2', 'annotation-cta__title', context.t('services.annotation.cta.title')),
    createElement('p', 'annotation-cta__text', context.t('services.annotation.cta.text'))
  );
  const link = createElement('a', 'button button--primary', context.t('services.annotation.cta.button'));
  link.href = 'contact.html';
  band.append(copy, link);
  container.append(band);
  section.append(container);
  return section;
}

function renderAnnotation(context, main) {
  const content = context.t('services.annotation');
  const dialog = createLightbox(context);

  const hero = createElement('section', 'annotation-hero section-shell');
  const heroContainer = createElement('div', 'page-container');
  heroContainer.append(createSectionHeading(
    context,
    'services.annotation.title',
    'services.annotation.lead'
  ));
  const highlights = createElement('ul', 'annotation-highlights');
  (Array.isArray(content?.highlights) ? content.highlights : []).forEach((item) => {
    const highlight = createElement('li', 'annotation-highlight');
    highlight.append(
      createElement('strong', 'annotation-highlight__title', item.title ?? ''),
      createElement('span', 'annotation-highlight__text', item.text ?? '')
    );
    highlights.append(highlight);
  });
  heroContainer.append(highlights);
  hero.append(heroContainer);

  const tabs = createAnnotationTabs(context, content?.tabs ?? {});
  const modalitiesWrapper = createElement('div', 'annotation-modalities');
  modalitiesWrapper.id = 'modalities';
  modalitiesWrapper.dataset.annotationSection = 'modalities';
  (Array.isArray(content?.modalities) ? content.modalities : []).forEach((modality, index) => {
    modalitiesWrapper.append(createAnnotationModality(context, modality, dialog, index));
  });

  main.append(
    hero,
    tabs,
    modalitiesWrapper,
    createAnnotationWorkflow(context),
    createAnnotationQualitySection(context),
    createAnnotationUsecases(context),
    createAnnotationSecurity(context),
    createAnnotationCta(context),
    dialog
  );

  bindAnnotationTabs();
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
