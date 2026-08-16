/* ALÈ · capa visual de marca sobre el motor existent de Roger. */
(() => {
  'use strict';
  const LOGO = 'ale-brand-logo.svg';
  const CLASS = 'ale-onboarding-brand';

  function getWelcome(){
    return [...document.querySelectorAll('.eyebrow')]
      .find(node => /benvingut/i.test((node.textContent || '').trim())) || null;
  }

  function reconcileWelcomeBrand(){
    const welcome = getWelcome();
    const all = [...document.querySelectorAll('.' + CLASS)];

    /* Si la benvinguda ja no és a pantalla, no hi ha d'haver cap logo injectat. */
    if (!welcome) {
      all.forEach(node => node.remove());
      return;
    }

    const anchor = welcome.closest('.card') || welcome.parentElement;
    const host = anchor && anchor.parentElement;
    if (!anchor || !host) {
      all.forEach(node => node.remove());
      return;
    }

    /* Conserva com a màxim un logo, i només dins del contenidor de la benvinguda actual. */
    let brand = all.find(node => node.parentElement === host) || null;
    all.forEach(node => {
      if (node !== brand) node.remove();
    });

    if (!brand) {
      brand = document.createElement('div');
      brand.className = CLASS;
      brand.setAttribute('data-ale-brand-singleton', '1');
      brand.innerHTML = `<img src="${LOGO}" alt="ALÈ · Acompanyament esportiu i entrenament a distància">`;
      host.insertBefore(brand, anchor);
    }
  }

  let scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      reconcileWelcomeBrand();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  schedule();
})();