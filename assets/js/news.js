// Loads news.json and renders localized news cards, filters, and detail views.
import { buildFacebookShareUrl } from './social.js';

const newsUrl = 'content/news.json';
const visibleNewsLimit = 9;
let newsItems = [];
let selectedCategory = 'all';
let visibleNewsCount = visibleNewsLimit;

async function loadNews() {
  const response = await fetch(newsUrl);
  if (!response.ok) {
    throw new Error(`Could not load ${newsUrl}: ${response.status}`);
  }
  const news = await response.json();
  if (!Array.isArray(news.items)) {
    throw new Error(`${newsUrl} must contain an items array.`);
  }

  return news.items
    .filter((item) => item.hidden !== true)
    .sort((first, second) => String(second.date).localeCompare(String(first.date)));
}

function localized(value, language) {
  if (typeof value?.[language] === 'string' && value[language].trim()) {
    return value[language];
  }
  return typeof value?.vi === 'string' ? value.vi : '';
}

function safeExternalUrl(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return '';
  }
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function localizedDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replaceAll('-', '.') : '';
}

function createDate(date) {
  const time = document.createElement('time');
  const formattedDate = localizedDate(String(date ?? ''));
  if (formattedDate) {
    time.dateTime = String(date);
  }
  time.className = 'news-card__date';
  time.textContent = formattedDate;
  return time;
}

function createImage(item, context, className) {
  const slot = context.images.slots?.[item.image];
  if (!slot) {
    console.warn(`News item "${item.id}" references missing image slot "${item.image}".`);
    return null;
  }

  const image = document.createElement('img');
  image.className = className;
  image.src = slot.src;
  image.alt = localized(slot.alt, context.language) || localized(item.title, context.language);
  if (Number.isInteger(slot.width) && Number.isInteger(slot.height)) {
    image.width = slot.width;
    image.height = slot.height;
  }
  image.loading = 'lazy';
  return image;
}

function newsDetailUrl(item, language) {
  const parameters = new URLSearchParams({ id: item.id, lang: language });
  return `news.html?${parameters.toString()}`;
}

function createCard(item, context) {
  const article = document.createElement('article');
  article.className = 'news-card card card--interactive';

  const image = createImage(item, context, 'card__image');
  if (image) {
    article.append(image);
  }

  const body = document.createElement('div');
  body.className = 'card__body news-card__body';
  const meta = document.createElement('div');
  meta.className = 'news-card__meta';

  const category = context.t(`news.categories.${item.category}`);
  if (typeof category === 'string' && category) {
    const label = document.createElement('span');
    label.className = 'tag tag--brand';
    label.textContent = category;
    meta.append(label);
  }
  meta.append(createDate(item.date));

  const title = document.createElement('h2');
  title.className = 'news-card__title';
  const titleLink = document.createElement('a');
  titleLink.href = newsDetailUrl(item, context.language);
  titleLink.textContent = localized(item.title, context.language);
  title.append(titleLink);

  const summary = document.createElement('p');
  summary.textContent = localized(item.summary, context.language);

  const readMore = document.createElement('a');
  readMore.className = 'news-card__link';
  readMore.href = newsDetailUrl(item, context.language);
  readMore.textContent = String(context.t('ui.read_more') ?? '');

  body.append(meta, title, summary, readMore);
  article.append(body);
  return article;
}

function createFilterButton(category, label, context) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chip';
  button.textContent = label;
  button.setAttribute('aria-pressed', String(selectedCategory === category));
  button.addEventListener('click', () => {
    selectedCategory = category;
    visibleNewsCount = visibleNewsLimit;
    renderNews(context);
  });
  return button;
}

