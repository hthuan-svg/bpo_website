// Renders content whose source data includes nested arrays or derived statistics.
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

function renderTeamFlow(context) {
  const container = document.querySelector('#team-flow-phases');
  if (!container) {
    return;
  }

  const phases = context.t('team.flow.phases');
  if (!Array.isArray(phases)) {
    throw new Error('Team flow phases must be an array.');
  }

  const fragment = document.createDocumentFragment();
  phases.forEach((phase) => {
    const section = createElement('section', 'team-flow__phase');
    section.append(createElement('h3', 'team-flow__phase-name', phase.name));
    const steps = createElement('ol', 'team-flow__steps');

    if (!Array.isArray(phase.steps)) {
      throw new Error('Each team flow phase must include a steps array.');
    }
    phase.steps.forEach((step) => {
      steps.append(createElement('li', 'team-flow__step', step));
    });

    section.append(steps);
    fragment.append(section);
  });
  container.replaceChildren(fragment);
}

function renderAwardCount(context) {
  const count = document.querySelector('#awards-year-count');
  if (!count) {
    return;
  }

  const text = context.t('achievements.awards.text');
  const match = typeof text === 'string' ? text.match(/\d+/u) : null;
  count.textContent = match?.[0] ?? '';
}

export function renderOrganizationPages(context) {
  renderTeamFlow(context);
  renderAwardCount(context);
}
