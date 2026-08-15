/*
  Coaching enhancements · Entrenament Roger
  Capa no invasiva sobre el bundle principal:
  - cardio explicat en passos clars
  - recordatoris discrets d'hidratació
  - pauta respiratòria específica per exercici
*/
(() => {
  'use strict';

  const STYLE_ID = 'roger-coach-enhancements-style';
  const HYDRATION_EVERY_MS = 15 * 60 * 1000;
  const ACTIVE_GRACE_MS = 30 * 1000;

  const cardioPlans = [
    {
      key: 'w1',
      match: "1' córrer / 1'30\" caminar",
      rows: [
        ['Escalfament', '5:00 caminant'],
        ['Bloc principal · 7 rondes', '1:00 corrent + 1:30 caminant'],
        ['Final', '1:00 corrent'],
        ['Tornada a la calma', '5:00 caminant']
      ]
    },
    {
      key: 'w2',
      match: "1'30\" córrer / 2' caminar",
      rows: [
        ['Escalfament', '5:00 caminant'],
        ['Bloc principal · 5 rondes', '1:30 corrent + 2:00 caminant'],
        ['Final', '1:30 corrent'],
        ['Tornada a la calma', '5:00 caminant']
      ]
    },
    {
      key: 'w3',
      match: "1'30\" / 3' / 1'30\" / 3' córrer",
      rows: [
        ['Escalfament', '5:00 caminant'],
        ['Tram 1', '1:30 corrent'],
        ['Recuperació', '1:30 caminant'],
        ['Tram 2', '3:00 corrent'],
        ['Recuperació', '3:00 caminant'],
        ['Tram 3', '1:30 corrent'],
        ['Recuperació', '1:30 caminant'],
        ['Tram 4', '3:00 corrent'],
        ['Tornada a la calma', '5:00 caminant']
      ]
    },
    {
      key: 'w4',
      match: "3' córrer / 1'30\" caminar + 5' córrer",
      rows: [
        ['Escalfament', '5:00 caminant'],
        ['Tram 1', '3:00 corrent'],
        ['Recuperació', '1:30 caminant'],
        ['Tram 2', '5:00 corrent'],
        ['Recuperació', '2:00 caminant'],
        ['Tram 3', '3:00 corrent'],
        ['Tornada a la calma', '5:00 caminant']
      ]
    }
  ];

  const breathing = {
    A1: 'Inspira abans i durant la baixada; expira mentre puges. Mantén el tronc ferm sense aguantar l’aire tota la repetició.',
    A2: 'Inspira mentre baixes les manuelles; expira mentre les empenys amunt.',
    A3: 'Inspira quan allargues el braç; expira mentre portes el colze cap al maluc.',
    A4: 'Inspira a baix; expira mentre eleves el maluc i controus els glutis.',
    A5: 'Inspira mentre baixes; expira mentre puges.',
    A6: 'Inspira quan allargues els braços; expira mentre estires cap a les celles.',
    A7: 'Expira lentament mentre allargues braç i cama; inspira en tornar. Mantén la zona lumbar estable.',
    B1: 'Inspira mentre baixes; expira mentre empenys amb la cama davantera per pujar.',
    B2: 'Inspira mentre baixes les manuelles; expira mentre les empenys per sobre del cap.',
    B3: 'Inspira mentre deixes pujar l’agafador; expira mentre portes els colzes cap avall.',
    B4: 'Inspira mentre allargues les cames; expira mentre flexiones els genolls i tornes.',
    B5: 'Inspira mentre baixes la barra; expira mentre flexiones els colzes.',
    B6: 'Expira mentre eleves els braços en Y; inspira mentre baixes amb control.',
    B7: 'Respira amb normalitat durant tota la planxa. No mantinguis l’aire bloquejat.',
    C1: 'Inspira mentre baixes; expira mentre empenys amb la cama davantera per tornar amunt.',
    C2: 'Inspira mentre baixes les manuelles; expira mentre les empenys amunt.',
    C3: 'Inspira mentre baixes i allargues els braços; expira mentre remes i portes els colzes enrere.',
    C4: 'Inspira mentre allargues les cames; expira mentre flexiones els genolls i tornes.',
    C5: 'Expira mentre eleves les manuelles; inspira mentre les baixes amb control.',
    C6: 'Inspira mentre deixes tornar l’agafador; expira mentre estens els colzes.',
    C7: 'Inspira mentre baixes; expira mentre puges.',
    C8: 'Respira de manera contínua; expira suaument en elevar cada genoll i mantén el tronc estable.'
  };

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .coach-plan{margin:8px 0 4px;padding:11px 12px;border-radius:13px;background:rgba(46,125,114,.07);border:.5px solid rgba(46,125,114,.18)}
      .coach-plan-title{font-size:10px;font-weight:750;letter-spacing:.12em;text-transform:uppercase;color:var(--ac,#2E7D72);margin-bottom:6px}
      .coach-plan-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:7px 0;border-top:.5px solid var(--line,rgba(74,62,48,.10));font-size:12.5px;line-height:1.35}
      .coach-plan-row:first-of-type{border-top:0}
      .coach-plan-row span{color:var(--tx2,#6F665B)}
      .coach-plan-row b{color:var(--tx,#2E2A25);text-align:right;font-weight:650}
      .coach-plan-foot{margin-top:7px;font-size:11.5px;line-height:1.4;color:var(--tx2,#6F665B)}
      .coach-breath{margin:10px 0 0;padding:11px 12px;border-radius:13px;background:rgba(180,118,63,.07);border:.5px solid rgba(180,118,63,.20)}
      .coach-breath-head{font-size:10px;font-weight:750;letter-spacing:.12em;text-transform:uppercase;color:var(--ac2,#B4763F);margin-bottom:5px}
      .coach-breath p{margin:0;font-size:12.5px;line-height:1.45;color:var(--tx,#2E2A25)}
      .coach-breath small{display:block;margin-top:5px;font-size:10.5px;line-height:1.35;color:var(--tx3,#9C9184)}
      .coach-hydration-start,.coach-cardio-guide{margin:0 0 12px;padding:11px 12px;border-radius:13px;background:rgba(46,125,114,.08);border:.5px solid rgba(46,125,114,.20);font-size:12.5px;line-height:1.45;color:var(--tx,#2E2A25)}
      .coach-hydration-start b,.coach-cardio-guide b{color:var(--ac,#2E7D72)}
      .coach-toast{position:fixed;left:50%;bottom:max(86px,calc(env(safe-area-inset-bottom) + 74px));transform:translate(-50%,18px);width:min(360px,calc(100vw - 32px));box-sizing:border-box;padding:12px 14px;border-radius:15px;background:#2E2A25;color:#FFFBF4;box-shadow:0 12px 32px rgba(0,0,0,.22);font-size:13px;line-height:1.4;z-index:99999;opacity:0;pointer-events:none;transition:opacity .22s ease,transform .22s ease}
      .coach-toast.show{opacity:1;transform:translate(-50%,0)}
      .coach-toast b{color:#B9E1DB}
    `;
    document.head.appendChild(style);
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function enhanceCardioSummaries() {
    const paragraphs = [...document.querySelectorAll('p')];
    for (const p of paragraphs) {
      if (p.dataset.coachCardioSource) continue;
      const text = (p.textContent || '').trim();
      const plan = cardioPlans.find(item => text.includes(item.match));
      if (!plan) continue;

      p.dataset.coachCardioSource = plan.key;
      p.style.display = 'none';

      const box = make('div', 'coach-plan');
      box.dataset.coachPlan = plan.key;
      box.appendChild(make('div', 'coach-plan-title', 'Què has de fer'));

      for (const [label, value] of plan.rows) {
        const row = make('div', 'coach-plan-row');
        row.appendChild(make('span', '', label));
        row.appendChild(make('b', '', value));
        box.appendChild(row);
      }

      box.appendChild(make('div', 'coach-plan-foot', 'No cal memoritzar-ho: quan comencis l’exposició, l’app et guiarà tram a tram amb compte enrere i avís de canvi.'));
      p.insertAdjacentElement('afterend', box);
    }
  }

  function currentNavbarHead() {
    const head = document.querySelector('.sheet .navbar .head');
    return head ? (head.textContent || '').trim() : '';
  }

  function enhanceActiveCardio() {
    const head = currentNavbarHead();
    if (!/^Cardio · setmana\s+\d+/i.test(head)) return;
    const wrap = document.querySelector('.sheet .wrap');
    if (!wrap || wrap.querySelector('[data-coach-cardio-guide]')) return;

    const card = make('div', 'coach-cardio-guide');
    card.dataset.coachCardioGuide = '1';
    const bold = make('b', '', 'Segueix la pantalla. ');
    card.appendChild(bold);
    card.append('No has de recordar cap fórmula: el compte enrere i els avisos t’indiquen quan caminar i quan córrer. Tingues aigua a mà.');
    wrap.insertBefore(card, wrap.firstChild);
  }

  function enhanceCheckinHydration() {
    const head = currentNavbarHead();
    if (head !== 'Abans de començar') return;
    const wrap = document.querySelector('.sheet .wrap');
    if (!wrap || wrap.querySelector('[data-coach-hydration-start]')) return;
    if (!(wrap.textContent || '').includes('Energia')) return;

    const card = make('div', 'coach-hydration-start');
    card.dataset.coachHydrationStart = '1';
    const bold = make('b', '', 'Abans de començar · ');
    card.appendChild(bold);
    card.append('deixa una ampolla d’aigua a mà. Durant la sessió et farem recordatoris discrets; hidrata’t segons la set i les condicions.');
    wrap.insertBefore(card, wrap.firstChild);
  }

  function enhanceBreathing() {
    const head = currentNavbarHead();
    const match = head.match(/^([ABC]\d)\s*·/);
    if (!match) return;
    const id = match[1];
    const cue = breathing[id];
    if (!cue) return;

    const wrap = document.querySelector('.sheet .wrap');
    if (!wrap || wrap.querySelector(`[data-coach-breath="${id}"]`)) return;

    const prescription = [...wrap.querySelectorAll('p.cap')].find(p => {
      const text = p.textContent || '';
      return text.includes('descans') && (text.includes('sèries') || text.includes('reps') || text.includes('RIR'));
    });

    const card = make('div', 'coach-breath');
    card.dataset.coachBreath = id;
    card.appendChild(make('div', 'coach-breath-head', 'Respiració'));
    card.appendChild(make('p', '', cue));
    card.appendChild(make('small', '', 'Busca una respiració fluida i estable; no cal forçar inspiracions profundes ni mantenir l’aire bloquejat durant tota la sèrie.'));

    if (prescription) prescription.insertAdjacentElement('afterend', card);
    else wrap.appendChild(card);
  }

  let toastTimer = 0;
  let toastIndex = 0;
  const hydrationMessages = [
    'Hidratació · aprofita el descans per fer uns glops d’aigua si tens set.',
    'Aigua a mà · hidrata’t amb calma i continua quan estiguis preparat.',
    'Recordatori d’hidratació · uns glops durant el descans poden ser un bon moment.'
  ];

  function showHydrationToast() {
    document.querySelectorAll('.coach-toast').forEach(node => node.remove());
    const toast = make('div', 'coach-toast');
    const bold = make('b', '', '💧 ');
    toast.appendChild(bold);
    toast.append(hydrationMessages[toastIndex % hydrationMessages.length]);
    toastIndex += 1;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
      window.setTimeout(() => toast.remove(), 260);
    }, 5200);
  }

  function detectActiveMode() {
    const head = currentNavbarHead();
    if (!head) return null;
    if (/^Cardio · setmana\s+\d+/i.test(head)) return 'cardio';
    if (/^[ABC]\d\s*·/.test(head) || /^Sessió [ABC]$/.test(head) || head === 'Bloc postural') return 'strength';
    return null;
  }

  let activeMode = null;
  let activeSince = 0;
  let lastActiveSeen = 0;
  let nextHydrationAt = HYDRATION_EVERY_MS;

  function updateHydrationClock() {
    const now = Date.now();
    const mode = detectActiveMode();

    if (mode) {
      lastActiveSeen = now;
      if (mode !== activeMode) {
        activeMode = mode;
        activeSince = now;
        nextHydrationAt = HYDRATION_EVERY_MS;
      }
    } else if (activeMode && now - lastActiveSeen > ACTIVE_GRACE_MS) {
      activeMode = null;
      activeSince = 0;
      nextHydrationAt = HYDRATION_EVERY_MS;
      return;
    }

    if (!activeMode || document.visibilityState === 'hidden') return;
    const elapsed = now - activeSince;
    if (elapsed >= nextHydrationAt) {
      showHydrationToast();
      nextHydrationAt += HYDRATION_EVERY_MS;
    }
  }

  let enhanceScheduled = false;
  function enhance() {
    enhanceScheduled = false;
    addStyles();
    enhanceCardioSummaries();
    enhanceActiveCardio();
    enhanceCheckinHydration();
    enhanceBreathing();
  }

  function scheduleEnhance() {
    if (enhanceScheduled) return;
    enhanceScheduled = true;
    requestAnimationFrame(enhance);
  }

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', scheduleEnhance, { once: true });
  window.addEventListener('load', scheduleEnhance, { once: true });
  window.setInterval(updateHydrationClock, 15000);
  scheduleEnhance();
})();
