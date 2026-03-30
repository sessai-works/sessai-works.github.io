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
      if (el.querySelector('.wipe-inner')) continue;

      var inner = document.createElement('span');
      inner.className = 'wipe-inner';

      while (el.firstChild) {
        inner.appendChild(el.firstChild);
      }
      el.appendChild(inner);
    }
  }

  // ============================================================
  // 2. Trigger elements near top of page immediately
  // ============================================================
  function triggerAboveFold() {
    var targets = document.querySelectorAll('.wipe-reveal, .reveal-up, .stagger-children');
    var foldLine = window.innerHeight * 1.2;

    for (var i = 0; i < targets.length; i++) {
      var rect = targets[i].getBoundingClientRect();
      // Element's parent or ancestor position (use offsetTop for accuracy)
      var top = getOffsetTop(targets[i]);
      if (top < foldLine) {
        (function(el, delay) {
          setTimeout(function() {
            el.classList.add('visible');
          }, delay);
        })(targets[i], 300 + i * 150);
      }
    }
  }

  function getOffsetTop(el) {
    var top = 0;
    while (el) {
      top += el.offsetTop || 0;
      el = el.offsetParent;
    }
    return top;
  }

  // ============================================================
  // 3. IntersectionObserver — trigger on scroll into view
  //    Uses a wrapper parent to detect, since wipe-reveal itself
  //    may be off-screen due to translateX(-100%)
  // ============================================================
  function initObserver() {
    var targets = document.querySelectorAll('.wipe-reveal, .reveal-up, .stagger-children');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) {
        targets[i].classList.add('visible');
      }
      return;
    }

    // For wipe-reveal, observe the parent instead (since the element is translateX'd off)
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          var target = entries[i].target;
          // If this is a sentinel wrapper, trigger the actual element
          if (target.dataset.animTarget) {
            var actual = document.querySelector('[data-anim-id="' + target.dataset.animTarget + '"]');
            if (actual) actual.classList.add('visible');
          } else {
            target.classList.add('visible');
          }
          observer.unobserve(target);
        }
      }
    }, {
      threshold: 0,
      rootMargin: '0px 0px -20px 0px'
    });

    var sentinelId = 0;
    for (var i = 0; i < targets.length; i++) {
      // Skip already visible
      if (targets[i].classList.contains('visible')) continue;

      if (targets[i].classList.contains('wipe-reveal')) {
        // Create a sentinel div next to the wipe-reveal element
        var sentinel = document.createElement('div');
        sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
        sentinel.dataset.animTarget = 'anim-' + sentinelId;
        targets[i].dataset.animId = 'anim-' + sentinelId;
        targets[i].style.position = targets[i].style.position || 'relative';

        // Insert sentinel as sibling before the element
        targets[i].parentNode.insertBefore(sentinel, targets[i]);
        observer.observe(sentinel);
        sentinelId++;
      } else {
        observer.observe(targets[i]);
      }
    }
  }

  // ============================================================
  // 4. Home page: trigger with staggered delays (no scroll)
  // ============================================================
  function initHomeAnimations() {
    var isHome = !!document.querySelector('.home-overlay');
    if (!isHome) return;

    // Only trigger elements inside home-overlay
    var overlay = document.querySelector('.home-overlay');
    var targets = overlay.querySelectorAll('.wipe-reveal, .reveal-up');
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
  // 5. Initialize
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initWipeReveal();
    initHomeAnimations();
    triggerAboveFold();
    initObserver();
  });
})();
