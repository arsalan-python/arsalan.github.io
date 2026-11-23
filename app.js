/* ==========================================================================
   ARSALAN.GITHUB — MAIN APP & ROUTE ORCHESTRATOR
   Preloader, Multi-Page Views, Smooth Transitions, Mobile Navigation
   ========================================================================== */

let physicsInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initRouteHandler();
});

/* 1. Preloader Lifecycle */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.querySelector('.loader-indicator-progress');
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress > 100) progress = 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    }
  }, 60);
}

/* 2. Navigation & Mobile Drawer */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      } else {
        drawer.classList.add('open');
        toggleBtn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>`;
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      });
    });
  }
}

/* 3. Multi-Page View & Hash Router */
function initRouteHandler() {
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-links li');
  const views = document.querySelectorAll('.page-view');

  function updateView(route) {
    const targetRoute = (route && ['home', 'about', 'services', 'contact'].includes(route)) ? route : 'home';

    views.forEach((view) => {
      if (view.id === `view-${targetRoute}`) {
        view.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Trigger page-specific animations
        setTimeout(() => {
          view.querySelectorAll('.fade-in-on-view').forEach((el, i) => {
            el.style.transitionDelay = `${i * 80}ms`;
            el.classList.add('visible');
          });
        }, 80);

      } else {
        view.style.display = 'none';
        // Reset fade classes when leaving
        view.querySelectorAll('.fade-in-on-view').forEach(el => el.classList.remove('visible'));
      }
    });

    // Lazy-init physics canvas when About page is shown
    if (targetRoute === 'about' && !physicsInitialized) {
      physicsInitialized = true;
      setTimeout(() => {
        if (typeof initTechPhysicsPlayground === 'function') {
          initTechPhysicsPlayground();
        }
      }, 120);
    }

    // Update nav active pill
    navItems.forEach((item) => {
      const link = item.querySelector('a');
      const href = link.getAttribute('href').replace('#', '');
      item.classList.toggle('active', href === targetRoute);
    });

    mobileNavItems.forEach((item) => {
      const link = item.querySelector('a');
      const href = link.getAttribute('href').replace('#', '');
      item.classList.toggle('active', href === targetRoute);
    });
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    updateView(hash);
  });

  const initialHash = window.location.hash.replace('#', '') || 'home';
  updateView(initialHash);
}
