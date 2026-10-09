// Builds the localized contact panel and manages form review and delivery.
const networks = ['facebook', 'youtube', 'linkedin', 'instagram', 'zalo'];

function element(tag, className, text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function renderContact(context) {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const t = context.t;
  const config = context.siteConfig.contact ?? {};
  const contactForm = config.form ?? {};
  const language = context.language;
  const localized = (value) => typeof value === 'string' ? value : (value?.[language] ?? value?.vi ?? '');

  const typeSelect = form.querySelector('[data-contact-types]');
  typeSelect.replaceChildren(new Option(t('contact.form.select_placeholder'), ''));
  (t('contact.form.type_options') ?? []).forEach((item) => typeSelect.add(new Option(item.label, item.value)));
  form.querySelector('[data-contact-review-button]').textContent = t('contact.form.confirm_button');
  form.querySelector('[data-contact-edit]').textContent = t('contact.form.edit_button');
  form.querySelector('[data-contact-send]').textContent = t('contact.form.send_button');

  const privacy = document.querySelector('[data-contact-privacy]');
  privacy.replaceChildren();
  (t('contact.privacy.items') ?? []).forEach((item) => {
    const row = element('div', 'contact-privacy__item');
    const term = element('dt', '', item.title);
    const description = element('dd', '', item.body);
    if (item.dynamic === 'contact') {
      const details = [
        localized(config.address),
        config.email ?? '',
        config.phone ?? ''
      ].filter(Boolean);
      if (details.length) description.append(document.createElement('br'), document.createTextNode(details.join(' · ')));
    }
    if (item.link === 'policy' && config.privacyPolicyUrl) {
      const url = safeExternalUrl(config.privacyPolicyUrl);
      if (url) {
        const link = element('a', '', t('contact.privacy.policy_link_label'));
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        description.append(document.createElement('br'), link);
      }
    }
    row.append(term, description);
    privacy.append(row);
  });

  const officeContainer = document.querySelector('[data-contact-offices]');
  officeContainer.replaceChildren();
  const offices = t('about.offices.items') ?? [];
  offices.forEach((office) => {
    const block = element('section', 'contact-office');
    block.append(element('h3', '', office.name), element('p', '', office.address));
    officeContainer.append(block);
  });

  const email = String(config.email ?? '').trim();
  const emailLink = document.querySelector('[data-contact-email]');
  emailLink.hidden = !email;
  if (email) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }
  const phone = String(config.phone ?? '').trim();
  const phoneLink = document.querySelector('[data-contact-phone]');
  document.querySelector('[data-contact-phone-wrap]').hidden = !phone;
  if (phone) {
    phoneLink.href = `tel:${phone.replace(/[^\d+*#;,.-]/g, '')}`;
    phoneLink.textContent = phone;
  }
  const map = document.querySelector('[data-contact-map]');
  const mapUrl = safeExternalUrl(config.mapEmbedUrl ?? '') || (localized(config.address)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localized(config.address))}` : '');
  map.hidden = !mapUrl;
  if (mapUrl) map.href = mapUrl;

  const socials = document.querySelector('[data-contact-socials]');
  socials.replaceChildren();
  networks.forEach((network) => {
    const url = safeExternalUrl(context.siteConfig.social?.[network] ?? '');
    if (!url) return;
    const link = element('a', 'contact-social-link', t(`ui.social_labels.${network}`));
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    socials.append(link);
  });
  socials.hidden = !socials.childElementCount;

  const fields = form.querySelector('[data-contact-fields]');
  const review = form.querySelector('[data-contact-review]');
  const error = form.querySelector('[data-contact-error]');
  const result = form.querySelector('[data-contact-result]');
  const consent = document.querySelector('[data-contact-consent]');
  const consentError = document.querySelector('[data-contact-consent-error]');
  const mailto = form.querySelector('[data-contact-mailto]');
  let reviewedData = null;

  function showValidation(message, input) {
    error.textContent = message;
    error.hidden = false;
    if (input) input.focus();
  }

  form.onsubmit = (event) => {
    event.preventDefault();
    error.hidden = true;
    consentError.hidden = true;
    const data = new FormData(form);
    const requiredNames = ['name', 'email', 'type', 'message'];
    for (const name of requiredNames) {
      const input = form.elements.namedItem(name);
      if (!String(data.get(name) ?? '').trim()) {
        showValidation(t('contact.form.validation.required'), input);
        return;
      }
    }
    const emailInput = form.elements.namedItem('email');
    if (!emailInput.validity.valid) {
      showValidation(t('contact.form.validation.email'), emailInput);
      return;
    }
    if (!consent.checked) {
      consentError.textContent = t('contact.form.validation.consent');
      consentError.hidden = false;
      consent.focus();
      return;
    }
    reviewedData = Object.fromEntries(data.entries());
    const labels = t('contact.form.fields');
    const dl = form.querySelector('[data-contact-review-values]');
    dl.replaceChildren();
    ['name', 'company', 'department', 'position', 'email', 'phone', 'type', 'message'].forEach((key) => {
      const value = key === 'type'
        ? (t('contact.form.type_options') ?? []).find((option) => option.value === reviewedData[key])?.label
        : reviewedData[key];
      if (!value) return;
      dl.append(element('dt', '', labels[key]), element('dd', '', value));
    });
    fields.hidden = true;
    review.hidden = false;
    review.querySelector('h3').focus();
  };

  form.querySelector('[data-contact-edit]').onclick = () => {
    review.hidden = true;
    fields.hidden = false;
    form.elements.namedItem('name').focus();
  };

  form.querySelector('[data-contact-send]').onclick = async (event) => {
    const button = event.currentTarget;
    if (!reviewedData || reviewedData.website) return;
    const sendData = new FormData();
    Object.entries(reviewedData).forEach(([key, value]) => sendData.append(key, value));
    const selectedType = (t('contact.form.type_options') ?? []).find((item) => item.value === reviewedData.type)?.label ?? reviewedData.type;
    sendData.set('subject', `${contactForm.subjectPrefix ?? ''} ${selectedType}`.trim());
    result.hidden = true;
    mailto.hidden = true;
    button.disabled = true;
    button.textContent = t('contact.form.sending');
    try {
      if (!contactForm.endpoint) {
        const recipient = String(contactForm.recipientEmail || config.email || '').trim();
        if (!recipient) throw new Error('No recipient configured');
        const subject = `${contactForm.subjectPrefix ?? ''} ${selectedType}`.trim();
        const body = Object.entries(reviewedData).filter(([key]) => key !== 'website')
          .map(([key, value]) => `${labelsFor(key, t)}: ${value}`).join('\n');
        mailto.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        mailto.textContent = t('contact.form.fallback_mailto');
        mailto.hidden = false;
        mailto.click();
        result.textContent = t('contact.form.success');
      } else {
        const response = await fetch(contactForm.endpoint, { method: 'POST', body: sendData, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Form endpoint rejected the request');
        result.textContent = t('contact.form.success');
      }
      result.hidden = false;
      review.hidden = true;
      fields.hidden = true;
      form.reset();
      reviewedData = null;
    } catch {
      result.textContent = t('contact.form.error');
      result.hidden = false;
      const recipient = String(contactForm.recipientEmail || config.email || '').trim();
      if (recipient) {
        mailto.href = `mailto:${encodeURIComponent(recipient)}`;
        mailto.textContent = t('contact.form.fallback_mailto');
        mailto.hidden = false;
      }
      review.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = t('contact.form.send_button');
    }
  };
}

function labelsFor(key, t) {
  return t(`contact.form.fields.${key}`);
}

export function initializeContact(context) {
  renderContact(context);
}
