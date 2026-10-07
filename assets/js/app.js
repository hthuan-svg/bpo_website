// Starts localization and page rendering; layout injection is added in a later step.
import { initI18n } from './i18n.js';
import { renderPage } from './render.js';
import { initReveal } from './reveal.js';

const openPageMessage = 'Hãy mở trang bằng Live Server (không bấm đúp file .html)';

function showStartupError(error) {
  console.error('The site could not load its content.', error);
  const main = document.querySelector('#main') ?? document.body;
  main.replaceChildren(document.createTextNode(openPageMessage));
}

async function start() {
  try {
    const i18n = await initI18n();

    // LAYOUT HOOK: step 03 will load the shared header and footer here.
    if (typeof window.initializeLayout === 'function') {
      await window.initializeLayout(i18n);
    }

    window.siteI18n = i18n;
    window.setSiteLanguage = async (language) => {
      try {
        await i18n.setLanguage(language);
        document.dispatchEvent(new CustomEvent('langchange', {
          detail: { language: i18n.language }
        }));
      } catch (error) {
        showStartupError(error);
      }
    };

    document.addEventListener('langchange', () => {
      renderPage(i18n);
      initReveal();
    });
    renderPage(i18n);
    initReveal();
  } catch (error) {
    showStartupError(error);
  }
}

start();
