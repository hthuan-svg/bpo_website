// Builds the shared marquee used for home/services showcases and keeps it keyboard and motion accessible.

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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = setUpMarqueeLightbox();
  const containers = root.querySelectorAll('[data-marquee]');

  containers.forEach((container) => {
    if (container.dataset.marqueeReady === 'true') {
      return;
    }

    const track = container.querySelector('.marquee__track');
    const list = container.querySelector('.marquee__list');
    if (!track || !list) {
      return;
    }

    const items = Array.from(list.children).filter((node) => !(node instanceof HTMLTemplateElement));
    if (!reducedMotion.matches && items.length) {
      const clone = list.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

    container.dataset.marqueeReady = 'true';
    const images = container.querySelectorAll('.marquee__item img');
    images.forEach((image) => attachMarqueeLightbox(image, dialog));
  });
}
