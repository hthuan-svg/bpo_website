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

export async function initI18n() {
  const [siteConfig, images] = await Promise.all([
    loadJson('content/site.config.json'),
    loadJson('content/images.json')
  ]);
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
    document.title = t('meta.title') ?? '';

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.append(description);
    }
    description.content = t('meta.description') ?? '';
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
