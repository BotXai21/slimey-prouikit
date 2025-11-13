
// proUIKit.js - helper behaviors for demo (modals, toasts, dropdowns, tabs, accordion, drawer)
// Lightweight, dependency-free — meant as an example to wire up UI interactions

(function(window, document){
  'use strict';

  // Theme toggle helper
  function toggleTheme() { document.body.classList.toggle('pui-dark'); }

  // Dropdown helper (simple)
  function initDropdowns() {
    document.querySelectorAll('.pui-dropdown').forEach(dd=>{
      const btn = dd.querySelector('button');
      if(!btn) return;
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        dd.classList.toggle('is-open');
      });
    });
    document.addEventListener('click', ()=> document.querySelectorAll('.pui-dropdown.is-open').forEach(d=>d.classList.remove('is-open')));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ document.querySelectorAll('.is-open').forEach(el=>el.classList.remove('is-open')) }});
  }

  // Tabs helper
  function initTabs() {
    document.querySelectorAll('.pui-tabs').forEach(wrap=>{
      wrap.querySelectorAll('.tab').forEach(tab=>{
        tab.addEventListener('click', ()=>{
          wrap.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
          wrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('is-active'));
          tab.classList.add('active');
          const tgt = wrap.querySelector(tab.dataset.target);
          if(tgt) tgt.classList.add('is-active');
        });
      });
    });
  }

  // Accordion helper
  function initAccordions() {
    document.querySelectorAll('.pui-accordion .summary').forEach(sum=>{
      sum.addEventListener('click', ()=> sum.parentElement.classList.toggle('is-open'));
    });
  }

  // Modal helpers
  function initModals() {
    document.querySelectorAll('[data-pui-modal-open]').forEach(btn=>{
      const id = btn.getAttribute('data-pui-modal-open');
      const modal = document.getElementById(id);
      if(modal) btn.addEventListener('click', ()=> modal.classList.add('is-open'));
    });
    document.querySelectorAll('.pui-modal').forEach(modal=>{
      modal.addEventListener('click', (e)=> { if(e.target===modal) modal.classList.remove('is-open'); });
    });
    document.querySelectorAll('[data-pui-modal-close]').forEach(btn=> btn.addEventListener('click', ()=> btn.closest('.pui-modal').classList.remove('is-open')));
  }

  // Drawer helper
  function initDrawer() {
    document.querySelectorAll('[data-pui-drawer-open]').forEach(btn=>{
      const id = btn.getAttribute('data-pui-drawer-open');
      const drawer = document.getElementById(id);
      if(drawer) btn.addEventListener('click', ()=> drawer.style.display = 'block');
    });
    document.querySelectorAll('[data-pui-drawer-close]').forEach(btn=> btn.addEventListener('click', ()=> btn.closest('.pui-drawer').style.display='none'));
  }

  // Toast helper
  function showToast(message, opts) {
    opts = opts || {};
    const area = document.getElementById(opts.area||'global-toasts') || document.body;
    const t = document.createElement('div');
    t.className = 'pui-toast';
    if(opts.class) t.classList.add(opts.class);
    t.textContent = message;
    area.appendChild(t);
    setTimeout(()=> t.style.opacity = 1, 20);
    setTimeout(()=>{ t.style.opacity = 0; setTimeout(()=> t.remove(), 400); }, opts.duration||3000);
    return t;
  }
  window.pui = window.pui || {};
  window.pui.showToast = showToast;

  // Init all helpers (auto)
  function init() {
    // attach theme toggle button if present
    const themeBtn = document.getElementById('toggle-theme');
    if(themeBtn) themeBtn.addEventListener('click', toggleTheme);
    initDropdowns();
    initTabs();
    initAccordions();
    initModals();
    initDrawer();

    // attach any demo toast triggers
    document.querySelectorAll('[data-pui-toast]').forEach(btn=> btn.addEventListener('click', ()=> showToast(btn.getAttribute('data-pui-toast'))));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})(window, document);
