// Renders team-section data and the supporting diagrams used on organization pages.
function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = String(text);
  }
  return element;
}

function updateTeamTabs() {
  const sections = Array.from(document.querySelectorAll('#org, #process, #people'));
  const buttons = Array.from(document.querySelectorAll('.team-tabs__tab'));
  if (!sections.length || !buttons.length) {
    return;
  }

  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.offsetTop <= scrollY) {
      activeId = section.id;
    }
  }

  buttons.forEach((button) => {
    const target = button.dataset.target;
    const isActive = target === `#${activeId}`;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function bindTeamTabs() {
  if (document.body.dataset.teamTabsBound === 'true') {
    return;
  }

  const buttons = document.querySelectorAll('.team-tabs__tab');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.target ?? '#org');
      if (!target) {
        return;
      }
      const offset = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('scroll', updateTeamTabs, { passive: true });
  window.addEventListener('resize', updateTeamTabs);
  document.body.dataset.teamTabsBound = 'true';
  updateTeamTabs();
}

function renderTeamOrg(context) {
  const container = document.querySelector('.team-org__figure');
  if (!container) {
    return;
  }

  const image = container.querySelector('.team-org__image');
  if (image) {
    image.alt = context.t('team.org.image') || image.alt || '';
  }
}

function renderTeamProcess(context) {
  const list = document.querySelector('#team-process-list');
  if (!list) {
    return;
  }

  const steps = Array.isArray(context.t('team.process.steps')) ? context.t('team.process.steps') : [];
  if (!steps.length) {
    return;
  }

  const actors = context.t('team.process.actors') ?? {};
  const fragment = document.createDocumentFragment();

  steps.forEach((step, index) => {
    const item = document.createElement('li');
    item.className = 'team-process__step';

    const number = document.createElement('span');
    number.className = 'team-process__number';
    number.textContent = String(index + 1);

    const content = document.createElement('div');
    content.className = 'team-process__step-content';

    const actor = document.createElement('div');
    actor.className = 'team-process__actor';
    const actorKey = step.actor ?? 'both';
    actor.textContent = actors[actorKey] ?? actorKey;

    const text = document.createElement('p');
    text.className = 'team-process__text';
    text.textContent = step.text ?? '';

    content.append(actor, text);
    item.append(number, content);
    fragment.appendChild(item);
  });

  list.replaceChildren(fragment);
}

function renderTeamPeople(context) {
  const images = document.querySelectorAll('.team-people__image');
  images.forEach((image, index) => {
    if (index === 0) {
      image.classList.add('is-featured');
    }
  });
  const timeline = document.querySelector('.team-people__timeline');
  if (timeline) {
    const steps = Array.isArray(context.t('team.people.steps')) ? context.t('team.people.steps') : [];
    if (steps.length > 0) {
      const cards = timeline.querySelectorAll('.team-people__step');
      cards.forEach((card, index) => {
        card.classList.toggle('is-featured', index === 0);
      });
    }
  }
}

export function renderOrganizationPages(context) {
  bindTeamTabs();
  renderTeamOrg(context);
  renderTeamProcess(context);
  renderTeamPeople(context);
  updateTeamTabs();
}
