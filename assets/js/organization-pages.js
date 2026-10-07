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
  const sections = Array.from(document.querySelectorAll('#org, #process, #people, #recruit'));
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

function drawOrgConnections() {
  const chart = document.querySelector('#team-org-chart');
  if (!chart) {
    return;
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'team-org__connectors');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('aria-hidden', 'true');

  const chartRect = chart.getBoundingClientRect();
  const getNodeCenter = (bandId, nodeIndex) => {
    const band = chart.querySelector(`.team-org__band[data-level-id="${bandId}"]`);
    if (!band) {
      return null;
    }
    const node = band.querySelectorAll('.team-org__node')[nodeIndex];
    if (!node) {
      return null;
    }
    const nodeRect = node.getBoundingClientRect();
    return {
      x: (nodeRect.left + nodeRect.right) / 2 - chartRect.left,
      y: (nodeRect.top + nodeRect.bottom) / 2 - chartRect.top
    };
  };

  const drawPath = (start, end, dash = false) => {
    if (!start || !end) {
      return;
    }
    const midX = (start.x + end.x) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(60, 95, 78, 0.42)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    if (dash) {
      path.setAttribute('stroke-dasharray', '8 8');
    }
    svg.appendChild(path);
  };

  drawPath(getNodeCenter('overall', 0), getNodeCenter('support', 0));
  drawPath(getNodeCenter('overall', 0), getNodeCenter('support', 1));
  drawPath(getNodeCenter('support', 1), getNodeCenter('pm', 0));
  drawPath(getNodeCenter('support', 1), getNodeCenter('pm', 1));
  drawPath(getNodeCenter('support', 1), getNodeCenter('pm', 2));
  drawPath(getNodeCenter('pm_support', 0), getNodeCenter('qc2', 0));
  drawPath(getNodeCenter('pm_support', 0), getNodeCenter('qc2', 1));

  for (let checkerIndex = 0; checkerIndex < 4; checkerIndex += 1) {
    const checkerCenter = getNodeCenter('qc1', checkerIndex);
    const startIndex = checkerIndex * 2;
    drawPath(checkerCenter, getNodeCenter('annotation', startIndex));
    drawPath(checkerCenter, getNodeCenter('annotation', startIndex + 1));
  }

  for (let superCheckerIndex = 0; superCheckerIndex < 2; superCheckerIndex += 1) {
    const startIndex = superCheckerIndex * 2;
    const superCheckerCenter = getNodeCenter('qc2', superCheckerIndex);
    const checkerTargets = [startIndex, startIndex + 1, startIndex + 2, startIndex + 3];
    checkerTargets.forEach((checkerIndex) => {
      drawPath(superCheckerCenter, getNodeCenter('qc1', checkerIndex), checkerIndex >= 2);
    });
  }

  chart.appendChild(svg);
}

function renderTeamOrg(context) {
  const chart = document.querySelector('#team-org-chart');
  if (!chart) {
    return;
  }

  const levels = Array.isArray(context.t('team.org.levels')) ? context.t('team.org.levels') : [];
  const fragment = document.createDocumentFragment();

  levels.forEach((level) => {
    const band = createElement('div', 'team-org__band');
    band.dataset.levelId = level.id;
    band.dataset.tone = level.tone ?? 'slate';

    const label = createElement('div', 'team-org__label');
    label.textContent = level.label ?? '';

    const nodes = createElement('div', 'team-org__nodes');
    const roleNodes = Array.isArray(level.nodes) ? level.nodes : [];
    roleNodes.forEach((node) => {
      const card = createElement('div', 'team-org__node');
      const role = createElement('span', 'team-org__role', node.role ?? '');
      card.appendChild(role);
      if (node.code) {
        const code = createElement('span', 'team-org__code', node.code);
        card.appendChild(code);
      }
      nodes.appendChild(card);
    });

    band.append(label, nodes);
    fragment.appendChild(band);
  });

  chart.replaceChildren(fragment);
  requestAnimationFrame(drawOrgConnections);
}

