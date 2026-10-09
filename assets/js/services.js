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
  if (slot.placeholder) {
    image.classList.add('is-placeholder');
    image.dataset.placeholderLabel = context.t('ui.image_placeholder');
  }
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

function createServiceNavigation(context, page) {
  const isAnnotation = page === 'services-annotation';
  const isCollection = page === 'services-collection';
  const isDataEngineering = page === 'services-data-engineering';
  const breadcrumbs = [
    { key: 'ui.nav.home', href: 'index.html' },
    { key: 'ui.nav.services', href: page === 'services' ? undefined : 'services.html' }
  ];
  if (isAnnotation || isCollection || isDataEngineering) {
    breadcrumbs.push({
      key: isAnnotation
        ? 'ui.nav.services_annotation'
        : isCollection
          ? 'ui.nav.services_collection'
          : 'ui.nav.services_data_engineering'
    });
  }

  const wrapper = createElement('div', 'service-page-navigation page-container');
  const breadcrumb = createElement('nav', 'service-breadcrumb');
  breadcrumb.setAttribute('aria-label', context.t('ui.breadcrumb'));
  const breadcrumbList = createElement('ol', 'service-breadcrumb__list');
  breadcrumbs.forEach((item, index) => {
    const listItem = createElement('li', 'service-breadcrumb__item');
    if (index === breadcrumbs.length - 1 && !item.href) {
      const current = createElement('span', 'service-breadcrumb__current', context.t(item.key));
      current.setAttribute('aria-current', 'page');
      listItem.append(current);
    } else {
      const link = createElement('a', '', context.t(item.key));
      link.href = item.href;
      listItem.append(link);
    }
    breadcrumbList.append(listItem);
  });
  breadcrumb.append(breadcrumbList);

  const switchNav = createElement('nav', 'service-page-switch');
  switchNav.setAttribute('aria-label', context.t('ui.nav.services'));
  const switchList = createElement('ul', 'service-page-switch__list');
  [
    { page: 'services-annotation', key: 'ui.nav.services_annotation', href: 'services-annotation.html' },
    { page: 'services-collection', key: 'ui.nav.services_collection', href: 'services-collection.html' },
    { page: 'services-data-engineering', key: 'ui.nav.services_data_engineering', href: 'services-data-engineering.html' }
  ].forEach((item) => {
    const listItem = createElement('li', 'service-page-switch__item');
    const link = createElement('a', 'service-page-switch__link', context.t(item.key));
    link.href = item.href;
    if (item.page === page) {
      link.classList.add('is-current');
      link.setAttribute('aria-current', 'page');
    }
    listItem.append(link);
    switchList.append(listItem);
  });
  switchNav.append(switchList);

  wrapper.append(breadcrumb, switchNav);
  return wrapper;
}

function createContactCta(context) {
  const section = createElement('section', 'services-cta section-shell');
  const link = createElement('a', 'button button--primary', context.t('ui.nav.contact'));
  link.href = 'contact.html';
  section.append(link);
  return section;
}

function createOverviewContactCta(context) {
  const section = createElement('section', 'home-cta-band');
  const inner = createElement('div', 'home-cta-band__inner page-container');
  inner.dataset.reveal = '';

  const copy = createElement('div');
  copy.append(
    createElement('h2', '', context.t('home.cta.title')),
    createElement('p', '', context.t('home.cta.text'))
  );

  const link = createElement('a', 'button button--primary', context.t('home.cta.button'));
  link.href = 'contact.html';
  inner.append(copy, link);
  section.append(inner);
  return section;
}

function createOverviewCard(context, { titleKey, leadKey, slotName, href, statusKey }) {
  const link = createElement('a', 'services-overview-card');
  link.href = href;
  link.dataset.reveal = '';
  const slot = slotName ? getSlot(context, slotName) : null;
  if (slot) {
    const escapedSrc = slot.src.replace(/["\\\n\r]/g, '\\$&');
    link.style.backgroundImage = `linear-gradient(90deg, rgba(14, 26, 18, .82), rgba(14, 26, 18, .2)), url("${escapedSrc}")`;
  } else {
    link.classList.add('services-overview-card--no-image');
  }

  const copy = createElement('span', 'services-overview-card__copy');
  if (statusKey) {
    copy.append(createElement('span', 'services-overview-card__status', context.t(statusKey)));
  }
  copy.append(
    createElement('span', 'services-overview-card__title', context.t(titleKey)),
    createElement('span', 'services-overview-card__lead', context.t(leadKey))
  );
  link.append(copy, createElement('span', 'services-overview-card__arrow', '↗'));
  return link;
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
      slotName: 'services_overview_3d',
      href: 'services-annotation.html',
      statusKey: 'services.status.open'
    }),
    createOverviewCard(context, {
      titleKey: 'services.collection.title',
      leadKey: 'services.collection.lead',
      slotName: 'services_overview_2d',
      href: 'services-collection.html',
      statusKey: 'services.status.open'
    }),
    createOverviewCard(context, {
      titleKey: 'services.data_engineering.title',
      leadKey: 'services.data_engineering.lead',
      href: 'services-data-engineering.html',
      statusKey: 'services.data_engineering.status'
    })
  );
  container.append(cards);

  intro.append(container);
  main.append(intro, createOverviewContactCta(context));
}

