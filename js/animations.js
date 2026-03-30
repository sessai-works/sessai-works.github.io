// ============================================================
// SessAI Works — Text Reveal Animation Engine
// Character-by-character + IntersectionObserver triggers
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 1. Split text into individual characters
  // ============================================================
  function initCharReveal() {
    var elements = document.querySelectorAll('.char-reveal');

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var text = el.textContent;
      var html = '';
      var charIndex = 0;

      for (var j = 0; j < text.length; j++) {
        var ch = text[j];
        if (ch === ' ' || ch === '\u3000') {
          html += ch;
        } else if (ch === '\n') {
          html += '<br>';
        } else {
          var delay = charIndex * 0.04;
          html += '<span style="--char-delay:' + delay.toFixed(2) + 's">' + ch + '</span>';
          charIndex++;
        }
      }

      el.innerHTML = html;
    }
  }

  // ============================================================
  // 2. IntersectionObserver — trigger animations on scroll
  // ============================================================
  function initObserver() {
    var targets = document.querySelectorAll('.char-reveal, .reveal, .reveal-up, .stagger-children');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
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
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var i = 0; i < targets.length; i++) {
      observer.observe(targets[i]);
    }
  }

  // ============================================================
  // 3. Home page: trigger animations immediately with delays
  // ============================================================
  function initHomeAnimations() {
    var isHome = document.body.classList.contains('page-home') ||
                 document.querySelector('.home-overlay');
    if (!isHome) return;

    // Home page elements are visible immediately (no scroll)
    var targets = document.querySelectorAll('.char-reveal, .reveal, .reveal-up');
    var baseDelay = 300;

    for (var i = 0; i < targets.length; i++) {
      (function (el, delay) {
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
      })(targets[i], baseDelay + i * 200);
    }
  }

  // ============================================================
  // 4. Initialize
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initCharReveal();
    initHomeAnimations();
    initObserver();
  });
})();
