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

    // --- Particle system ---
    var particles = [];
    var PARTICLE_COUNT = 60;
    var CONNECT_DIST = 120;
    var CYCLE_DURATION = 8000;    // ms per full cycle
    var ORGANIZE_RATIO = 0.45;    // 45% of cycle = organized state

    function createParticles() {
      particles = [];
      var cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (w / h)));
      var rows = Math.ceil(PARTICLE_COUNT / cols);
      var cellW = w / (cols + 1);
      var cellH = h / (rows + 1);

      for (var i = 0; i < PARTICLE_COUNT; i++) {
        var gridCol = (i % cols) + 1;
        var gridRow = Math.floor(i / cols) + 1;

        particles.push({
          // Current position (starts scattered)
          x: Math.random() * w,
          y: Math.random() * h,
          // Chaotic movement
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
          // Grid target (organized position)
          gridX: gridCol * cellW,
          gridY: gridRow * cellH,
          // Appearance
          radius: 2.5 + Math.random() * 2,
          hue: 220 + Math.random() * 30,
          phase: Math.random() * Math.PI * 2
        });
      }
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

        // Draw particle
        var alpha = 0.25 + localOrg * 0.35;
        var size = p.radius * (1 + localOrg * 0.3);
        ctx.beginPath();
        ctx.arc(displayX, displayY, size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ', 70%, 65%, ' + alpha + ')';
        ctx.fill();

        // Organized glow
        if (localOrg > 0.5) {
          ctx.beginPath();
          ctx.arc(displayX, displayY, size + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 70%, ' + ((localOrg - 0.5) * 0.15) + ')';
          ctx.fill();
        }

        // Store display position for connections
        p.displayX = displayX;
        p.displayY = displayY;
        p.localOrg = localOrg;
      }

      // --- Draw connections ---
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i];
          var b = particles[j];
          var dx = a.displayX - b.displayX;
          var dy = a.displayY - b.displayY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var maxDist = CONNECT_DIST + (a.localOrg + b.localOrg) * 40;

          if (dist < maxDist) {
            var lineAlpha = (1 - dist / maxDist);
            var avgOrg = (a.localOrg + b.localOrg) / 2;

            // Organized: blue lines. Chaotic: faint gray lines
            if (avgOrg > 0.3) {
              ctx.strokeStyle = 'hsla(225, 70%, 65%, ' + (lineAlpha * avgOrg * 0.3) + ')';
              ctx.lineWidth = 1 + avgOrg * 0.5;
            } else {
              ctx.strokeStyle = 'rgba(160, 170, 190, ' + (lineAlpha * 0.06) + ')';
              ctx.lineWidth = 0.5;
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
    initCanvas();
    fetchDashboardData();
  });
})();
