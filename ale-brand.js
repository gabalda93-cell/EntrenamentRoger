/* ALÈ · capa visual de marca sobre el motor existent de Roger. */
(() => {
  'use strict';
  const LOGO = 'ale-brand-logo.svg';

  function addWelcomeBrand(){
    const eyebrows = [...document.querySelectorAll('.eyebrow')];
    const welcome = eyebrows.find(node => /benvingut/i.test((node.textContent || '').trim()));
    if (!welcome) return;
    const scope = welcome.closest('.sheet') || welcome.closest('[role="dialog"]') || welcome.parentElement;
    if (!scope || scope.querySelector('.ale-onboarding-brand')) return;
    const anchor = welcome.closest('.card') || welcome.parentElement;
    if (!anchor || !anchor.parentElement) return;
    const brand = document.createElement('div');
    brand.className = 'ale-onboarding-brand';
    brand.innerHTML = `<img src="${LOGO}" alt="ALÈ · Acompanyament esportiu i entrenament a distància">`;
    anchor.parentElement.insertBefore(brand, anchor);
  }

  let scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; addWelcomeBrand(); });
  }

  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  schedule();
})();