function renderHomeNews(context) {
  const container = document.querySelector('#home-news');
  if (!container) {
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'news-grid news-grid--home';
  newsItems.slice(0, 3).forEach((item) => grid.append(createCard(item, context)));
  container.replaceChildren(grid);
  const allNewsLink = document.querySelector('.home-news__all');
  if (allNewsLink) {
    allNewsLink.href = `news.html?lang=${encodeURIComponent(context.language)}`;
  }
}

function renderFilters(context) {
  const container = document.querySelector('[data-news-filters]');
  if (!container) {
    return;
  }

  const availableCategories = [...new Set(newsItems.map((item) => item.category))];
  if (selectedCategory !== 'all' && !availableCategories.includes(selectedCategory)) {
    selectedCategory = 'all';
  }

  container.setAttribute('aria-label', String(context.t('news.page_title') ?? ''));
  const filters = [createFilterButton('all', String(context.t('ui.all') ?? ''), context)];
  availableCategories.forEach((category) => {
    const label = context.t(`news.categories.${category}`);
    if (typeof label === 'string' && label) {
      filters.push(createFilterButton(category, label, context));
    }
  });
  container.replaceChildren(...filters);
}

function renderNewsList(context) {
  const view = document.querySelector('[data-news-list-view]');
  if (!view) {
    return;
  }

  view.hidden = false;
  const detail = document.querySelector('[data-news-detail]');
  if (detail) {
    detail.hidden = true;
  }
  view.setAttribute('aria-label', String(context.t('news.page_title') ?? ''));
  renderFilters(context);

  const filteredItems = selectedCategory === 'all'
    ? newsItems
    : newsItems.filter((item) => item.category === selectedCategory);
  const shownItems = filteredItems.slice(0, visibleNewsCount);
  const grid = document.querySelector('[data-news-cards]');
  grid.replaceChildren(...shownItems.map((item) => createCard(item, context)));

  const emptyMessage = document.querySelector('[data-news-empty]');
  emptyMessage.textContent = String(context.t('ui.news_empty') ?? '');
  emptyMessage.hidden = filteredItems.length > 0;

  const showMore = document.querySelector('[data-news-show-more]');
  showMore.textContent = String(context.t('ui.show_more') ?? '');
  showMore.hidden = filteredItems.length <= shownItems.length;
  showMore.onclick = () => {
    visibleNewsCount += visibleNewsLimit;
    renderNewsList(context);
  };
}

function appendExternalLink(parent, url, label, className = '') {
  const href = safeExternalUrl(url);
  if (!href) {
    return;
  }
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  if (className) {
    link.className = className;
  }
  parent.append(link);
}

function renderNewsDetail(context, item) {
  const view = document.querySelector('[data-news-list-view]');
  const detail = document.querySelector('[data-news-detail]');
  if (!detail || !view) {
    return;
  }

  view.hidden = true;
  detail.hidden = false;
  detail.replaceChildren();

  const image = createImage(item, context, 'news-detail__image');
  if (image) {
    detail.append(image);
  }

  const body = document.createElement('div');
  body.className = 'news-detail__body';
  const meta = document.createElement('div');
  meta.className = 'news-card__meta';
  const category = context.t(`news.categories.${item.category}`);
  if (typeof category === 'string' && category) {
    const label = document.createElement('span');
    label.className = 'tag tag--brand';
    label.textContent = category;
    meta.append(label);
  }
  meta.append(createDate(item.date));

  const title = document.createElement('h2');
  title.className = 'news-detail__title';
  title.textContent = localized(item.title, context.language);

  const summary = document.createElement('p');
  summary.className = 'news-detail__summary';
  summary.textContent = localized(item.summary, context.language);

  const actions = document.createElement('div');
  actions.className = 'news-detail__actions';
  appendExternalLink(
    actions,
    item.link,
    String(context.t('ui.read_original') ?? ''),
    'button button--text'
  );
  appendExternalLink(
    actions,
    item.facebook_post,
    String(context.t('ui.open_facebook_post') ?? ''),
    'button button--text'
  );

  const share = document.createElement('a');
  share.className = 'button button--secondary';
  share.href = buildFacebookShareUrl(window.location.href);
  share.target = '_blank';
  share.rel = 'noopener noreferrer';
  share.textContent = String(context.t('ui.share_facebook') ?? '');

  const back = document.createElement('a');
  back.className = 'button button--secondary';
  back.href = `news.html?lang=${encodeURIComponent(context.language)}`;
  back.textContent = String(context.t('ui.back') ?? '');

  body.append(meta, title, summary, actions, share, back);
  detail.append(body);
}

function renderNewsNotFound(context) {
  const view = document.querySelector('[data-news-list-view]');
  const detail = document.querySelector('[data-news-detail]');
  if (!detail || !view) {
    return;
  }

  view.hidden = true;
  detail.hidden = false;
  const message = document.createElement('p');
  message.className = 'news-not-found';
  message.setAttribute('role', 'status');
  message.textContent = String(context.t('ui.news_not_found') ?? '');

  const back = document.createElement('a');
  back.className = 'button button--secondary';
  back.href = `news.html?lang=${encodeURIComponent(context.language)}`;
  back.textContent = String(context.t('ui.back') ?? '');
  detail.replaceChildren(message, back);
}

function renderNewsPage(context) {
  if (document.body.dataset.page !== 'news') {
    return;
  }

  const newsId = new URLSearchParams(window.location.search).get('id');
  if (!newsId) {
    renderNewsList(context);
    return;
  }

  const item = newsItems.find((newsItem) => newsItem.id === newsId);
  if (!item) {
    renderNewsNotFound(context);
    return;
  }

  renderNewsDetail(context, item);
}

export async function initializeNews(context) {
  newsItems = await loadNews();
  renderNews(context);
}

export function renderNews(context) {
  renderHomeNews(context);
  renderNewsPage(context);
}
