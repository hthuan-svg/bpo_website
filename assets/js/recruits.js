// Loads recruitment posts and renders the localized listing or detail view.
let posts = [];
let activeFilter = 'all';
let initialized = false;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  return node;
}

function localized(value, language) {
  if (value && typeof value === 'object') return value[language] ?? value.vi ?? '';
  return value ?? '';
}

function currentStatus(post, context) {
  const today = new Date();
  const todayKey = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  if (
    post.status === 'open'
    && context.siteConfig.recruits?.autoCloseByDeadline === true
    && post.deadline
    && post.deadline < todayKey
  ) return 'closed';
  return post.status === 'closed' ? 'closed' : 'open';
}

function formattedDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') ? value.replaceAll('-', '.') : value ?? '';
}

function postImage(post, context) {
  const slot = context.images.slots?.[post.image || context.t('recruits.default_image')];
  if (!slot) return null;
  const image = element('img', 'recruits-card__image');
  image.src = slot.src;
  image.alt = slot.alt?.[context.language] ?? slot.alt?.vi ?? '';
  image.loading = 'lazy';
  if (slot.placeholder) {
    image.classList.add('is-placeholder');
    image.dataset.placeholderLabel = context.t('ui.image_placeholder');
  }
  if (Number.isInteger(slot.width)) image.width = slot.width;
  if (Number.isInteger(slot.height)) image.height = slot.height;
  return image;
}

function postUrl(id, language) {
  return `recruits.html?id=${encodeURIComponent(id)}&lang=${encodeURIComponent(language)}`;
}

function buildCard(post, status, context) {
  const labels = context.t('recruits.labels');
  const card = element('article', 'recruits-card');
  const image = postImage(post, context);
  if (image) card.append(image);
  const content = element('div', 'recruits-card__content');
  const top = element('div', 'recruits-card__top');
  const date = element('time', 'recruits-card__date', formattedDate(post.date));
  if (post.date) date.dateTime = post.date;
  top.append(
    date,
    element(`span`, `status-badge status-badge--${status}`, context.t(`ui.status.${status}`))
  );
  const title = element('h3', 'recruits-card__title');
  const link = element('a', '', localized(post.title, context.language));
  link.href = postUrl(post.id, context.language);
  title.append(link);
  const summary = element('p', 'recruits-card__summary', localized(post.summary, context.language));
  const meta = element('dl', 'recruits-card__meta');
  [[labels.location, localized(post.location, context.language)], [labels.type, localized(post.type, context.language)], [labels.deadline, post.deadline ? formattedDate(post.deadline) : labels.no_deadline]]
    .forEach(([label, value]) => {
      const row = element('div', 'recruits-card__meta-row');
      row.append(element('dt', '', label), element('dd', '', value));
      meta.append(row);
    });
  content.append(top, title, summary, meta);
  card.append(content);
  return card;
}

function renderDetail(post, status, context, target) {
  const language = context.language;
  const labels = context.t('recruits.labels');
  const detail = element('article', 'recruits-detail');
  const back = element('a', 'recruits-back', `← ${context.t('recruits.back')}`);
  back.href = `recruits.html?lang=${encodeURIComponent(language)}`;
  const heading = element('header', 'recruits-detail__heading');
  const date = element('time', 'recruits-card__date', formattedDate(post.date));
  if (post.date) date.dateTime = post.date;
  heading.append(
    date,
    element('span', `status-badge status-badge--${status}`, context.t(`ui.status.${status}`)),
    element('h1', 'section-title', localized(post.title, language)),
    element('p', 'recruits-card__summary', localized(post.summary, language))
  );
  const metadata = element('dl', 'recruits-detail__meta');
  [[labels.location, localized(post.location, language)], [labels.type, localized(post.type, language)], [labels.deadline, post.deadline ? formattedDate(post.deadline) : labels.no_deadline]]
    .forEach(([label, value]) => {
      const row = element('div', 'recruits-card__meta-row');
      row.append(element('dt', '', label), element('dd', '', value));
      metadata.append(row);
    });
  const body = element('section', 'recruits-detail__body');
  body.append(element('h2', 'recruits-detail__subheading', labels.details));
  localized(post.body, language).split(/\n\s*\n/).filter(Boolean).forEach((paragraph) => body.append(element('p', '', paragraph)));
  detail.append(back, heading, metadata, body);
  if (status === 'closed') {
    detail.append(element('p', 'recruits-detail__closed', labels.closed_note));
  } else {
    const applyLink = typeof post.apply_link === 'string' ? post.apply_link.trim() : '';
    const email = context.siteConfig.contact?.email?.trim() ?? '';
    let destination = applyLink;
    if (!destination && email) {
      const subject = `${context.t('recruits.apply_subject')} ${localized(post.title, language)}`;
      destination = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
    if (destination) {
      const apply = element('a', 'button button--primary recruits-apply', labels.apply);
      apply.href = destination;
      if (/^https?:/i.test(destination)) {
        apply.target = '_blank';
        apply.rel = 'noopener noreferrer';
      }
      detail.append(apply);
    }
  }
  target.append(detail);
}

export function renderRecruitment(context) {
  if (!initialized) return;
  const list = document.querySelector('#recruits-list');
  const empty = document.querySelector('#recruits-empty');
  const filters = document.querySelector('#recruits-filters');
  if (!list || !empty || !filters) return;

  const visiblePosts = posts.filter((post) => post.hidden !== true)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const id = new URLSearchParams(window.location.search).get('id');
  list.replaceChildren();
  if (id !== null) {
    filters.hidden = true;
    document.querySelector('.recruits-listing__title').hidden = true;
    const post = visiblePosts.find((item) => item.id === id);
    empty.hidden = true;
    if (post) {
      renderDetail(post, currentStatus(post, context), context, list);
    } else {
      const notFound = element('section', 'recruits-not-found');
      notFound.append(element('p', '', context.t('recruits.not_found')));
      const back = element('a', 'button button--secondary', context.t('recruits.back'));
      back.href = `recruits.html?lang=${encodeURIComponent(context.language)}`;
      notFound.append(back);
      list.append(notFound);
    }
    return;
  }

  filters.hidden = false;
  document.querySelector('.recruits-listing__title').hidden = false;
  const filteredPosts = visiblePosts.filter((post) => activeFilter === 'all' || currentStatus(post, context) === activeFilter);
  filteredPosts.forEach((post) => list.append(buildCard(post, currentStatus(post, context), context)));
  empty.hidden = filteredPosts.length > 0;
  filters.querySelectorAll('[data-filter]').forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

export async function initializeRecruitment(context) {
  if (!document.querySelector('#recruits-filters')) return;
  if (!initialized) {
    const response = await fetch('content/recruits.json');
    if (!response.ok) throw new Error(`Could not load content/recruits.json: ${response.status}`);
    const data = await response.json();
    posts = Array.isArray(data.items) ? data.items : [];
    const filters = document.querySelector('#recruits-filters');
    filters?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      activeFilter = button.dataset.filter;
      renderRecruitment(window.siteI18n);
    });
    initialized = true;
  }
  renderRecruitment(context);
}
