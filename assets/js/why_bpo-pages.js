function renderWhyBpoOrg(context) {
  const container = document.querySelector('.why_bpo-org__figure');
  if (!container) {
    return;
  }

  const image = container.querySelector('.why_bpo-org__image');
  if (image) {
    image.alt = context.t('why_bpo.org.image') || image.alt || '';
  }
}

function renderWhyBpoPeople(context) {
  const timeline = document.querySelector('.why_bpo-people__timeline');
  if (timeline) {
    const steps = Array.isArray(context.t('why_bpo.people.steps')) ? context.t('why_bpo.people.steps') : [];
    if (steps.length > 0) {
      const cards = timeline.querySelectorAll('.why_bpo-people__step');
      cards.forEach((card, index) => {
        card.classList.toggle('is-featured', index === 0);
      });
    }
  }
}

function renderSubaruTech(context) {
  const root = document.querySelector('#subaru-tech-list');
  if (!root) return;

  const items = Array.isArray(context.t('subaru.tech.items')) ? context.t('subaru.tech.items') : [];
  root.replaceChildren();

  items.forEach((item) => {
    const article = document.createElement('article');
    article.className = `subaru-tech__item${item.highlight ? ' is-highlighted' : ''}`;
    const imageWrap = document.createElement('div');
    imageWrap.className = 'subaru-tech__image';
    const image = document.createElement('img');
    const slot = context.images?.slots?.[item.image];
    if (slot) {
      image.src = slot.src;
      image.alt = slot.alt?.[context.language] ?? slot.alt?.vi ?? '';
      if (slot.placeholder) {
        imageWrap.classList.add('is-placeholder');
        imageWrap.dataset.placeholderLabel = context.t('ui.image_placeholder');
      }
      image.loading = 'lazy';
    }
    imageWrap.append(image);

    const body = document.createElement('div');
    body.className = 'subaru-tech__body';
    const header = document.createElement('div');
    header.className = 'subaru-tech__header';
    if (item.highlight && item.partnership_badge) {
      const badge = document.createElement('span');
      badge.className = 'subaru-tech__badge';
      badge.textContent = item.partnership_badge;
      header.append(badge);
    }
    const title = document.createElement('h3');
    title.className = 'subaru-tech__title';
    title.textContent = item.name ?? '';
    header.append(title);
    body.append(header);

    const text = document.createElement('p');
    text.className = 'subaru-tech__text';
    text.textContent = item.text ?? '';
    body.append(text);
    if (item.highlight && item.partnership) {
      const partnership = document.createElement('p');
      partnership.className = 'subaru-tech__partnership';
      partnership.textContent = item.partnership;
      body.append(partnership);
    }
    if (item.highlight && item.partnership_image) {
      const extraWrap = document.createElement('div');
      extraWrap.className = 'subaru-tech__partnership-image';
      const extraSlot = context.images?.slots?.[item.partnership_image];
      if (extraSlot?.placeholder) {
        extraWrap.classList.add('is-placeholder');
        extraWrap.dataset.placeholderLabel = context.t('ui.image_placeholder');
      }
      if (extraSlot) {
        const extraImage = document.createElement('img');
        extraImage.src = extraSlot.src;
        extraImage.alt = extraSlot.alt?.[context.language] ?? extraSlot.alt?.vi ?? '';
        extraImage.loading = 'lazy';
        extraWrap.append(extraImage);
      }
      body.append(extraWrap);
    }
    article.append(imageWrap, body);
    root.append(article);
  });
}

export function renderWhyBpoPages(context) {
  renderWhyBpoOrg(context);
  renderWhyBpoPeople(context);
  renderSubaruTech(context);
}