function drawProcessConnections(context) {
  const chart = document.querySelector('#team-process-chart');
  if (!chart) {
    return;
  }

  const existing = chart.querySelector('.team-process__edges');
  if (existing) {
    existing.remove();
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'team-process__edges');
  svg.setAttribute('aria-hidden', 'true');

  const nodes = new Map();
  chart.querySelectorAll('.team-process__node').forEach((node) => {
    nodes.set(node.dataset.nodeId, node);
  });

  const edges = Array.isArray(context.t('team.process.edges')) ? context.t('team.process.edges') : [];
  if (!edges.length) {
    return;
  }

  const chartRect = chart.getBoundingClientRect();
  const drawEdge = (fromId, toId, dashed = false) => {
    const from = nodes.get(fromId);
    const to = nodes.get(toId);
    if (!from || !to) {
      return;
    }

    const start = from.getBoundingClientRect();
    const end = to.getBoundingClientRect();
    const x1 = (start.left + start.right) / 2 - chartRect.left;
    const y1 = (start.top + start.bottom) / 2 - chartRect.top;
    const x2 = (end.left + end.right) / 2 - chartRect.left;
    const y2 = (end.top + end.bottom) / 2 - chartRect.top;
    const midX = (x1 + x2) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', dashed ? 'rgba(93, 93, 133, 0.9)' : 'rgba(93, 112, 120, 0.6)');
    path.setAttribute('stroke-width', dashed ? '2.5' : '2');
    path.setAttribute('stroke-linecap', 'round');
    if (dashed) {
      path.setAttribute('stroke-dasharray', '8 9');
    }
    svg.appendChild(path);

    if (dashed) {
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', midX);
      label.setAttribute('y', Math.min(y1, y2) - 10);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '11');
      label.setAttribute('fill', '#2d3f2f');
      label.textContent = 'Feedback';
      svg.appendChild(label);
    }
  };

  edges.forEach(([from, to]) => drawEdge(from, to, from === 'm9' && to === 'm4'));
  chart.appendChild(svg);
}

function renderTeamProcess(context) {
  const container = document.querySelector('#team-process-chart');
  if (!container) {
    return;
  }

  const lanes = Array.isArray(context.t('team.process.lanes')) ? context.t('team.process.lanes') : [];
  const phases = Array.isArray(context.t('team.process.phases')) ? context.t('team.process.phases') : [];
  const nodes = Array.isArray(context.t('team.process.nodes')) ? context.t('team.process.nodes') : [];
  const pane = document.createElement('div');
  pane.className = 'team-process__pane';

  const laneRow = document.createElement('div');
  laneRow.className = 'team-process__lanes';
  lanes.forEach((lane) => {
    const laneLabel = createElement('div', 'team-process__lane', lane);
    laneRow.appendChild(laneLabel);
  });
  pane.appendChild(laneRow);

  const phaseGrid = document.createElement('div');
  phaseGrid.className = 'team-process__phases';
  phases.forEach((phaseName, phaseIndex) => {
    const phase = createElement('section', 'team-process__phase');
    const phaseHeader = createElement('div', 'team-process__phase-header', phaseName);
    phase.appendChild(phaseHeader);

    const groupedNodes = nodes.filter((node) => node.phase === phaseIndex);
    groupedNodes.forEach((node) => {
      const item = createElement('div', 'team-process__node');
      item.dataset.nodeId = node.id;
      item.style.gridColumn = String((node.lane ?? 0) + 1);
      item.style.gridRow = String((groupedNodes.indexOf(node) ?? 0) + 1);
      item.textContent = node.text ?? '';
      phase.appendChild(item);
    });
    phaseGrid.appendChild(phase);
  });

  pane.appendChild(phaseGrid);
  container.replaceChildren(pane);
  window.requestAnimationFrame(() => {
    if (window.matchMedia('(max-width: 799px)').matches) {
      return;
    }
    drawProcessConnections(context);
  });
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

function renderAwardCount(context) {
  const count = document.querySelector('#awards-year-count');
  if (!count) {
    return;
  }

  const text = context.t('achievements.awards.text');
  const match = typeof text === 'string' ? text.match(/\d+/u) : null;
  count.textContent = match?.[0] ?? '';
}

function renderTeamRecruit(context) {
  const buttons = document.querySelectorAll('.team-recruit__cta');
  buttons.forEach((button) => {
    const href = button.getAttribute('href');
    if (href && href.startsWith('contact.html')) {
      const currentLang = context.language || 'vi';
      button.setAttribute('href', `contact.html?lang=${encodeURIComponent(currentLang)}`);
    }
  });
}

export function renderOrganizationPages(context) {
  bindTeamTabs();
  renderTeamOrg(context);
  renderTeamProcess(context);
  renderTeamPeople(context);
  renderTeamRecruit(context);
  renderAwardCount(context);
  updateTeamTabs();
}
