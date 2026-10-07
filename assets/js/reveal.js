// Reveals marked elements as they enter the viewport, unless motion is reduced.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;

function revealImmediately(elements) {
  elements.forEach((element) => {
    element.classList.add('is-revealed');
    element.classList.remove('reveal');
  });
}

export function initReveal(root = document) {
  const elements = Array.from(root.querySelectorAll('[data-reveal]'));

  if (observer) {
    observer.disconnect();
    observer = undefined;
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealImmediately(elements);
    return;
  }

  const unrevealedElements = elements.filter((element) => (
    !element.classList.contains('is-revealed')
  ));

  unrevealedElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${Math.min(index * 50, 200)}ms`;
  });

  observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px'
  });

  unrevealedElements.forEach((element) => observer.observe(element));
}

reducedMotion.addEventListener('change', () => initReveal());
