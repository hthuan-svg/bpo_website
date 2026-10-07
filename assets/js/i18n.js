// Loads localized content, site configuration and image-slot data.
const supportedLanguages = ['vi', 'en', 'ja'];

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load ${url}: ${response.status}`);
  }
  return response.json();
}

function readStoredLanguage() {
  try {
    return localStorage.getItem('lang');
  } catch (error) {
    console.warn('Could not read the saved language preference.', error);
    return null;
  }
}

function chooseLanguage(siteConfig) {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  if (supportedLanguages.includes(queryLanguage)) {
    return queryLanguage;
  }

  const savedLanguage = readStoredLanguage();
  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language?.split('-')[0].toLowerCase();
  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }

  return supportedLanguages.includes(siteConfig.defaultLang)
    ? siteConfig.defaultLang
    : 'vi';
}

function findValue(source, path) {
  return path.split('.').reduce((value, key) => (
    value !== null && typeof value === 'object' ? value[key] : undefined
  ), source);
}

function pageUrl(language, siteOrigin) {
  const currentPath = window.location.pathname;
  const pathname = document.body.dataset.page === '404'
    ? '/404.html'
    : currentPath.endsWith('/index.html')
      ? currentPath.slice(0, -'index.html'.length)
      : currentPath;
  const url = new URL(pathname || '/', siteOrigin);
  const newsId = document.body.dataset.page === 'news'
    ? new URLSearchParams(window.location.search).get('id')
    : null;
  if (newsId) {
    url.searchParams.set('id', newsId);
  }
  url.searchParams.set('lang', language);
  return url.href;
}

function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.content = value;
  }
}

function preloadImageSlot(images, slotName) {
  const slot = images.slots?.[slotName];
  if (!slot) {
    return;
  }
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'image';
  preload.fetchPriority = 'high';
  preload.dataset.preloadSlot = slotName;
  preload.href = slot.src;
  document.head.append(preload);
}

export async function initI18n() {
  const [siteConfig, images] = await Promise.all([
    loadJson('content/site.config.json'),
    loadJson('content/images.json')
  ]);
  if (document.body.dataset.page === 'index') {
    preloadImageSlot(images, 'background_main');
  }
  let language = chooseLanguage(siteConfig);
  let content = await loadJson(`content/${language}.json`);
  const vietnamese = language === 'vi'
    ? content
    : await loadJson('content/vi.json');

  function t(path) {
    const localizedValue = findValue(content, path);
    if (localizedValue !== undefined) {
      return localizedValue;
    }

    console.warn(`Missing translation key "${path}" for language "${language}".`);
    const fallbackValue = findValue(vietnamese, path);
    return fallbackValue === undefined ? undefined : fallbackValue;
  }

  function updateDocumentMetadata() {
    document.documentElement.lang = language;
    const page = document.body.dataset.page ?? 'index';
    const pageMetadata = page === '404'
      ? content.not_found
      : findValue(content, `seo.pages.${page}`) ?? {};
    const title = pageMetadata.title ?? t('meta.title') ?? '';
    const description = pageMetadata.description ?? t('meta.description') ?? '';
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonicalUrl = pageUrl(language, window.location.origin);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = canonicalUrl;
    }
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
      link.href = pageUrl(link.hreflang === 'x-default' ? 'vi' : link.hreflang, new URL(canonicalUrl).origin);
    });
    const notFoundHome = document.querySelector('#not-found-home');
    if (notFoundHome) {
      notFoundHome.href = `index.html?lang=${encodeURIComponent(language)}`;
    }

    const locale = { vi: 'vi_VN', en: 'en_US', ja: 'ja_JP' }[language];
    setMetaContent('meta[property="og:locale"]', locale);
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((meta) => {
      meta.remove();
    });
    supportedLanguages
      .filter((candidate) => candidate !== language)
      .forEach((candidate) => {
        const alternateLocale = document.createElement('meta');
        alternateLocale.setAttribute('property', 'og:locale:alternate');
        alternateLocale.content = { vi: 'vi_VN', en: 'en_US', ja: 'ja_JP' }[candidate];
        document.head.append(alternateLocale);
      });

    const socialImage = images.slots?.og_share;
    if (socialImage) {
      const imageUrl = new URL(socialImage.src, new URL(canonicalUrl).origin).href;
      setMetaContent('meta[property="og:image"]', imageUrl);
      setMetaContent('meta[name="twitter:image"]', imageUrl);
      setMetaContent('meta[property="og:image:alt"]', socialImage.alt?.[language] ?? socialImage.alt?.vi ?? '');
      setMetaContent('meta[name="twitter:image:alt"]', socialImage.alt?.[language] ?? socialImage.alt?.vi ?? '');
    }

    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: new URL('/', new URL(canonicalUrl).origin).href,
      logo: new URL(images.slots.company_logo.src, new URL(canonicalUrl).origin).href,
      sameAs: Object.values(siteConfig.social ?? {})
        .filter((value) => typeof value === 'string')
        .map((value) => value.trim())
        .filter((value) => /^https?:\/\//i.test(value))
    };
    const localizedAddress = siteConfig.contact?.address?.[language];
    const address = typeof localizedAddress === 'string' ? localizedAddress.trim() : '';
    if (address) {
      organizationData.address = {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressCountry: 'VN'
      };
    }
    let structuredData = document.querySelector('#organization-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'organization-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(organizationData);
  }

  async function setLanguage(nextLanguage) {
    if (!supportedLanguages.includes(nextLanguage)) {
      throw new Error(`Unsupported language "${nextLanguage}".`);
    }
    if (nextLanguage === language) {
      updateDocumentMetadata();
      return;
    }

    const nextContent = await loadJson(`content/${nextLanguage}.json`);
    content = nextContent;
    language = nextLanguage;
    try {
      localStorage.setItem('lang', language);
    } catch (error) {
      console.warn('Could not save the language preference.', error);
    }
    updateDocumentMetadata();
  }

  updateDocumentMetadata();

  return {
    get language() {
      return language;
    },
    get content() {
      return content;
    },
    siteConfig,
    images,
    t,
    setLanguage
  };
}
