/* ------------------------------------------------------------------
   Brandon S.C. Chan — Academic Website Engine
   Apple Liquid-Glass Editorial UI + DeepMind Spatial & Model Lab
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const THEME_KEY = 'bc_theme_v5';

  // Exact Proposition 4 S-curve schedule + Table S.C.3 40-run simulated checkpoints
  const MODEL_DATA = {
    lambda0: 0.0159,
    lambda1: 1.15,
    inflectionX: 6.3,
    stockData1881: 27.70,
    reStock1881: 19.25,
    deStock1881: 22.90,
    data: {
      forecastErr: 0.266,
      boomGrowth: 7.47,
      peakShare: 5.55
    },
    regimes: [
      { theta: 0.00, label: '0.00 RE', short: 'θ = 0 (RE)', stock1881: 19.25, q: 47.26, forecastErr: -0.149, boomGrowth: 5.87, peakShare: 3.34 },
      { theta: 0.81, label: '0.81',    short: 'θ = 0.81',   stock1881: null,  q: 36.93, forecastErr:  0.120, boomGrowth: 6.37, peakShare: 4.18 },
      { theta: 1.06, label: '1.06 DE', short: 'θ̂ = 1.06',   stock1881: 22.90, q: 35.97, forecastErr:  0.209, boomGrowth: 6.60, peakShare: 4.53 },
      { theta: 1.31, label: '1.31',    short: 'θ = 1.31',   stock1881: null,  q: 37.04, forecastErr:  0.304, boomGrowth: 6.87, peakShare: 4.95 }
    ],
    keyMetrics: [
      { value: 'θ̂ = 1.06', label: 'Diagnostic overreaction (SE\u00A00.42)', accent: true },
      { value: '−15.1%',    label: '1881 transport network if\u00A0θ\u00A0=\u00A00',  accent: false },
      { value: '11.0%',     label: 'Railway-era GDP/capita share', accent: false },
      { value: '7.9%',      label: 'Railway-era real-wage share',       accent: false }
    ]
  };

  function sCurveAdopt(x) {
    return 1 - Math.exp(-MODEL_DATA.lambda0 * Math.pow(Math.max(0.01, x), MODEL_DATA.lambda1));
  }

  const SOCIAL_ICONS = {
    email:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>',
    scholar:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>',
    x:        '<svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    github:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    cv:       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
  };

  const AWARD_ICON = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

  const SCURVE_PLATE_SVG = `
    <svg class="ms-figure" viewBox="0 0 96 34" aria-hidden="true">
      <line x1="6" y1="28" x2="90" y2="28" stroke="currentColor" stroke-opacity="0.22" stroke-width="0.8"/>
      <line x1="6" y1="6" x2="6" y2="28" stroke="currentColor" stroke-opacity="0.22" stroke-width="0.8"/>
      <path d="M 8 26.5 C 32 26.2, 42 20.5, 52 14.5 C 62 8.5, 74 7.0, 89 6.6" fill="none" stroke="var(--accent)" stroke-opacity="0.45" stroke-width="1.2" stroke-dasharray="2.4 2"/>
      <path d="M 8 26.5 C 24 25.6, 36 16.5, 48 10.5 C 60 5.6, 74 5.2, 89 5.0" fill="none" stroke="var(--accent)" stroke-width="1.6"/>
      <circle cx="48" cy="10.5" r="2.1" fill="var(--gold)"/>
      <circle cx="52" cy="14.5" r="1.7" fill="var(--accent)"/>
    </svg>`;

  let explorerDrawCallback = null;

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const icon = btn.querySelector('.theme-icon');
      if (icon) {
        if (theme === 'dark') {
          icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        } else {
          icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }
      }
    }
    if (explorerDrawCallback) explorerDrawCallback();
  }

  function initThemeToggle() {
    applyTheme(getSavedTheme());
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.onclick = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    };
  }

  function initScrollChrome() {
    const bar = document.getElementById('progress-bar');
    const nav = document.getElementById('topnav');
    const anchorAbout = document.querySelector('a.nav-anchor[href="#about-section"]');
    const anchorResearch = document.querySelector('a.nav-anchor[href="#working-papers-section"]');
    const wpSec = document.getElementById('working-papers-section');

    function updateChrome() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
        bar.style.width = pct + '%';
      }
      if (nav) {
        nav.classList.toggle('scrolled', scrollTop > 22);
      }
      if (anchorAbout && anchorResearch && wpSec) {
        const wpRect = wpSec.getBoundingClientRect();
        const onPapers = wpRect.top < window.innerHeight * 0.48;
        anchorResearch.classList.toggle('active', onPapers || scrollTop < 120);
        anchorAbout.classList.toggle('active', !onPapers && scrollTop >= 120);
      }
    }

    window.addEventListener('scroll', updateChrome, { passive: true });
    updateChrome();
  }

  function bindTailArrow(htmlText) {
    const idx = htmlText.lastIndexOf(' ');
    if (idx === -1) {
      return `<span class="ext-tail">${htmlText}<span class="ext-arrow" aria-hidden="true">&#8599;</span></span>`;
    }
    const head = htmlText.slice(0, idx + 1);
    const tail = htmlText.slice(idx + 1);
    return `${head}<span class="ext-tail">${tail}<span class="ext-arrow" aria-hidden="true">&#8599;</span></span>`;
  }

  // ─── Initialize Interactive Proposition 4 & Table S.C.3 Explorer ──────────
  function initModelExplorer(rootRow) {
    const canvas = rootRow.querySelector('.explorer-canvas');
    const readout = rootRow.querySelector('.explorer-readout');
    const btns = Array.from(rootRow.querySelectorAll('.theta-btn'));
    const fForecast = rootRow.querySelector('[data-metric="forecast"]');
    const fGrowth = rootRow.querySelector('[data-metric="growth"]');
    const fShare = rootRow.querySelector('[data-metric="share"]');
    const fObj = rootRow.querySelector('[data-metric="obj"]');
    if (!canvas || btns.length === 0) return;

    let activeIdx = 2; // Default: estimated DE theta = 1.06
    let hoverX = null;

    function drawChart() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cs = getComputedStyle(document.documentElement);
      const accent = cs.getPropertyValue('--accent').trim() || '#0052cc';
      const gold = cs.getPropertyValue('--gold').trim() || '#a96d10';
      const muted = cs.getPropertyValue('--text-subtle').trim() || '#6e7d92';
      const primary = cs.getPropertyValue('--text-primary').trim() || '#0b101b';
      const dim = cs.getPropertyValue('--mesh-data-dim').trim() || 'rgba(82, 96, 116, 0.42)';

      const pad = { l: 30, r: 14, t: 16, b: 24 };
      const cw = w - pad.l - pad.r;
      const ch = h - pad.t - pad.b;
      const maxX = 28;
      const maxY = 0.60;

      const xPx = x => pad.l + (x / maxX) * cw;
      const yPx = y => pad.t + ch - (y / maxY) * ch;

      ctx.clearRect(0, 0, w, h);

      // Subtle horizontal hairlines
      ctx.strokeStyle = dim;
      ctx.lineWidth = 0.6;
      [0.2, 0.4, 0.6].forEach(yv => {
        const y = yPx(yv);
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(w - pad.r, y);
        ctx.stroke();

        ctx.fillStyle = muted;
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(yv * 100) + '%', pad.l - 5, y + 3);
      });

      // Axes
      ctx.strokeStyle = dim;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t);
      ctx.lineTo(pad.l, h - pad.b);
      ctx.lineTo(w - pad.r, h - pad.b);
      ctx.stroke();

      // Inflection vertical hairline (x* = 6.3)
      const ix = xPx(MODEL_DATA.inflectionX);
      ctx.save();
      ctx.setLineDash([2.5, 2.5]);
      ctx.strokeStyle = dim;
      ctx.beginPath();
      ctx.moveTo(ix, pad.t);
      ctx.lineTo(ix, h - pad.b);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = muted;
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('x* = 6.3', ix + 4, pad.t + 9);

      const reg = MODEL_DATA.regimes[activeIdx];
      const reStock = MODEL_DATA.reStock1881;
      const deStock = MODEL_DATA.deStock1881;
      const bandEnd = reg.theta === 0 ? reStock : deStock;

      // Shaded counterfactual gain band between 1881 RE stock (19.25x) and DE baseline (22.90x)
      if (bandEnd > reStock) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPx(reStock), h - pad.b);
        for (let x = reStock; x <= bandEnd; x += 0.2) {
          ctx.lineTo(xPx(x), yPx(sCurveAdopt(x)));
        }
        ctx.lineTo(xPx(bandEnd), yPx(sCurveAdopt(bandEnd)));
        ctx.lineTo(xPx(bandEnd), h - pad.b);
        ctx.closePath();
        ctx.fillStyle = accent;
        ctx.globalAlpha = reg.theta === 1.06 ? 0.14 : 0.08;
        ctx.fill();
        ctx.restore();
      }

      // Proposition 4 S-curve line
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.1;
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const x = 1 + (i / 140) * (maxX - 1);
        const y = sCurveAdopt(x);
        if (i === 0) ctx.moveTo(xPx(x), yPx(y));
        else ctx.lineTo(xPx(x), yPx(y));
      }
      ctx.stroke();

      // RE reference dot (theta = 0, 1881 stock = 19.25x)
      const rx = xPx(reStock);
      const ry = yPx(sCurveAdopt(reStock));
      if (reg.theta === 0) {
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(rx, ry, 6.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = primary;
      ctx.globalAlpha = reg.theta === 0 ? 1 : 0.65;
      ctx.beginPath();
      ctx.arc(rx, ry, reg.theta === 0 ? 3.5 : 3.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // DE reference dot (theta = 1.06, 1881 stock = 22.90x)
      const dx = xPx(deStock);
      const dy = yPx(sCurveAdopt(deStock));
      if (reg.theta === 1.06) {
        ctx.strokeStyle = gold;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(dx, dy, 6.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = gold;
      ctx.globalAlpha = reg.theta === 1.06 ? 1 : 0.65;
      ctx.beginPath();
      ctx.arc(dx, dy, reg.theta === 1.06 ? 3.5 : 2.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Inline dot tags
      ctx.font = '500 8.5px "JetBrains Mono", monospace';
      ctx.fillStyle = muted;
      ctx.textAlign = 'center';
      ctx.fillText('RE', rx, ry + 14);
      ctx.fillStyle = gold;
      ctx.fillText('DE', dx, dy - 9);

      // Hover hairline probe
      if (hoverX !== null && hoverX >= 1 && hoverX <= maxX) {
        const hx = xPx(hoverX);
        const hy = yPx(sCurveAdopt(hoverX));
        ctx.save();
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = muted;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(hx, pad.t);
        ctx.lineTo(hx, h - pad.b);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(hx, hy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // X axis labels
      ctx.fillStyle = muted;
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      [5, 10, 15, 20, 25].forEach(xv => {
        ctx.fillText(xv + '×', xPx(xv), h - 8);
      });

      if (readout) {
        if (hoverX !== null) {
          const rate = (sCurveAdopt(hoverX) * 100).toFixed(1);
          readout.textContent = `Probe · Infrastructure x = ${hoverX.toFixed(1)}× · Adoption λ̃(x) = ${rate}%/yr`;
        } else if (reg.stock1881 !== null) {
          const rate = (sCurveAdopt(reg.stock1881) * 100).toFixed(1);
          readout.textContent = `${reg.short} · 1881 Stock x = ${reg.stock1881.toFixed(2)}× · Adoption λ̃(x) = ${rate}%/yr`;
        } else {
          readout.textContent = `${reg.short} (Table S.C.3) · Boom ${reg.boomGrowth.toFixed(2)}%/yr · SMM Q = ${reg.q.toFixed(2)}`;
        }
      }
    }

    function updateTelemetry(idx) {
      activeIdx = idx;
      btns.forEach((b, i) => b.classList.toggle('active', i === idx));
      const reg = MODEL_DATA.regimes[idx];

      if (fForecast) {
        const sign = reg.forecastErr >= 0 ? '+' : '−';
        fForecast.querySelector('.telem-val').textContent = `${sign}${Math.abs(reg.forecastErr).toFixed(3)}`;
        // Map [-0.20, 0.35] onto [0, 100]%
        const pct = Math.max(4, Math.min(100, ((reg.forecastErr + 0.20) / 0.55) * 100));
        fForecast.querySelector('.telem-fill').style.width = `${pct.toFixed(1)}%`;
      }
      if (fGrowth) {
        fGrowth.querySelector('.telem-val').textContent = `${reg.boomGrowth.toFixed(2)}%/yr`;
        const pct = Math.max(5, Math.min(100, (reg.boomGrowth / 8.0) * 100));
        fGrowth.querySelector('.telem-fill').style.width = `${pct.toFixed(1)}%`;
      }
      if (fShare) {
        fShare.querySelector('.telem-val').textContent = `${reg.peakShare.toFixed(2)}%`;
        const pct = Math.max(5, Math.min(100, (reg.peakShare / 6.0) * 100));
        fShare.querySelector('.telem-fill').style.width = `${pct.toFixed(1)}%`;
      }
      if (fObj) {
        fObj.querySelector('.telem-val').textContent = `${reg.q.toFixed(2)}`;
        // Fit proximity: 100% best at Q=35.97, lower when worse
        const pct = Math.max(15, Math.min(100, (35.97 / reg.q) * 100));
        fObj.querySelector('.telem-fill').style.width = `${pct.toFixed(1)}%`;
      }
      drawChart();
    }

    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => updateTelemetry(i));
    });

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const padL = 30, padR = 14;
      const cw = rect.width - padL - padR;
      const raw = ((e.clientX - rect.left - padL) / cw) * 28;
      hoverX = Math.max(1, Math.min(28, raw));
      drawChart();
    });
    canvas.addEventListener('mouseleave', () => {
      hoverX = null;
      drawChart();
    });

    window.addEventListener('resize', drawChart);
    explorerDrawCallback = drawChart;
    updateTelemetry(activeIdx);
  }

  // ─── Render Flagship Working Paper Row + Workspace ──────────────────────
  function renderPaperList(papers, listEl, sectionEl) {
    if (!listEl || !sectionEl) return;
    if (!papers || papers.length === 0) {
      sectionEl.style.display = 'none';
      return;
    }
    sectionEl.style.display = 'block';
    listEl.innerHTML = '';

    papers.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'paper';
      if (p.fields && Array.isArray(p.fields)) {
        row.dataset.fields = p.fields.join('|');
      }

      const tagText = p.tag || 'Working Paper';
      const yearText = p.year || ((p.venue || '').match(/20\d{2}/) || [String(2026 - idx)])[0];
      const hasUrl = p.url && p.url !== '#';
      const pagesLabel = (p.pages || 'PDF').toUpperCase();

      const offprintHtml = `
        <div class="thumb-stage">
          <div class="thumb-manuscript" title="${hasUrl ? 'Click to toggle workspace or open PDF' : 'Click to toggle abstract'}">
            <div>
              <div class="ms-header"><span>${tagText}</span><span class="ms-year">${yearText}</span></div>
              <div class="ms-title">${p.title}</div>
              <div class="ms-author">${p.authors || 'Brandon S.C. Chan'}</div>
              ${SCURVE_PLATE_SVG}
            </div>
            <div class="ms-lines">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="ms-footer">
              <span>YALE ECON</span>
              <span>${pagesLabel}</span>
            </div>
          </div>
        </div>
      `;

      const titleInner = hasUrl
        ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`
        : p.title;
      const titleHtml = `<div class="title">${titleInner}</div>`;

      const authorsPart = p.authors ? `<span class="authors">${p.authors}</span>` : '';
      const venuePart = p.venue ? `<span class="venue">${p.venue}</span>` : '';
      const metaHtml = (authorsPart || venuePart)
        ? `<div class="paper-meta-line">${authorsPart}${venuePart}</div>`
        : '';

      const fields = p.fields || [];
      const badgesHtml = fields.length > 0
        ? `<div class="badges">${fields.map(f => `<span class="badge">${f}</span>`).join('')}</div>`
        : '';

      let awards = [];
      if (p.awards_list && p.awards_list.length > 0) {
        awards = p.awards_list;
      }
      const awardsHtml = awards.length > 0
        ? `<div class="awards">${awards.map(a => {
            const titleNode = a.url
              ? `<a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>`
              : a.title;
            return `
            <div class="award">
              <span class="award-icon">${AWARD_ICON}</span>
              <span><span class="award-title">${titleNode}</span>${a.desc ? ` <span class="award-desc">&mdash; ${a.desc}</span>` : ''}</span>
            </div>`;
          }).join('')}</div>`
        : '';

      const metricsStripHtml = idx === 0
        ? `<div class="paper-metrics-strip">${MODEL_DATA.keyMetrics.map(m => `
            <div class="metric-cell">
              <div class="metric-val${m.accent ? ' is-accent' : ''}">${m.value}</div>
              <div class="metric-label">${m.label}</div>
            </div>`).join('')}
          </div>`
        : '';

      let actionsItems = '';
      if (p.links && p.links.length > 0) {
        actionsItems += p.links
          .filter(l => l.url && l.url !== '#')
          .map(l => {
            const cls = l.primary ? 'action-chip action-primary' : 'action-chip';
            const meta = l.meta ? `<span class="action-meta">${l.meta}</span>` : '';
            return `<a class="${cls}" href="${l.url}" target="_blank" rel="noopener">${l.label}${meta}<span class="ext-arrow" aria-hidden="true">&#8599;</span></a>`;
          })
          .join('');
      }

      const segControlHtml = `
        <div class="seg-control" role="tablist" aria-label="Paper workspace views">
          ${idx === 0 ? '<button type="button" class="seg-btn active" role="tab" aria-selected="true" data-pane="explorer">Model Explorer</button>' : ''}
          ${p.abstract ? `<button type="button" class="seg-btn${idx !== 0 ? ' active' : ''}" role="tab" aria-selected="${idx !== 0 ? 'true' : 'false'}" data-pane="abstract">Abstract</button>` : ''}
          ${p.bibtex ? '<button type="button" class="seg-btn" role="tab" aria-selected="false" data-pane="bibtex">BibTeX</button>' : ''}
        </div>
      `;

      const controlsHtml = `<div class="paper-controls"><div class="paper-actions">${actionsItems}</div>${segControlHtml}</div>`;

      const explorerPaneHtml = idx === 0
        ? `<div class="workspace-pane active" data-pane-id="explorer">
             <div class="explorer-panel">
               <div class="explorer-top">
                 <div class="explorer-heading">Interactive Mechanism<span class="explorer-sub">Proposition 4 &amp; Table S.C.3 (40 CRN runs)</span></div>
                 <div class="theta-stepper" role="group" aria-label="Diagnosticity regime">
                   ${MODEL_DATA.regimes.map((r, ri) => `<button type="button" class="theta-btn${ri === 2 ? ' active' : ''}" data-theta-idx="${ri}">${r.label}</button>`).join('')}
                 </div>
               </div>
               <div class="explorer-grid">
                 <div class="explorer-chart-wrap">
                   <canvas class="explorer-canvas"></canvas>
                   <div class="explorer-readout"></div>
                 </div>
                 <div class="explorer-telemetry">
                   <div class="telem-row" data-metric="forecast">
                     <div class="telem-head"><span class="telem-name">Opening Forecast Error (log)</span><span class="telem-nums"><span class="telem-val">+0.209</span><span class="telem-data">/ 0.266 data</span></span></div>
                     <div class="telem-track"><div class="telem-fill is-gold" style="width:74%"></div><div class="telem-marker" style="left:84.7%" title="Archival target (+0.266)"></div></div>
                   </div>
                   <div class="telem-row" data-metric="growth">
                     <div class="telem-head"><span class="telem-name">1830–1850 Network Growth</span><span class="telem-nums"><span class="telem-val">6.60%/yr</span><span class="telem-data">/ 7.47% data</span></span></div>
                     <div class="telem-track"><div class="telem-fill" style="width:82%"></div><div class="telem-marker" style="left:93.4%" title="Data (7.47%/yr)"></div></div>
                   </div>
                   <div class="telem-row" data-metric="share">
                     <div class="telem-head"><span class="telem-name">Peak 5-Yr Rail Share of GDP</span><span class="telem-nums"><span class="telem-val">4.53%</span><span class="telem-data">/ 5.55% data</span></span></div>
                     <div class="telem-track"><div class="telem-fill" style="width:75%"></div><div class="telem-marker" style="left:92.5%" title="Data (5.55%)"></div></div>
                   </div>
                   <div class="telem-row" data-metric="obj">
                     <div class="telem-head"><span class="telem-name">SMM Criterion Q (lower better)</span><span class="telem-nums"><span class="telem-val">35.97</span><span class="telem-data">/ 47.26 RE</span></span></div>
                     <div class="telem-track"><div class="telem-fill is-gold" style="width:100%"></div></div>
                   </div>
                 </div>
               </div>
               <div class="explorer-caption">Left: Proposition 4 closed-form adoption λ̃(x) = 1 − exp(−0.0159·x<sup>1.15</sup>), contrasting 1881 counterfactual RE (x = 19.25×) with DE baseline (x = 22.90×; −15.1% shortfall at θ = 0). Hover curve to probe.</div>
             </div>
           </div>`
        : '';

      const jelLine = p.jel ? `<div class="abstract-jel">JEL Classification: ${p.jel}</div>` : '';
      const abstractPaneHtml = p.abstract
        ? `<div class="workspace-pane${idx !== 0 ? ' active' : ''}" data-pane-id="abstract">
             <div class="abstract-panel"><p class="abstract">${p.abstract}</p>${jelLine}</div>
           </div>`
        : '';

      const bibtexPaneHtml = p.bibtex
        ? `<div class="workspace-pane" data-pane-id="bibtex">
             <div class="bibtex-box"><button type="button" class="copy-bibtex-btn">Copy</button><pre>${p.bibtex}</pre></div>
           </div>`
        : '';

      const workspaceHtml = `
        <div class="workspace-drawer open">
          <div class="workspace-inner">
            ${explorerPaneHtml}
            ${abstractPaneHtml}
            ${bibtexPaneHtml}
          </div>
        </div>
      `;

      const presHtml = p.presentations
        ? `<div class="presentations"><b>Presentations:</b> ${p.presentations.replace(/^Presentations:\s*/i, '')}</div>`
        : '';

      const mediaHtml = (p.media && Array.isArray(p.media) && p.media.length > 0)
        ? `<div class="media-coverage"><b>Media Coverage:</b> ${p.media.map(m => {
            const outlet = m.outlet ? `<i>${m.outlet}</i>: ` : '';
            const inner = bindTailArrow(`${outlet}&ldquo;${m.title}&rdquo;`);
            return `<a href="${m.url}" target="_blank" rel="noopener">${inner}</a>`;
          }).join(' <span class="media-sep">&middot;</span> ')}</div>`
        : '';

      row.innerHTML = `
        ${offprintHtml}
        <div class="paper-head">
          ${titleHtml}
          ${metaHtml}
          ${badgesHtml}
        </div>
        <div class="paper-details">
          ${awardsHtml}
          ${metricsStripHtml}
          ${controlsHtml}
          ${workspaceHtml}
          ${presHtml}
          ${mediaHtml}
        </div>
      `;

      const drawer = row.querySelector('.workspace-drawer');
      const segBtns = Array.from(row.querySelectorAll('.seg-btn'));
      const panes = Array.from(row.querySelectorAll('.workspace-pane'));

      segBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.pane;
          const wasActive = btn.classList.contains('active') && drawer.classList.contains('open');
          if (wasActive) {
            drawer.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            return;
          }
          drawer.classList.add('open');
          segBtns.forEach(b => {
            const isTarget = b === btn;
            b.classList.toggle('active', isTarget);
            b.setAttribute('aria-selected', String(isTarget));
          });
          panes.forEach(pane => {
            pane.classList.toggle('active', pane.dataset.paneId === targetId);
          });
          if (targetId === 'explorer' && explorerDrawCallback) {
            requestAnimationFrame(explorerDrawCallback);
          }
        });
      });

      const copyBtn = row.querySelector('.copy-bibtex-btn');
      if (copyBtn && p.bibtex) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) navigator.clipboard.writeText(p.bibtex);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
        });
      }

      const thumb = row.querySelector('.thumb-manuscript');
      if (thumb && hasUrl) {
        thumb.addEventListener('click', () => {
          window.open(p.url, '_blank', 'noopener');
        });
      }

      listEl.appendChild(row);
      if (idx === 0) initModelExplorer(row);
    });
  }

  function renderResearchView(data) {
    const nameEl = document.getElementById('hero-name');
    if (nameEl && data.name) nameEl.textContent = data.name;

    const subEl = document.getElementById('hero-subtitle');
    if (subEl && data.title) subEl.textContent = data.title;

    const affEl = document.getElementById('hero-affiliation');
    if (affEl && data.affiliation) affEl.textContent = data.affiliation;

    const locEl = document.getElementById('hero-location');
    if (locEl && data.location) locEl.textContent = data.location;

    const cvLinkEl = document.getElementById('hero-cv-link');
    if (cvLinkEl && data.cv) cvLinkEl.setAttribute('href', data.cv);

    const emailEl = document.querySelector('.contact-email');
    if (emailEl && data.email) {
      const displayEmail = data.email.replace('@', ' [at] ');
      emailEl.textContent = displayEmail;
      emailEl.href = 'mailto:' + data.email;
      emailEl.onclick = e => {
        if (navigator.clipboard) {
          e.preventDefault();
          navigator.clipboard.writeText(data.email);
          emailEl.textContent = 'Copied ' + data.email + ' ✓';
          setTimeout(() => { emailEl.textContent = displayEmail; }, 1800);
        }
      };
    }

    const photoEl = document.getElementById('hero-photo');
    if (photoEl && data.photo) {
      photoEl.src = data.photo;
      photoEl.alt = data.name || 'Brandon S.C. Chan';
    }

    const linksEl = document.getElementById('hero-links');
    if (linksEl && data.links) {
      linksEl.innerHTML = data.links
        .filter(l => l.type !== 'cv')
        .map(l => {
          const icon = SOCIAL_ICONS[l.type] || SOCIAL_ICONS.cv;
          const isExternal = l.url.startsWith('http');
          const target = isExternal ? ' target="_blank" rel="noopener"' : '';
          return `<a href="${l.url}" title="${l.label}" aria-label="${l.label}"${target}>${icon}</a>`;
        }).join('');
    }

    const bioEl = document.getElementById('hero-bio');
    if (bioEl && data.bio) {
      bioEl.innerHTML = data.bio.map(p => `<p>${p}</p>`).join('');
    }

    const pillsEl = document.getElementById('interest-pills');
    if (pillsEl && data.research_interests) {
      let activeField = null;
      pillsEl.innerHTML = data.research_interests.map(field =>
        `<button type="button" class="interest-pill" data-field="${field}">${field}</button>`
      ).join('');

      pillsEl.querySelectorAll('.interest-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const field = btn.dataset.field;
          if (activeField === field) {
            activeField = null;
            pillsEl.querySelectorAll('.interest-pill').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.paper').forEach(row => {
              row.classList.remove('filtered-dim', 'filtered-match');
            });
          } else {
            activeField = field;
            pillsEl.querySelectorAll('.interest-pill').forEach(b => {
              b.classList.toggle('active', b.dataset.field === field);
            });
            document.querySelectorAll('.paper').forEach(row => {
              const fields = (row.dataset.fields || '').split('|');
              const match = fields.some(f => f === field || f.toLowerCase().includes(field.toLowerCase()));
              row.classList.toggle('filtered-match', match);
              row.classList.toggle('filtered-dim', !match);
            });
          }
        });
      });
    }

    renderPaperList(data.working_papers, document.getElementById('working-papers-list'), document.getElementById('working-papers-section'));
    renderPaperList(data.publications, document.getElementById('publications-list'), document.getElementById('publications-section'));
    renderPaperList(data.work_in_progress, document.getElementById('wip-list'), document.getElementById('wip-section'));
    renderPaperList(data.resting_papers, document.getElementById('resting-papers-list'), document.getElementById('resting-papers-section'));

    let secIdx = 1;
    document.querySelectorAll('main > section').forEach(sec => {
      if (sec.style.display !== 'none') {
        const badge = sec.querySelector('.section-index');
        if (badge) badge.textContent = String(secIdx++).padStart(2, '0');
      }
    });

    initHeroWaveCanvas();
    init3DTiltAndRowGlow();
    initScrollAnimations();
    initScrollChrome();
  }

  // ─── Kinetic Continuous-Space Geodesic Flow & Equipotential Mesh ──────────
  let heroWaveCleanup = null;
  function initHeroWaveCanvas() {
    if (heroWaveCleanup) {
      heroWaveCleanup();
      heroWaveCleanup = null;
    }
    const hero = document.querySelector('header.hero');
    const canvas = document.getElementById('hero-canvas');
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ribbons = [];
    let pulses = [];
    let shockwaves = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let rafId = null;
    let t = 0;

    function buildScene() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 640;
      const numRibbons = isMobile ? 9 : 15;
      const numCtrl = isMobile ? 16 : 30;
      ribbons = [];

      for (let r = 0; r < numRibbons; r++) {
        const v = (r + 0.5) / numRibbons;
        const baseY = height * (0.06 + v * 0.88);
        const pts = [];
        for (let c = 0; c < numCtrl; c++) {
          const u = c / (numCtrl - 1);
          // Slight graceful meridional envelope compression around the focal portrait region
          const squeeze = Math.exp(-Math.pow((u - 0.72) * 3.2, 2)) * (v - 0.5) * 26;
          pts.push({
            u,
            v,
            baseX: u * width,
            baseY: baseY - squeeze,
            x: u * width,
            y: baseY - squeeze,
            vx: 0,
            vy: 0
          });
        }
        ribbons.push({
          index: r,
          v,
          phase: r * 0.34,
          amp: 6.5 + (r % 4) * 2.4,
          featured: r === 4 || r === 7 || r === 10,
          pts
        });
      }

      pulses = [
        { ribbon: 4,  s: 0.12, speed: 0.055, gold: true },
        { ribbon: 7,  s: 0.48, speed: 0.042, gold: false },
        { ribbon: 10, s: 0.78, speed: 0.050, gold: true },
        { ribbon: 4,  s: 0.65, speed: 0.055, gold: false },
        { ribbon: 7,  s: 0.91, speed: 0.042, gold: true }
      ].filter(p => p.ribbon < ribbons.length);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
    }

    function onLeave() {
      pointer.active = false;
    }

    function onClick(e) {
      if (prefersReduced) return;
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.55,
        strength: 20
      });
    }

    buildScene();
    window.addEventListener('resize', buildScene);
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave, { passive: true });
    hero.addEventListener('touchmove', onMove, { passive: true });
    hero.addEventListener('touchend', onLeave, { passive: true });
    canvas.addEventListener('click', onClick);

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const lineColor = styles.getPropertyValue('--mesh-line').trim() || 'rgba(0, 82, 204, 0.12)';
      const corridorColor = styles.getPropertyValue('--mesh-corridor').trim() || 'rgba(0, 82, 204, 0.30)';
      const nodeColor = styles.getPropertyValue('--mesh-node').trim() || 'rgba(169, 109, 16, 0.72)';

      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5.4;
        sw.strength *= 0.96;
        if (sw.radius > sw.maxRadius || sw.strength < 0.35) {
          shockwaves.splice(s, 1);
        }
      }

      ribbons.forEach(rib => {
        const pts = rib.pts;
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const waveY =
            Math.sin(p.u * Math.PI * 2.5 + t * 0.88 + rib.phase) * rib.amp +
            Math.cos(p.u * Math.PI * 4.2 - t * 0.58 + rib.v * 3.1) * (rib.amp * 0.45);

          let dyImpulse = 0;
          let dxImpulse = 0;

          if (pointer.active && !prefersReduced) {
            const dx = p.baseX - pointer.x;
            const dy = p.baseY - pointer.y;
            const dist2 = dx * dx + dy * dy;
            const rad2 = 165 * 165;
            if (dist2 < rad2) {
              const w = 1 - dist2 / rad2;
              const smoothW = w * w * (3 - 2 * w);
              dyImpulse += (dy > 0 ? 1 : -1) * smoothW * 15;
              dxImpulse += (dx / 165) * smoothW * 6;
            }
          }

          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const dx = p.baseX - sw.x;
            const dy = p.baseY - sw.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const band = Math.abs(dist - sw.radius);
            if (band < 48) {
              dyImpulse += Math.cos((band / 48) * (Math.PI / 2)) * sw.strength * (dy >= 0 ? 0.65 : -0.65);
            }
          }

          const targetY = p.baseY + waveY + dyImpulse;
          const targetX = p.baseX + dxImpulse;
          p.vy = (p.vy + (targetY - p.y) * 0.08) * 0.86;
          p.vx = (p.vx + (targetX - p.x) * 0.08) * 0.86;
          p.y += p.vy;
          p.x += p.vx;
        }

        ctx.strokeStyle = rib.featured ? corridorColor : lineColor;
        ctx.lineWidth = rib.featured ? 1.25 : 0.85;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) * 0.5;
          const yc = (pts[i].y + pts[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      });

      // Flowing luminous pulses along featured geodesic corridors
      pulses.forEach(pulse => {
        const rib = ribbons[pulse.ribbon];
        if (!rib) return;
        const s = (pulse.s + t * pulse.speed) % 1;
        const pts = rib.pts;
        const pos = s * (pts.length - 1);
        const idx = Math.min(pts.length - 2, Math.floor(pos));
        const frac = pos - idx;
        const px = pts[idx].x + (pts[idx + 1].x - pts[idx].x) * frac;
        const py = pts[idx].y + (pts[idx + 1].y - pts[idx].y) * frac;

        ctx.strokeStyle = pulse.gold ? nodeColor : corridorColor;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.arc(px, py, 5.2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pulse.gold ? nodeColor : corridorColor;
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
        ctx.fill();
      });

      shockwaves.forEach(sw => {
        ctx.strokeStyle = corridorColor;
        ctx.lineWidth = 1.05;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    function step() {
      t += 0.012;
      drawFrame();
      rafId = requestAnimationFrame(step);
    }

    if (prefersReduced) {
      drawFrame();
    } else {
      rafId = requestAnimationFrame(step);
    }

    heroWaveCleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', buildScene);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('touchmove', onMove);
      hero.removeEventListener('touchend', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }

  // ─── Apple TV+ Inner-Parallax Portrait + Paper Ambient Glow & Offprint Tilt ──
  function init3DTiltAndRowGlow() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const wrap = document.getElementById('portrait-wrap');
    const card = document.getElementById('portrait-card');
    const img = document.getElementById('hero-photo');
    const glare = document.getElementById('portrait-glare');
    if (wrap && card) {
      let rx = 0, ry = 0, trx = 0, try_ = 0, raf = null;
      function animatePortrait() {
        rx += (trx - rx) * 0.14;
        ry += (try_ - ry) * 0.14;
        card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        if (img) {
          img.style.transform = `scale(1.04) translate3d(${(-ry * 0.9).toFixed(2)}px, ${(rx * 0.9).toFixed(2)}px, 0)`;
        }
        if (Math.abs(trx - rx) > 0.04 || Math.abs(try_ - ry) > 0.04) {
          raf = requestAnimationFrame(animatePortrait);
        } else {
          raf = null;
        }
      }
      wrap.addEventListener('mousemove', e => {
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        trx = -(py - 0.5) * 7;
        try_ = (px - 0.5) * 7;
        if (glare) {
          glare.style.setProperty('--glare-x', (px * 100).toFixed(1) + '%');
          glare.style.setProperty('--glare-y', (py * 100).toFixed(1) + '%');
          glare.style.setProperty('--glare-opacity', '1');
        }
        if (!raf) raf = requestAnimationFrame(animatePortrait);
      });
      wrap.addEventListener('mouseleave', () => {
        trx = 0;
        try_ = 0;
        if (glare) glare.style.setProperty('--glare-opacity', '0');
        if (!raf) raf = requestAnimationFrame(animatePortrait);
      });
    }

    document.querySelectorAll('.paper').forEach(paperRow => {
      const thumb = paperRow.querySelector('.thumb-manuscript');
      paperRow.addEventListener('mousemove', e => {
        const rect = paperRow.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        paperRow.style.setProperty('--mouse-x', mx + 'px');
        paperRow.style.setProperty('--mouse-y', my + 'px');
        if (thumb) {
          const nx = mx / rect.width - 0.5;
          const ny = my / rect.height - 0.5;
          thumb.style.transform = `rotateX(${(-ny * 8).toFixed(1)}deg) rotateY(${(nx * 10).toFixed(1)}deg) translateY(-2px)`;
        }
      });
      paperRow.addEventListener('mouseleave', () => {
        if (thumb) thumb.style.transform = '';
      });
    });
  }

  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const viewH = window.innerHeight;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '120px 0px 80px 0px' });

    let idx = 0;
    document.querySelectorAll('.paper, h2.section').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewH * 0.92) {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = (idx % 4) * 45 + 'ms';
        obs.observe(el);
        idx++;
      }
    });
  }

  function renderCurrentPage(data) {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (document.getElementById('hero-name')) renderResearchView(data);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();

    fetch('content.json')
      .then(r => r.json())
      .then(data => {
        renderCurrentPage(data);
      })
      .catch(err => console.error('Error loading content.json:', err));
  });
})();
