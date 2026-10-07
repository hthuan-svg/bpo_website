// Animates home page statistics when they enter the viewport.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;

function getCountParts(value) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    target: Number(match[2].replaceAll(',', '')),
    suffix: match[3]
  };
}

function showFinalValue(element) {
  element.textContent = element.dataset.countTarget ?? element.textContent;
}

function animateValue(element) {
  const parts = getCountParts(element.dataset.countTarget ?? '');
  if (!parts || !Number.isFinite(parts.target)) {
    showFinalValue(element);
    return;
  }

  const duration = 1200;
  const startedAt = performance.now();
  const formatter = new Intl.NumberFormat(document.documentElement.lang);

  function frame(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const easedProgress = 1 - (1 - progress) ** 3;
    const current = Math.round(parts.target * easedProgress);
    element.textContent = `${parts.prefix}${formatter.format(current)}${parts.suffix}`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      showFinalValue(element);
    }
  }

  requestAnimationFrame(frame);
}

export function initHomeCounters(root = document) {
  if (observer) {
    observer.disconnect();
    observer = undefined;
  }

  const counters = Array.from(root.querySelectorAll('[data-count-up]'));
  counters.forEach((counter) => {
    if (!counter.dataset.countTarget) {
      counter.dataset.countTarget = counter.textContent.trim();
    }
  });

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    counters.forEach(showFinalValue);
    return;
  }

  observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

reducedMotion.addEventListener('change', () => initHomeCounters());
