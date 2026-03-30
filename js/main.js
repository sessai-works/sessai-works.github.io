// ============================================================
// SessAI Works — Main Script
// "Chaos → Order" particle animation + Dashboard data fetch
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 1. Fetch stats from dashboard data.js
  // ============================================================
  function fetchDashboardData() {
    var script = document.createElement('script');
    script.src = 'https://sugatatakuma.github.io/bof-ai-dashboard/js/data.js';
    script.onload = function () {
      if (typeof DASHBOARD_DATA !== 'undefined') {
        var s = DASHBOARD_DATA.summary;
        updateStat('stat-reduction', s.maxReduction, '%');
        updateStat('stat-projects', s.totalProjects, '+');
        updateStat('stat-categories', s.categories, 'areas');
      }
    };
    script.onerror = function () {
      // Fallback: keep default values in HTML
    };
    document.head.appendChild(script);
  }

  function updateStat(id, value, unit) {
    var el = document.getElementById(id);
    if (el) {
      el.innerHTML = value + '<span class="number-unit">' + unit + '</span>';
    }
  }

  // ============================================================
  // 2. Canvas: Chaos → Order particle animation
  //    Scattered nodes (messy work) organize into clean grid (AI)
  // ============================================================
  function initCanvas() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h;
    var mouseX = -1, mouseY = -1;
    var isVisible = true;

    // --- Particle system (reduce on mobile) ---
    var particles = [];
    var isMobile = window.innerWidth < 768;
    var PARTICLE_COUNT = isMobile ? 30 : 60;
    var CONNECT_DIST = isMobile ? 100 : 120;
    var CYCLE_DURATION = 8000;    // ms per full cycle
    var ORGANIZE_RATIO = 0.45;    // 45% of cycle = organized state

    function createParticles() {
      particles = [];
      var margin = isMobile ? 30 : 60;
      var areaW = w - margin * 2;
      var areaH = h - margin * 2;

      // Find cols x rows that exactly equals PARTICLE_COUNT (or closest)
      // Try different col counts and pick the one with best aspect match
      var bestCols = 5, bestRows = 6, bestDiff = Infinity;
      for (var c = 2; c <= PARTICLE_COUNT; c++) {
        if (PARTICLE_COUNT % c !== 0) continue;
        var r = PARTICLE_COUNT / c;
        var gridAspect = (c / r);
        var screenAspect = (areaW / areaH);
        var diff = Math.abs(gridAspect - screenAspect);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestCols = c;
          bestRows = r;
        }
      }

      var cols = bestCols;
      var rows = bestRows;
      var cellW = cols > 1 ? areaW / (cols - 1) : 0;
      var cellH = rows > 1 ? areaH / (rows - 1) : 0;

      for (var i = 0; i < PARTICLE_COUNT; i++) {
        var gridCol = i % cols;
        var gridRow = Math.floor(i / cols);

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
          gridX: margin + gridCol * cellW,
          gridY: margin + gridRow * cellH,
          gridCol: gridCol,
          gridRow: gridRow,
          radius: 2.5 + Math.random() * 2,
          baseRadius: isMobile ? 3 : 3.5,
          hue: 220 + Math.random() * 30,
          phase: Math.random() * Math.PI * 2
        });
      }
      particles._cols = cols;
      particles._rows = rows;
    }

    // Easing: smooth step for transitions
    function smoothstep(t) {
      return t * t * (3 - 2 * t);
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      isMobile = w < 768;
      PARTICLE_COUNT = isMobile ? 30 : 60;
      CONNECT_DIST = isMobile ? 100 : 120;
      createParticles();
    }

    function draw(time) {
      if (!isVisible) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#fafbfd';
      ctx.fillRect(0, 0, w, h);

      // --- Calculate organization factor (0 = chaos, 1 = organized) ---
      var cyclePos = (time % CYCLE_DURATION) / CYCLE_DURATION;
      var orgFactor;

      // Cycle phases: scatter → transition → organized → transition → scatter
      //               0-0.2     0.2-0.35     0.35-0.65    0.65-0.8    0.8-1.0
      if (cyclePos < 0.2) {
        orgFactor = 0;
      } else if (cyclePos < 0.35) {
        orgFactor = smoothstep((cyclePos - 0.2) / 0.15);
      } else if (cyclePos < 0.65) {
        orgFactor = 1;
      } else if (cyclePos < 0.8) {
        orgFactor = 1 - smoothstep((cyclePos - 0.65) / 0.15);
      } else {
        orgFactor = 0;
      }

      // --- Mouse influence: organize nearby particles ---
      var mouseOrgRadius = 150;

      // --- Update & draw particles ---
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Chaotic movement
        p.x += p.vx + Math.sin(time * 0.001 + p.phase) * p.driftX;
        p.y += p.vy + Math.cos(time * 0.001 + p.phase) * p.driftY;

        // Bounce off edges (chaotic state)
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Mouse proximity boost
        var localOrg = orgFactor;
        if (mouseX >= 0 && mouseY >= 0) {
          var mdx = p.gridX - mouseX;
          var mdy = p.gridY - mouseY;
          var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouseOrgRadius) {
            var mouseBoost = (1 - mDist / mouseOrgRadius) * 0.6;
            localOrg = Math.min(1, localOrg + mouseBoost);
          }
        }

        // Interpolate between chaotic position and grid position
        var displayX = p.x + (p.gridX - p.x) * localOrg;
        var displayY = p.y + (p.gridY - p.y) * localOrg;

        // Draw particle — unified appearance when organized
        var chaoticAlpha = 0.2;
        var organizedAlpha = 0.7;
        var alpha = chaoticAlpha + localOrg * (organizedAlpha - chaoticAlpha);

        // Size: random when chaotic, uniform when organized
        var chaoticSize = p.radius;
        var organizedSize = p.baseRadius;
        var size = chaoticSize + (organizedSize - chaoticSize) * localOrg;

        // Color: varied hue when chaotic, unified blue when organized
        var hue = p.hue + (225 - p.hue) * localOrg;
        var sat = 70 + localOrg * 15;
        var light = 65 - localOrg * 10;

        ctx.beginPath();
        ctx.arc(displayX, displayY, size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, ' + alpha + ')';
        ctx.fill();

        // Organized glow — stronger and crisper
        if (localOrg > 0.4) {
          var glowAlpha = (localOrg - 0.4) * 0.25;
          ctx.beginPath();
          ctx.arc(displayX, displayY, size + 4, 0, Math.PI * 2);
          ctx.fillStyle = 'hsla(225, 85%, 70%, ' + glowAlpha + ')';
          ctx.fill();
        }

        // Store display position for connections
        p.displayX = displayX;
        p.displayY = displayY;
        p.localOrg = localOrg;
      }

      // --- Draw connections ---
      var gridCols = particles._cols || 1;
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i];
          var b = particles[j];
          var dx = a.displayX - b.displayX;
          var dy = a.displayY - b.displayY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var avgOrg = (a.localOrg + b.localOrg) / 2;

          // Check if grid neighbors (adjacent horizontally or vertically)
          var isGridNeighbor = (
            (Math.abs(a.gridCol - b.gridCol) <= 1 && a.gridRow === b.gridRow) ||
            (Math.abs(a.gridRow - b.gridRow) <= 1 && a.gridCol === b.gridCol)
          );

          var maxDist = CONNECT_DIST + (avgOrg) * 50;

          if (dist < maxDist) {
            var lineAlpha = (1 - dist / maxDist);

            if (avgOrg > 0.3) {
              // Organized: grid neighbors get strong lines, others fade
              var neighborBoost = isGridNeighbor ? 1 : 0.5;
              var lineStrength = isMobile ? 0.1 : 1.5;
              ctx.strokeStyle = 'hsla(225, 80%, 65%, ' + (lineAlpha * avgOrg * lineStrength * neighborBoost) + ')';
              ctx.lineWidth = isGridNeighbor ? (isMobile ? 0.4 : 1.5) + avgOrg * (isMobile ? 0.2 : 1.2) : (isMobile ? 0.2 : 0.8);
            } else {
              ctx.strokeStyle = 'rgba(130, 140, 170, ' + (lineAlpha * (isMobile ? 0.01 : 0.25)) + ')';
              ctx.lineWidth = isMobile ? 0.2 : 0.8;
            }

            ctx.beginPath();
            ctx.moveTo(a.displayX, a.displayY);
            ctx.lineTo(b.displayX, b.displayY);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    // Event listeners
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', function () {
      mouseX = -1;
      mouseY = -1;
    });

    document.addEventListener('mouseleave', function () {
      mouseX = -1;
      mouseY = -1;
    });

    document.addEventListener('visibilitychange', function () {
      isVisible = !document.hidden;
    });

    resize();
    requestAnimationFrame(draw);
  }

  // ============================================================
  // 3. Initialize
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      initCanvas();
    }
    fetchDashboardData();
  });
})();
