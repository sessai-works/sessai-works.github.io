// ============================================================
// SessAI Works — Text Reveal Animation Engine
// Mercari-style horizontal wipe + IntersectionObserver
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 1. Wrap text content in span.wipe-inner for wipe-reveal
  // ============================================================
  function initWipeReveal() {
    var elements = document.querySelectorAll('.wipe-reveal');

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // Skip if already wrapped
      if (el.querySelector('.wipe-inner')) continue;

      var inner = document.createElement('span');
      inner.className = 'wipe-inner';

      // Move all children into the inner span
      while (el.firstChild) {
        inner.appendChild(el.firstChild);
      }
      el.appendChild(inner);
    }
  }

  // ============================================================
  // 2. IntersectionObserver — trigger on scroll into view
  // ============================================================
  function initObserver() {
    var targets = document.querySelectorAll('.wipe-reveal, .reveal-up, .stagger-children');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) {
        targets[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    for (var i = 0; i < targets.length; i++) {
      observer.observe(targets[i]);
    }
  }

  // ============================================================
  // 3. Home page: trigger with staggered delays (no scroll)
  // ============================================================
  function initHomeAnimations() {
    var isHome = !!document.querySelector('.home-overlay');
    if (!isHome) return;

    var targets = document.querySelectorAll('.wipe-reveal, .reveal-up');
    var baseDelay = 400;

    for (var i = 0; i < targets.length; i++) {
      (function (el, delay) {
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
      })(targets[i], baseDelay + i * 250);
    }
  }

  // ============================================================
  // 4. Initialize
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initWipeReveal();
    initHomeAnimations();
    initObserver();
  });
})();
