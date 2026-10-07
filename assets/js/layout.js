// Injects the shared, localized site header and footer.
import { initializeBackToTop } from './backtotop.js';

const pageLinks = [
  { page: 'index', file: 'index.html', key: 'home' },
  { page: 'about', file: 'about.html', key: 'about' },
  { page: 'services', file: 'services.html', key: 'services' },
  { page: 'services-annotation', file: 'services-annotation.html', key: 'services_annotation' },
  { page: 'services-collection', file: 'services-collection.html', key: 'services_collection' },
  { page: 'team', file: 'team.html', key: 'team' },
  { page: 'achievements', file: 'achievements.html', key: 'achievements' },
  { page: 'vision', file: 'vision.html', key: 'vision' },
  { page: 'news', file: 'news.html', key: 'news' },
  { page: 'contact', file: 'contact.html', key: 'contact' }
];

const socialNetworks = ['facebook', 'youtube', 'linkedin', 'instagram', 'zalo'];

function navigationLink(link, currentPage) {
  const currentAttribute = link.page === currentPage ? ' aria-current="page"' : '';
  const activeClass = link.page === currentPage ? ' is-current' : '';
  return `<a class="site-nav__link${activeClass}" href="${link.file}" data-i18n="ui.nav.${link.key}"${currentAttribute}></a>`;
}

function navigationMarkup(currentPage) {
  const servicesOpen = currentPage.startsWith('services');
  const servicesCurrent = currentPage === 'services' ? ' aria-current="page"' : '';
  const servicesActive = servicesOpen ? ' is-current' : '';
  const dropdownExpanded = currentPage === 'services-annotation' || currentPage === 'services-collection';
  const servicesChildren = pageLinks
    .filter((link) => link.page === 'services-annotation' || link.page === 'services-collection')
    .map((link) => {
      return `<li>${navigationLink(link, currentPage).replace('site-nav__link', 'site-nav__link site-nav__sublink')}</li>`;
    })
    .join('');

  return `
    <ul class="site-nav__list">
      <li>${navigationLink(pageLinks[0], currentPage)}</li>
      <li>${navigationLink(pageLinks[1], currentPage)}</li>
      <li class="site-nav__item site-nav__item--services">
        <div class="site-nav__services-row">
          <a class="site-nav__link${servicesActive}" href="services.html" data-i18n="ui.nav.services"${servicesCurrent}></a>
          <button class="site-nav__toggle" type="button" aria-expanded="${dropdownExpanded}" aria-controls="services-submenu" data-i18n-attr="aria-label:ui.nav.services">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3.5 6 4.5 4 4.5-4" /></svg>
          </button>
        </div>
        <ul class="site-nav__submenu" id="services-submenu"${dropdownExpanded ? '' : ' hidden'}>${servicesChildren}</ul>
      </li>
      <li>${navigationLink(pageLinks[5], currentPage)}</li>
      <li>${navigationLink(pageLinks[6], currentPage)}</li>
      <li>${navigationLink(pageLinks[7], currentPage)}</li>
      <li>${navigationLink(pageLinks[8], currentPage)}</li>
      <li>${navigationLink(pageLinks[9], currentPage)}</li>
    </ul>`;
}

function languageMarkup() {
  return `
    <div class="language-switch" role="group" data-i18n-attr="aria-label:ui.language">
      <button class="language-switch__button" type="button" data-language="vi" data-i18n="ui.language_options.vi" aria-pressed="false"></button>
      <span class="language-switch__separator" aria-hidden="true"></span>
      <button class="language-switch__button" type="button" data-language="en" data-i18n="ui.language_options.en" aria-pressed="false"></button>
      <span class="language-switch__separator" aria-hidden="true"></span>
      <button class="language-switch__button" type="button" data-language="ja" data-i18n="ui.language_options.ja" aria-pressed="false"></button>
    </div>`;
}

