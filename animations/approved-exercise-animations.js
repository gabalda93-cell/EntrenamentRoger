/*
  Animacions d'exercici aprovades · Entrenament Roger

  Aquesta capa és independent del reproductor vectorial antic. Només munta
  exercicis presents al registre APPROVED; la resta continuen ocults per
  exercise-animations-off.js.
*/
(() => {
  'use strict';

  const APPROVED = Object.freeze({
    A1: Object.freeze({
      name: 'Esquat goblet',
      tempo: '3–0–1–0',
      views: Object.freeze([
        Object.freeze({
          key: 'lateral',
          label: 'Lateral',
          state: 'Tècnica correcta',
          src: './animations/approved/a1-goblet/goblet-lateral-correcte.gif',
          alt: 'Esquat goblet correcte vist de costat: peus plantats, tronc estable i maluc baixant fins a un rang proper al paral·lel.',
          description: 'Vista lateral · càrrega estable al pit, talons en contacte i centre de masses sobre la base de suport.'
        }),
        Object.freeze({
          key: 'frontal',
          label: 'Frontal',
          state: 'Tècnica correcta',
          src: './animations/approved/a1-goblet/goblet-frontal-correcte.gif',
          alt: 'Esquat goblet correcte vist de front: genolls alineats amb els peus i manuella sostinguda davant del pit.',
          description: 'Vista frontal · els genolls segueixen la direcció dels peus i la càrrega es manté centrada.'
        }),
        Object.freeze({
          key: 'valg',
          label: 'Error: genolls',
          state: 'Error tècnic',
          src: './animations/approved/a1-goblet/goblet-frontal-error-valg-de-genoll.gif',
          alt: 'Error en l’esquat goblet vist de front: els genolls cauen cap endins durant la baixada.',
          description: 'Error · els genolls es desplacen cap endins. Redueix el rang o la càrrega i recupera l’alineació amb els peus.',
          error: true
        })
      ])
    })
  });

  const CARD_SELECTOR = '[data-approved-exercise]';

  function exerciseId(text) {
    const match = (text || '').trim().match(/^([ABC]\d+)\s*·/);
    return match ? match[1] : null;
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function createCard(id, context) {
    const exercise = APPROVED[id];
    const card = make('section', 'ale-approved-animation');
    card.dataset.approvedExercise = id;
    card.dataset.approvedContext = context;
    card.setAttribute('aria-label', `Demostració validada · ${exercise.name}`);

    const head = make('div', 'ale-approved-animation__head');
    const identity = make('div');
    identity.appendChild(make('p', 'ale-approved-animation__eyebrow', 'Demostració validada'));
    identity.appendChild(make('h3', 'ale-approved-animation__title', exercise.name));
    head.appendChild(identity);
    head.appendChild(make('span', 'ale-approved-animation__tempo', exercise.tempo));
    card.appendChild(head);

    const tabs = make('div', 'ale-approved-animation__tabs');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Tria la vista de l’exercici');
    card.appendChild(tabs);

    const visual = make('div', 'ale-approved-animation__visual');
    const image = make('img', 'ale-approved-animation__image');
    image.decoding = 'async';
    const state = make('p', 'ale-approved-animation__state');
    visual.appendChild(image);
    visual.appendChild(state);
    card.appendChild(visual);

    const copy = make('div', 'ale-approved-animation__copy');
    const description = make('p', 'ale-approved-animation__description');
    description.setAttribute('aria-live', 'polite');
    copy.appendChild(description);
    copy.appendChild(make('p', 'ale-approved-animation__foot', 'Tempo 3–0–1–0 · baixada, pausa baixa, pujada, pausa alta.'));
    card.appendChild(copy);

    let active = '';
    function select(view) {
      if (active === view.key) return;
      active = view.key;
      visual.dataset.error = view.error ? 'true' : 'false';
      image.alt = view.alt;
      state.textContent = view.state;
      description.textContent = view.description;
      tabs.querySelectorAll('button').forEach(button => {
        button.setAttribute('aria-pressed', button.dataset.view === view.key ? 'true' : 'false');
      });

      // Retirar i restablir la font reinicia el GIF a la primera postura.
      image.removeAttribute('src');
      requestAnimationFrame(() => {
        if (card.isConnected && active === view.key) image.src = view.src;
      });
    }

    exercise.views.forEach((view, index) => {
      const button = make('button', `ale-approved-animation__tab${view.error ? ' ale-approved-animation__tab--error' : ''}`, view.label);
      button.type = 'button';
      button.dataset.view = view.key;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => select(view));
      tabs.appendChild(button);
      if (index === 0) select(view);
    });

    return card;
  }

  function activeSessionId(sheet) {
    const head = sheet && sheet.querySelector(':scope > .navbar .head');
    return exerciseId(head && head.textContent);
  }

  function removeStaleCards() {
    document.querySelectorAll(CARD_SELECTOR).forEach(card => {
      const id = card.dataset.approvedExercise;
      const context = card.dataset.approvedContext;
      if (!APPROVED[id]) {
        card.remove();
        return;
      }

      if (context === 'session') {
        const sheet = card.closest('.sheet');
        if (!sheet || activeSessionId(sheet) !== id) card.remove();
        return;
      }

      if (context === 'plan') {
        const owner = card.parentElement;
        const marker = owner && [...owner.querySelectorAll('.row.tap .mono')]
          .find(node => (node.textContent || '').trim() === id);
        const native = owner && owner.querySelector('.figbox');
        if (!marker || !native) card.remove();
      }
    });
  }

  function mountSessionCards() {
    document.querySelectorAll('.sheet').forEach(sheet => {
      const id = activeSessionId(sheet);
      if (!APPROVED[id]) return;
      const native = sheet.querySelector(':scope > .wrap > div > .figbox');
      if (!native || !native.parentElement) return;
      const parent = native.parentElement;
      const existing = parent.querySelector(`:scope > [data-approved-exercise="${id}"][data-approved-context="session"]`);
      if (!existing) parent.insertBefore(createCard(id, 'session'), native);
    });
  }

  function mountPlanCards() {
    document.querySelectorAll('.row.tap .mono').forEach(marker => {
      const id = (marker.textContent || '').trim();
      if (!APPROVED[id]) return;
      const row = marker.closest('.row.tap');
      const owner = row && row.parentElement;
      const native = owner && owner.querySelector('.figbox');
      if (!owner || !native) return;
      const existing = owner.querySelector(`:scope > [data-approved-exercise="${id}"][data-approved-context="plan"]`);
      if (existing) return;

      let anchor = native;
      while (anchor.parentElement && anchor.parentElement !== owner) anchor = anchor.parentElement;
      if (anchor.parentElement === owner) owner.insertBefore(createCard(id, 'plan'), anchor);
    });
  }

  let scheduled = false;
  function sync() {
    scheduled = false;
    removeStaleCards();
    mountSessionCards();
    mountPlanCards();
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(sync);
  }

  const observer = new MutationObserver(scheduleSync);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', scheduleSync, { once: true });
  window.addEventListener('load', scheduleSync, { once: true });
  scheduleSync();
})();