function createAnnotationRow(context, modality, type, index) {
  const layout = context.siteConfig?.layout?.annotationRows === 'zigzag' && index % 2 === 1
    ? 'zigzag'
    : 'image-left';
  const row = createElement('article', 'annotation-row');
  row.dataset.reveal = '';
  row.dataset.typeId = type?.id ?? '';
  if (layout === 'zigzag') {
    row.classList.add('annotation-row--reverse');
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

  row.append(copy);
  return row;
}

function createAnnotationSideNav(context, content) {
  const nav = createElement('nav', 'annotation-side-nav');
  nav.setAttribute('aria-label', context.t('ui.on_this_page'));
  const title = createElement('p', 'annotation-side-nav__title', context.t('ui.on_this_page'));
  const list = createElement('ul', 'annotation-side-nav__list');
  const order = Array.isArray(content?.order) && content.order.length ? content.order : ['usecases', 'modalities', 'workflow', 'quality', 'security'];

  order.forEach((id) => {
    const label = context.t(`services.annotation.tabs.${id}`);
    if (!label) {
      return;
    }

    const item = createElement('li', 'annotation-side-nav__item');
    const link = createElement('a', 'annotation-side-nav__link', label);
    link.href = `#${id}`;
    link.dataset.annotationNav = id;
    item.append(link);
    list.append(item);
  });

  nav.append(title, list);
  return nav;
}

function activateAnnotationSideNav(targetId) {
  const links = document.querySelectorAll('.annotation-side-nav__link');
  links.forEach((link) => {
    const isActive = link.dataset.annotationNav === targetId;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function bindAnnotationSideNav() {
  const links = document.querySelectorAll('.annotation-side-nav__link');
  const sections = document.querySelectorAll('[data-annotation-section]');
  if (!links.length || !sections.length) {
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

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.dataset.annotationNav;
      if (!targetId) {
        return;
      }
      activateAnnotationSideNav(targetId);
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
    activateAnnotationSideNav(visible[0].target.id);
  }, {
    rootMargin: '-25% 0px -55% 0px',
    threshold: [0.15, 0.3, 0.6]
  });

  sections.forEach((section) => observer.observe(section));
}

function createAnnotationModality(context, modality, index) {
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
    rows.append(createAnnotationRow(context, modality, type, typeIndex));
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
  const quality = context.t('services.annotation.quality') ?? {};
  const qualityLead = typeof quality.lead === 'string' ? quality.lead : '';
  if (qualityLead) {
    heading.append(createElement('p', 'section-lead', qualityLead));
  }
  container.append(heading);

  const principleItems = Array.isArray(quality.principles) ? quality.principles : [];
  const principles = createElement('div', 'annotation-quality__principles');
  if (principleItems.length) {
    const principlesHeader = createElement('h3', 'annotation-quality__principles-title', quality.principles_title ?? '');
    principles.append(principlesHeader);
    principleItems.forEach((principle) => {
      const card = createElement('article', 'annotation-quality__principle');
      card.append(
        createElement('h4', 'annotation-quality__principle-title', principle.title ?? ''),
        createElement('p', 'annotation-quality__principle-text', principle.text ?? '')
      );
      principles.append(card);
    });
  }

  const flowImage = createImage(context, quality.flow_image, 'annotation-quality__flow-image');
  const flowWrap = createElement('div', 'annotation-quality__flow-image-wrap');
  if (flowImage) {
    flowWrap.append(flowImage);
    if (typeof quality.flow_caption === 'string' && quality.flow_caption.trim()) {
      flowWrap.append(createElement('p', 'annotation-quality__flow-caption', quality.flow_caption));
    }
  }

  container.append(principles, flowWrap);
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
  const section = createElement('section', 'annotation-security section-shell');
  section.id = 'security';
  section.dataset.annotationSection = 'security';

  const container = createElement('div', 'page-container');
  const heading = createElement('header', 'annotation-section-heading');
  heading.append(
    createElement('p', 'eyebrow', context.t('services.annotation.tabs.security')),
    createElement('h2', 'section-title', context.t('services.annotation.security.title'))
  );
  container.append(heading);

  const securityText = createElement('p', 'annotation-security__text', context.t('services.annotation.security.text'));
  const securityImage = createImage(context, context.t('services.annotation.security.image'), 'annotation-security__image');
  const imageWrap = createElement('div', 'annotation-security__image-wrap');
  if (securityImage) {
    imageWrap.append(securityImage);
  }

  const certs = createElement('div', 'certifications-grid');
  const certificationItems = Array.isArray(context.t('certifications.items')) ? context.t('certifications.items') : [];
  certificationItems.forEach((item) => {
    const card = createElement('article', 'home-certification');
    const image = createImage(context, item.image, 'home-certification__image');
    const body = createElement('div', 'home-certification__body');
    body.append(
      createElement('span', 'home-certification__code', item.code ?? ''),
      createElement('strong', 'home-certification__name', item.name ?? '')
    );
    if (image) {
      card.append(image);
    }
    card.append(body);
    certs.append(card);
  });

  container.append(securityText, imageWrap, certs);
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

function createAnnotationMarquee(context, slotNames) {
  const strip = createElement('div', 'annotation-marquee');
  const track = createElement('div', 'marquee__track');
  const list = createElement('ul', 'marquee__list');

  const slots = Array.isArray(slotNames) ? slotNames : [];
  if (!slots.length) {
    return strip;
  }

  slots.forEach((slotName) => {
    const item = createElement('li', 'marquee__item');
    const frame = createElement('figure', 'marquee__figure');
    const image = createImage(context, slotName, 'marquee__image');
    if (image) {
      frame.append(image);
    }
    item.append(frame);
    list.append(item);
  });

  track.append(list);

  const label = createElement('p', 'annotation-marquee__label', context.t('ui.gallery'));
  strip.append(label, track);
  return strip;
}

function renderAnnotation(context, main) {
  const content = context.t('services.annotation');

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

  const sideNav = createAnnotationSideNav(context, content);
  const layout = createElement('div', 'annotation-page-layout page-container');
  const stack = createElement('div', 'annotation-main-stack');

  const usecases = createAnnotationUsecases(context);
  const modalitiesWrapper = createElement('div', 'annotation-modalities');
  modalitiesWrapper.id = 'modalities';
  modalitiesWrapper.dataset.annotationSection = 'modalities';
  (Array.isArray(content?.modalities) ? content.modalities : []).forEach((modality, index) => {
    const section = createAnnotationModality(context, modality, index);
    section.id = modality.id || `modality-${index}`;
    section.dataset.annotationSection = modality.id || `modality-${index}`;
    const rows = section.querySelector('.annotation-rows');
    if (rows) {
      rows.querySelectorAll('.annotation-row').forEach((row) => {
        const rowType = row.dataset.typeId;
        const typeInfo = modality.types?.find((item) => item.id === rowType) || null;
        if (!typeInfo) {
          return;
        }
        row.append(createAnnotationMarquee(context, content.strips?.[rowType]));
      });
    }
    modalitiesWrapper.append(section);
  });

  stack.append(
    usecases,
    modalitiesWrapper,
    createAnnotationWorkflow(context),
    createAnnotationQualitySection(context),
    createAnnotationSecurity(context),
    createAnnotationCta(context)
  );
  layout.append(sideNav, stack);

  main.append(hero, layout);

  bindAnnotationSideNav();
  initializeMarquee(main);
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

function renderComingSoonService(context, main, contentKey) {
  const content = context.t(contentKey);
  const section = createElement('section', 'service-collection section-shell');
  const container = createElement('div', 'page-container');

  const heading = createSectionHeading(
    context,
    `${contentKey}.title`,
    `${contentKey}.lead`
  );
  const status = createElement('span', 'service-collection__status', content.status);
  heading.append(status);
  container.append(heading);

  const message = createElement('p', 'service-collection__message', context.t('services.collection.message'));
  container.append(message);

  const gallery = createElement('div', 'service-collection__gallery');
  (Array.isArray(content?.gallery) ? content.gallery : []).forEach((item) => {
    const frame = createElement('figure', 'service-collection__frame');
    const image = createImage(context, item.image, 'service-collection__image');
    if (image) {
      frame.append(image);
    }
    if (typeof item.caption === 'string' && item.caption.trim()) {
      const caption = createElement('figcaption', 'service-collection__caption', item.caption);
      frame.append(caption);
    }
    gallery.append(frame);
  });
  container.append(gallery);

  section.append(container);
  main.append(section, createContactCta(context));
}

export function renderServices(context) {
  const main = document.querySelector('#main');
  if (!main) {
    return;
  }

  const page = document.body.dataset.page;
  if (!['services', 'services-annotation', 'services-collection', 'services-data-engineering'].includes(page)) {
    return;
  }
  main.replaceChildren();
  main.append(createServiceNavigation(context, page));

  if (page === 'services') {
    renderOverview(context, main);
  } else if (page === 'services-annotation') {
    renderAnnotation(context, main);
  } else if (page === 'services-data-engineering') {
    renderComingSoonService(context, main, 'services.data_engineering');
  } else {
    renderComingSoonService(context, main, 'services.collection');
  }
}