function headerMarkup(currentPage) {
  return `
    <a class="skip-link" href="#main" data-i18n="ui.skip"></a>
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-header__brand" href="index.html" data-i18n-attr="aria-label:ui.nav.home">
          <img class="site-header__logo" data-img="company_logo">
        </a>
        <nav class="site-nav" id="primary-navigation" data-i18n-attr="aria-label:ui.tabs_label" inert>
          ${navigationMarkup(currentPage)}
        </nav>
        <div class="site-header__actions">
          ${languageMarkup()}
          <button class="site-menu-button" type="button" aria-expanded="false" aria-controls="primary-navigation" data-i18n-attr="aria-label:ui.menu">
            <svg class="site-menu-button__open-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg class="site-menu-button__close-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>
    </header>`;
}

function socialIconMarkup(network) {
  const icons = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 21v-8h3l.5-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.9V3.8c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.6-4.6 4.7V10H7.5v3h2.8v8H14Z" /></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" /></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.3-1.8c3.5 0 4.2 2.3 4.2 5.3v6.4h-3.5v-5.7c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v5.8H9V9Z" /></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.6" r=".8" class="site-social__solid-dot" /></svg>',
    zalo: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5.5h16v11H9l-5 3V5.5Zm3.1 3.1 4.4 5.1H7.3v1.7h6.5v-1.5L9.4 8.8h4.2V7.1H7.1v1.5Zm7.5.2h1.7v6.6h-1.7V8.8Zm.8-2.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" /></svg>'
  };
  return icons[network];
}

function footerMarkup(siteConfig) {
  const quickLinks = pageLinks
    .map((link) => `<li><a href="${link.file}" data-i18n="ui.nav.${link.key}"></a></li>`)
    .join('');
  const configuredSocialNetworks = socialNetworks.filter((network) => (
    siteConfig.social?.[network]
  ));
  const socials = configuredSocialNetworks.map((network) => `
    <li data-show-if="social.${network}">
      <a class="site-social__link" data-config="social.${network}" data-i18n-attr="aria-label:ui.social_labels.${network}" target="_blank" rel="noopener noreferrer">
        ${socialIconMarkup(network)}
      </a>
    </li>`).join('');

  return `
    <footer class="site-footer">
      <div class="site-footer__inner container">
        <div class="site-footer__identity">
          <a class="site-footer__brand" href="index.html" data-i18n-attr="aria-label:ui.nav.home">
            <img class="site-footer__logo" data-img="company_logo">
          </a>
          <p class="site-footer__company" data-i18n="ui.footer_company"></p>
          <p class="site-footer__division" data-i18n="ui.footer_dept"></p>
            ${configuredSocialNetworks.length ? `<div class="site-footer__social">
            <p class="site-footer__label" data-i18n="ui.follow_us"></p>
            <ul class="site-social">${socials}</ul>
            </div>` : ''}
        </div>
        <nav class="site-footer__links" data-i18n-attr="aria-label:ui.quick_links">
          <h2 class="site-footer__heading" data-i18n="ui.quick_links"></h2>
          <ul>${quickLinks}</ul>
        </nav>
        <div class="site-footer__end">
          <a class="site-footer__parent-link" data-config="parentCompanySite" data-i18n="ui.parent_site" target="_blank" rel="noopener noreferrer"></a>
          <p class="site-footer__copyright" data-i18n="ui.copyright"></p>
        </div>
      </div>
    </footer>`;
}

function setMenuOpen(header, open) {
  const button = header.querySelector('.site-menu-button');
  const nav = header.querySelector('.site-nav');
  const siteHeader = header.querySelector('.site-header');
  button.setAttribute('aria-expanded', String(open));
  nav.inert = !open && window.matchMedia('(max-width: 1099px)').matches;
  siteHeader.classList.toggle('is-menu-open', open);
}

function closeDropdown(header, returnFocus = false) {
  const toggle = header.querySelector('.site-nav__toggle');
  const submenu = header.querySelector('.site-nav__submenu');
  if (!toggle || !submenu) {
    return;
  }
  toggle.setAttribute('aria-expanded', 'false');
  submenu.hidden = true;
  if (returnFocus) {
    toggle.focus();
  }
}

