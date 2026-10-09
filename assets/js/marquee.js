// Builds the home showcase from registered image slots and supports the animated image strip.

function setUpMarqueeLightbox() {
  let dialog = document.querySelector('.marquee-lightbox');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'marquee-lightbox';
    dialog.innerHTML = `
      <form method="dialog" class="marquee-lightbox__form">
        <button type="submit" class="marquee-lightbox__close" aria-label="Close image">×</button>
      </form>
      <img class="marquee-lightbox__image" alt="" src="" width="1200" height="800">
    `;
    document.body.append(dialog);
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dialog.close();
    }
  });

  return dialog;
}

function attachMarqueeLightbox(image, dialog) {
  image.addEventListener('click', () => {
    const lightboxImage = dialog.querySelector('.marquee-lightbox__image');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || '';
    lightboxImage.width = image.width || 1200;
    lightboxImage.height = image.height || 800;
    dialog.showModal();
  });

  image.setAttribute('tabindex', '0');
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      image.click();
    }
  });
}

export function initializeMarquee(root = document) {
  const dialog = setUpMarqueeLightbox();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const containers = root.querySelectorAll('[data-marquee]');

  containers.forEach((container) => {
    const track = container.querySelector('.marquee__track');
    const list = container.querySelector('.marquee__list');
    if (!track || !list) {
      return;
    }

    if (container.classList.contains('home-showcase')) {
      track.querySelector(':scope > .marquee__list[aria-hidden="true"]')?.remove();
      const loopSeconds = window.siteI18n?.siteConfig?.marquee?.home?.secondsPerLoop;
      if (Number.isFinite(loopSeconds) && loopSeconds > 0) {
        container.style.setProperty('--marquee-duration', `${loopSeconds}s`);
      }
      const slots = window.siteI18n?.images?.slots ?? {};
      const showcaseSlots = Object.entries(slots)
        .filter(([name]) => /^home_showcase_\d+$/.test(name))
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

      list.replaceChildren();
      showcaseSlots.forEach(([name, slot]) => {
        const item = document.createElement('li');
        item.className = 'marquee__item';
        const figure = document.createElement('figure');
        figure.className = 'marquee__figure';
        const image = document.createElement('img');
        image.className = 'marquee__image';
        image.src = slot.src;
        image.alt = slot.alt?.[window.siteI18n.language] ?? slot.alt?.vi ?? '';
        image.loading = 'lazy';
        if (Number.isInteger(slot.width)) image.width = slot.width;
        if (Number.isInteger(slot.height)) image.height = slot.height;
        if (slot.placeholder) image.classList.add('is-placeholder');
        figure.append(image);
        item.append(figure);
        list.append(item);
      });

      if (!reducedMotion.matches && showcaseSlots.length) {
        const clone = list.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('[tabindex]').forEach((element) => element.setAttribute('tabindex', '-1'));
        track.append(clone);
      }
    }

    const images = list.querySelectorAll('.marquee__item img');
    images.forEach((image) => attachMarqueeLightbox(image, dialog));
  });
}
