// Renders contact-page social links, Facebook sharing, and the optional Page Plugin.
const socialNetworks = ['facebook', 'youtube', 'linkedin', 'instagram', 'zalo'];
const facebookShareEndpoint = 'https://www.facebook.com/sharer/sharer.php';
const facebookPluginEndpoint = 'https://www.facebook.com/plugins/page.php';
const facebookPluginStates = new WeakMap();

function externalUrl(value) {
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

function setExternalLink(link, url) {
  const safeUrl = externalUrl(url);
  link.hidden = !safeUrl;
  if (safeUrl) {
    link.href = safeUrl;
  } else {
    link.removeAttribute('href');
  }
}

function renderContact(context) {
  const contact = context.siteConfig.contact ?? {};
  const addresses = contact.address && typeof contact.address === 'object'
    ? Object.values(contact.address)
    : [];
  const address = typeof contact.address?.[context.language] === 'string'
    ? contact.address[context.language].trim()
    : '';
  const email = typeof contact.email === 'string' ? contact.email.trim() : '';
  const configuredPhone = typeof contact.phone === 'string' ? contact.phone.trim() : '';
  const phoneNumber = configuredPhone.replace(/[^\d+*#;,.-]/g, '');
  const phone = phoneNumber ? configuredPhone : '';
  const mapUrl = externalUrl(contact.mapEmbedUrl);
  const mapSection = document.querySelector('[data-contact-map-section]');
  mapSection.hidden = !mapUrl;
  const formUrl = externalUrl(contact.formUrl);

  document.querySelectorAll('[data-contact-item]').forEach((item) => {
    const field = item.dataset.contactItem;
    const value = field === 'address'
      ? address
      : field === 'email'
        ? email
        : phone;
    item.hidden = !value;
    const link = item.querySelector('[data-contact-link]');
    if (link) {
      link.textContent = value;
      const href = field === 'email'
        ? `mailto:${encodeURIComponent(value).replace(/%40/gi, '@')}`
        : `tel:${phoneNumber}`;
      link.hidden = !value;
      link.href = href;
    }
    const text = item.querySelector('[data-contact-value]');
    if (text) {
      text.textContent = value;
    }
  });

  const hasAnyConfiguredAddress = addresses.some((value) => (
    typeof value === 'string' && value.trim()
  ));
  const noContactDetails = !hasAnyConfiguredAddress && !email && !phone && !mapUrl && !formUrl;
  const note = document.querySelector('[data-contact-note]');
  note.hidden = !noContactDetails;

  const formLink = document.querySelector('[data-contact-form]');
  setExternalLink(formLink, formUrl);
  document.querySelector('[data-contact-actions]').hidden = !formUrl;

  const mapFrame = document.querySelector('[data-contact-map]');
  if (mapUrl) {
    mapFrame.src = mapUrl;
    mapFrame.title = String(context.t('contact.labels.map') ?? '');
    mapSection.setAttribute('aria-label', String(context.t('contact.labels.map') ?? ''));
  } else {
    mapFrame.removeAttribute('src');
    mapSection.removeAttribute('aria-label');
  }

  const footerSocials = document.querySelector('#site-footer .site-social');
  const socialList = document.querySelector('[data-contact-socials]');
  const socialBlock = document.querySelector('[data-social-block]');
  const socialItems = footerSocials
    ? Array.from(footerSocials.children).filter((item) => (
      socialNetworks.some((network) => item.querySelector(`[data-config="social.${network}"]`))
    ))
    : [];
  socialList.replaceChildren(...socialItems.map((item) => item.cloneNode(true)));
  socialBlock.hidden = socialItems.length === 0;
  socialBlock.setAttribute('aria-label', String(context.t('ui.follow_us') ?? ''));
}

function facebookPluginUrl(pageUrl, height) {
  const parameters = new URLSearchParams({
    href: pageUrl,
    tabs: 'timeline',
    width: '500',
    height: String(height),
    small_header: 'true',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'false'
  });
  return `${facebookPluginEndpoint}?${parameters.toString()}`;
}

function renderFacebookPagePlugin(context) {
  const section = document.querySelector('[data-facebook-plugin]');
  const frame = section.querySelector('[data-facebook-frame]');
  const fallback = section.querySelector('[data-facebook-link]');
  const plugin = context.siteConfig.facebookPagePlugin ?? {};
  const pageUrl = externalUrl(plugin.pageUrl);

  section.hidden = plugin.enabled !== true || !pageUrl;
  if (section.hidden) {
    frame.removeAttribute('src');
    fallback.hidden = true;
    fallback.removeAttribute('href');
    return;
  }

  section.setAttribute('aria-label', String(context.t('ui.social_labels.facebook') ?? ''));
  fallback.textContent = String(context.t('contact.facebook_link') ?? '');
  setExternalLink(fallback, pageUrl);
  fallback.hidden = true;
  frame.title = String(context.t('ui.social_labels.facebook') ?? '');

  const configuredHeight = Number(plugin.height);
  const height = Number.isFinite(configuredHeight) && configuredHeight > 0
    ? Math.round(configuredHeight)
    : 600;
  const src = facebookPluginUrl(pageUrl, height);
  const currentState = facebookPluginStates.get(frame);

  if (currentState?.src === src) {
    frame.title = String(context.t('ui.social_labels.facebook') ?? '');
    fallback.textContent = String(context.t('contact.facebook_link') ?? '');
    if (currentState.failed) {
      frame.hidden = true;
      fallback.hidden = false;
    }
    return;
  }

  if (currentState) {
    window.clearTimeout(currentState.timeoutId);
  }
  const state = { src, failed: false, timeoutId: 0 };
  facebookPluginStates.set(frame, state);

  const showFallback = () => {
    if (state.failed) {
      return;
    }
    state.failed = true;
    window.clearTimeout(state.timeoutId);
    frame.hidden = true;
    fallback.hidden = false;
  };

  frame.hidden = false;
  frame.onload = () => {
    if (!state.failed) {
      window.clearTimeout(state.timeoutId);
      fallback.hidden = true;
    }
  };
  frame.onerror = showFallback;
  frame.src = src;
  frame.style.height = `${height}px`;
  state.timeoutId = window.setTimeout(showFallback, 10000);
}

export function buildFacebookShareUrl(url = window.location.href) {
  return `${facebookShareEndpoint}?u=${encodeURIComponent(url)}`;
}

export function renderSocial(context) {
  if (document.body.dataset.page !== 'contact') {
    return;
  }
  renderContact(context);
  renderFacebookPagePlugin(context);
}
