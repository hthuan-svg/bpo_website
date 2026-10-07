// Creates the global floating back-to-top button and handles its visibility and scroll behavior.
const backToTopId = 'back-to-top-button';

function createButton(label) {
  const button = document.createElement('button');
  button.id = backToTopId;
  button.type = 'button';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', label);
  button.title = label;
  button.innerHTML = `
    <svg class="back-to-top__progress" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle class="back-to-top__progress-ring" cx="24" cy="24" r="18"></circle>
      <circle class="back-to-top__progress-fill" cx="24" cy="24" r="18"></circle>
    </svg>
    <span class="back-to-top__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 19V5"></path>
        <path d="m6 11 6-6 6 6"></path>
      </svg>
    </span>
  `;
  return button;
}

function updateProgress(button, scrollRatio) {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - Math.min(1, Math.max(0, scrollRatio)));
  button.style.setProperty('--offset', String(offset));
}

export function initializeBackToTop(i18n) {
  const siteConfig = i18n?.siteConfig ?? {};
  const config = siteConfig.backToTop ?? { enabled: true, showAfterPx: 400 };
  const showAfterPx = Number.isFinite(config.showAfterPx) ? config.showAfterPx : 400;

  if (config.enabled === false) {
    document.querySelector(`.${'back-to-top'}`)?.remove();
    return;
  }

  let button = document.querySelector(`#${backToTopId}`);
  if (!button) {
    const label = i18n?.t?.('ui.back_to_top') ?? 'Back to top';
    button = createButton(label);
    document.body.append(button);
  }

  const label = i18n?.t?.('ui.back_to_top') ?? 'Back to top';
  button.setAttribute('aria-label', label);
  button.title = label;

  if (button.dataset.backToTopBound === 'true') {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const updateVisibility = () => {
    const shouldShow = window.scrollY > showAfterPx;
    button.classList.toggle('is-visible', shouldShow);

    const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    updateProgress(button, ratio);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateVisibility();
      ticking = false;
    });
  };

  const updateLabelHandler = () => {
    const nextLabel = i18n?.t?.('ui.back_to_top') ?? 'Back to top';
    button.setAttribute('aria-label', nextLabel);
    button.title = nextLabel;
  };

  button.onclick = (event) => {
    event.preventDefault();
    const focusTarget = document.querySelector('.skip-link, main, [role="main"], #main');
    const scrollBehavior = reduceMotion ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior: scrollBehavior });
    if (focusTarget) {
      window.setTimeout(() => focusTarget.focus(), reduceMotion ? 0 : 180);
    }
  };

  document.addEventListener('langchange', updateLabelHandler);

  window.addEventListener('scroll', onScroll, { passive: true });
  button.dataset.backToTopBound = 'true';
  updateVisibility();
}
