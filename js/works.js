// ============================================================
// SessAI Works — Works Page Script
// Fetch data.js from dashboard, render project cards + modal
// ============================================================

(function () {
  'use strict';

  var projects = [];
  var currentFilter = 'all';

  // ============================================================
  // Category mapping: project name → business category
  // ============================================================
  var CATEGORY_MAP = {
    '業務マニュアル自動作成ツール': 'document',
    '議事録自動作成ツール': 'document',
    '決算レポート自動作成': 'document',
    'チャット通知自動化システム': 'notification',
    'Slack通知自動化システム': 'notification',
    '案件マッチングメール自動配信': 'matching',
    'AI人材マッチングシステム': 'matching',
    '商談分析月次レポート自動作成': 'report',
    '商談分析四半期レポート自動作成': 'report',
    '工数分析レポート自動作成': 'report',
    '社内ナレッジAIチャットボット': 'knowledge',
    'AI活用相談ボット': 'knowledge',
    'AIプロジェクトスケジューラー': 'management',
    'AI研修カリキュラム': 'knowledge',
    'GRスタンダード HTML版': 'document',
    'グランサーズスタンダード HTML化': 'document'
  };

  function getCategory(name) {
    return CATEGORY_MAP[name] || 'other';
  }

  // ============================================================
  // Display name override: rename company-specific names
  // ============================================================
  var NAME_OVERRIDE = {
    'GRスタンダード HTML版': '社内マニュアル HTML化ツール',
    'グランサーズスタンダード HTML化': '社内マニュアル HTML化ツール',
    'Grancers Standard HTML Conversion': 'Internal Manual HTML Conversion'
  };

  function getDisplayName(name) {
    return NAME_OVERRIDE[name] || name;
  }

  // ============================================================
  // Text sanitizer: replace company-specific terms
  // ============================================================
  var TEXT_REPLACEMENTS = [
    ['BOF-AI-Dashboard', 'AI活用プロジェクトダッシュボード'],
    ['BOF AIダッシュボード', 'AI活用プロジェクトダッシュボード'],
    ['BOF-AI Dashboard', 'AI活用プロジェクトダッシュボード'],
    ['AIプロジェクト担当者（菅田）', 'AIプロジェクト担当者'],
    ['菅田', '担当者'],
    ['BOF', '社内'],
    ['グランサーズスタンダード', '社内業務マニュアル'],
    ['GRスタンダード', '社内業務マニュアル'],
    ['Grancers Standard', 'Internal Manual'],
    ['Grancers', 'the company'],
    ['グランサーズ', '自社']
  ];

  function sanitizeText(text) {
    if (!text) return text;
    for (var i = 0; i < TEXT_REPLACEMENTS.length; i++) {
      text = text.split(TEXT_REPLACEMENTS[i][0]).join(TEXT_REPLACEMENTS[i][1]);
    }
    return text;
  }

  // ============================================================
  // 1. Fetch dashboard data
  // ============================================================
  function fetchData() {
    var grid = document.getElementById('works-grid');
    grid.innerHTML = '<div class="works-loading">Loading projects...</div>';

    var script = document.createElement('script');
    script.src = 'https://sugatatakuma.github.io/bof-ai-dashboard/js/data.js';
    script.onload = function () {
      if (typeof DASHBOARD_DATA !== 'undefined') {
        projects = DASHBOARD_DATA.projects || [];
        renderGrid();
      }
    };
    script.onerror = function () {
      grid.innerHTML = '<div class="works-loading">Could not load project data.</div>';
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
      var category = getCategory(p.name);
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

      // Saved time
      var savedHtml = '';
      if (p.detail && p.detail.impact && p.detail.impact.savedTime) {
        savedHtml = sanitizeText(p.detail.impact.savedTime);
      }

      html += '<div class="work-card" data-index="' + i + '" onclick="openProjectModal(' + i + ')">' +
        '<div class="work-card-header">' +
          '<div class="work-card-name">' + getDisplayName(p.name) + '</div>' +
        '</div>' +
        '<div class="work-card-desc">' + sanitizeText(p.description) + '</div>' +
        (toolsHtml ? '<div class="work-card-tools">' + toolsHtml + '</div>' : '') +
        '<div class="work-card-footer">' +
          '<span class="work-card-saved">' + savedHtml + '</span>' +
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

    // Overview
    if (d.overview) {
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">Overview</div>' +
        '<div class="modal-section-text">' + sanitizeText(d.overview) + '</div>' +
        '</div>';
    }

    // Background
    if (d.background) {
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">Background</div>' +
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
        '<div class="modal-section-label">Tech Stack</div>' +
        '<div class="modal-tools">' + toolsHtml + '</div>' +
        '</div>';
    }

    // Impact (Before/After)
    if (d.impact) {
      var impactHtml = '<div class="modal-impact">';
      impactHtml += '<div class="modal-impact-row">' +
        '<span class="modal-impact-label before">Before</span>' +
        '<span class="modal-impact-text">' + sanitizeText(d.impact.before) + '</span></div>';
      impactHtml += '<div class="modal-impact-row">' +
        '<span class="modal-impact-label after">After</span>' +
        '<span class="modal-impact-text">' + sanitizeText(d.impact.after) + '</span></div>';
      if (d.impact.savedTime) {
        impactHtml += '<div class="modal-impact-saved">' + sanitizeText(d.impact.savedTime) + '</div>';
      }
      impactHtml += '</div>';
      body += '<div class="modal-section">' +
        '<div class="modal-section-label">Impact</div>' +
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
