// ============================================================
// SessAI Works — Works Page Script
// Fetch data.js from dashboard, render project cards + modal
// ============================================================

(function () {
  'use strict';

  var projects = [];
  var currentFilter = 'all';

  // ============================================================
  // Data source: js/works-data.js (bundled, pre-anonymized snapshot).
  // Every project already carries a `category` and display-ready, scrubbed
  // text, so no client-side mapping or sanitizing is needed here — and no
  // employer/client identifiers live in this file.
  // ============================================================
  function getCategory(project) {
    return (project && project.category) || 'other';
  }

  // Japanese labels for the category badge. MUST match the filter-button text
  // in works.html (that pairing is a leak/UX checklist item — keep in sync).
  var CATEGORY_LABELS = {
    document: 'ドキュメント生成',
    notification: '通知・連携',
    report: 'レポート・分析',
    knowledge: 'ナレッジ・相談',
    matching: 'マッチング',
    management: '業務管理',
    other: 'その他'
  };

  function getDisplayName(name) {
    return name || '';
  }

  // Data is already sanitized at build time; kept as a passthrough so the
  // render/modal call sites stay unchanged.
  function sanitizeText(text) {
    return text;
  }

  // ============================================================
  // 1. Fetch dashboard data
  // ============================================================
  function fetchData() {
    var grid = document.getElementById('works-grid');
    grid.innerHTML = '<div class="works-loading">読み込み中…</div>';

    var script = document.createElement('script');
    script.src = 'js/works-data.js';
    script.onload = function () {
      if (typeof DASHBOARD_DATA !== 'undefined') {
        projects = DASHBOARD_DATA.projects || [];
        renderGrid();
      }
    };
    script.onerror = function () {
      grid.innerHTML = '<div class="works-loading">データを読み込めませんでした。ページを再読み込みしてください。</div>';
    };
    document.head.appendChild(script);
  }

  // ============================================================
  // 2. Render project grid
  // ============================================================
  function renderGrid() {
    var grid = document.getElementById('works-grid');
    var html = '';

    for (var i = 0; i < projects.length; i++) {
      var p = projects[i];

      // Exclude designed/planned projects
      if (p.status === 'designed' || p.status === 'planned') continue;

      // Filter by category
      var category = getCategory(p);
      if (currentFilter !== 'all' && category !== currentFilter) continue;

      // Tools
      var toolsHtml = '';
      if (p.detail && p.detail.tools) {
        var maxTools = 4;
        for (var t = 0; t < Math.min(p.detail.tools.length, maxTools); t++) {
          toolsHtml += '<span class="work-card-tool">' + p.detail.tools[t] + '</span>';
        }
        if (p.detail.tools.length > maxTools) {
          toolsHtml += '<span class="work-card-tool">+' + (p.detail.tools.length - maxTools) + '</span>';
        }
      }

      // Category badge (Japanese)
      var catLabel = CATEGORY_LABELS[category] || CATEGORY_LABELS.other;

      // Effect line = measured saved time. When a project has no measured time
      // (e.g. tools where the value is qualitative), fall back to a short
      // description so the card never looks empty.
      var effectHtml;
      if (p.detail && p.detail.impact && p.detail.impact.savedTime) {
        effectHtml = '<div class="work-card-effect">⏱ ' + sanitizeText(p.detail.impact.savedTime) + '</div>';
      } else {
        effectHtml = '<div class="work-card-lead">' + sanitizeText(p.description || '') + '</div>';
      }

      html += '<div class="work-card" data-index="' + i + '" onclick="openProjectModal(' + i + ')">' +
        '<div class="work-card-header">' +
          '<span class="work-card-badge work-card-badge-cat">🏷 ' + catLabel + '</span>' +
        '</div>' +
        '<div class="work-card-name">' + getDisplayName(p.name) + '</div>' +
        effectHtml +
        (toolsHtml ? '<div class="work-card-tools">' + toolsHtml + '</div>' : '') +
        '<div class="work-card-footer">' +
          '<span class="work-card-more">詳しく見る</span>' +
          '<span class="work-card-arrow">&rarr;</span>' +
        '</div>' +
      '</div>';
    }

    if (!html) {
      html = '<div class="works-loading">該当するプロジェクトがありません。</div>';
    }

    grid.innerHTML = html;
  }

  // ============================================================
  // 3. Filter
  // ============================================================
  function initFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove('active');
        }
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter');
        renderGrid();
      });
    }
  }

  // ============================================================
  // 4. Modal
  // ============================================================
  window.openProjectModal = function (index) {
    var p = projects[index];
    if (!p) return;
    var d = p.detail || {};

    document.getElementById('modal-title').textContent = getDisplayName(p.name);
    document.getElementById('modal-title-en').textContent = sanitizeText(getDisplayName(p.nameEn || ''));

    var body = '';

    // Lead: the one-line description, shown first so the reader gets the gist
    // before the detailed sections (it was moved off the card).
    if (p.description) {
      body += '<div class="modal-lead">' + sanitizeText(p.description) + '</div>';
    }

    // Overview
    if (d.overview) {
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">概要</div>' +
        '<div class="modal-section-text">' + sanitizeText(d.overview) + '</div>' +
        '</div>';
    }

    // Background
    if (d.background) {
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">導入前の課題</div>' +
        '<div class="modal-section-text">' + sanitizeText(d.background) + '</div>' +
        '</div>';
    }

    // Tools
    if (d.tools && d.tools.length > 0) {
      var toolsHtml = '';
      for (var t = 0; t < d.tools.length; t++) {
        toolsHtml += '<span class="modal-tool-tag">' + d.tools[t] + '</span>';
      }
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">使った道具</div>' +
        '<div class="modal-tools">' + toolsHtml + '</div>' +
        '</div>';
    }

    // Impact (導入前 / 導入後)
    if (d.impact) {
      var impactHtml = '<div class="modal-impact">';
      impactHtml += '<div class="modal-impact-row">' +
        '<span class="modal-impact-label before">導入前</span>' +
        '<span class="modal-impact-text">' + sanitizeText(d.impact.before) + '</span></div>';
      impactHtml += '<div class="modal-impact-row">' +
        '<span class="modal-impact-label after">導入後</span>' +
        '<span class="modal-impact-text">' + sanitizeText(d.impact.after) + '</span></div>';
      if (d.impact.savedTime) {
        impactHtml += '<div class="modal-impact-saved">' + sanitizeText(d.impact.savedTime) + '</div>';
      }
      impactHtml += '</div>';
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">導入効果</div>' +
        impactHtml + '</div>';
    }

    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close on overlay click / Escape
  document.addEventListener('click', function (e) {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ============================================================
  // 5. Navigation (hamburger)
  // ============================================================
  function initNav() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('nav-mobile');

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });
    }
  }

  window.closeMenu = function () {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('nav-mobile');
    if (hamburger) hamburger.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  // ============================================================
  // 6. Init
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    initFilter();
    initNav();
  });
})();