function setDropdownOpen(header, open, focusFirst = false) {
  const toggle = header.querySelector('.site-nav__toggle');
  const submenu = header.querySelector('.site-nav__submenu');
  if (!toggle || !submenu) {
    return;
  }
  toggle.setAttribute('aria-expanded', String(open));
  submenu.hidden = !open;
  if (focusFirst && open) {
    submenu.querySelector('a')?.focus();
  }
}

function updateLanguageButtons(header, language) {
  header.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
}

function updateUrlLanguage(language) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.replaceState(window.history.state, '', url);
}

function initializeInteractions(header, i18n) {
  const menuButton = header.querySelector('.site-menu-button');
  const nav = header.querySelector('.site-nav');
  const dropdownToggle = header.querySelector('.site-nav__toggle');

  const updateNavigationMode = () => {
    const isMobile = window.matchMedia('(max-width: 1099px)').matches;
    nav.inert = isMobile && menuButton.getAttribute('aria-expanded') !== 'true';
    if (!isMobile) {
      setMenuOpen(header, false);
    }
  };

  updateNavigationMode();
  window.addEventListener('resize', updateNavigationMode);

  menuButton.addEventListener('click', () => {
    setMenuOpen(header, menuButton.getAttribute('aria-expanded') !== 'true');
  });

  dropdownToggle.addEventListener('click', () => {
    setDropdownOpen(header, dropdownToggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (dropdownToggle.getAttribute('aria-expanded') === 'true') {
        closeDropdown(header, true);
      }
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(header, false);
        menuButton.focus();
      }
      return;
    }

    if (event.target === dropdownToggle && event.key === 'ArrowDown') {
      event.preventDefault();
      setDropdownOpen(header, true, true);
      return;
    }

    if (event.target.closest('.site-nav__submenu') && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
      const links = Array.from(nav.querySelectorAll('.site-nav__submenu a'));
      const currentIndex = links.indexOf(document.activeElement);
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + direction + links.length) % links.length;
      event.preventDefault();
      links[nextIndex]?.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    if (
      event.target.closest('a')
      && window.matchMedia('(max-width: 1099px)').matches
    ) {
      setMenuOpen(header, false);
    }
  });

  header.addEventListener('click', async (event) => {
    const languageButton = event.target.closest('[data-language]');
    if (!languageButton) {
      return;
    }
    const language = languageButton.dataset.language;
    updateUrlLanguage(language);
    await window.setSiteLanguage(language);
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      closeDropdown(header);
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(header, false);
      }
      return;
    }

    if (!event.target.closest('.site-nav__item--services')) {
      closeDropdown(header);
    }
    if (
      menuButton.getAttribute('aria-expanded') === 'true'
      && !event.target.closest('.site-nav')
      && !event.target.closest('.site-menu-button')
    ) {
      setMenuOpen(header, false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    closeDropdown(header);
    if (menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(header, false);
      menuButton.focus();
    }
  });

  document.addEventListener('langchange', (event) => {
    updateLanguageButtons(header, event.detail?.language ?? i18n.language);
  });

  const updateScrollState = () => {
    header.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
  updateLanguageButtons(header, i18n.language);
}

function ensureBackToTopStyles() {
  if (document.querySelector('link[data-back-to-top-styles="true"]')) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/css/backtotop.css';
  link.dataset.backToTopStyles = 'true';
  document.head.append(link);
}

export async function initializeLayout(i18n) {
  const currentPage = document.body.dataset.page ?? 'index';
  const headerTarget = document.querySelector('#site-header');
  const footerTarget = document.querySelector('#site-footer');

  if (!headerTarget || !footerTarget) {
    throw new Error('The page must include #site-header and #site-footer containers.');
  }

  ensureBackToTopStyles();
  headerTarget.innerHTML = headerMarkup(currentPage);
  footerTarget.innerHTML = footerMarkup(i18n.siteConfig);
  initializeInteractions(headerTarget, i18n);
  initializeBackToTop(i18n);
}
