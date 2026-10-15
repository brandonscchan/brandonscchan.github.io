/* ------------------------------------------------------------------
   Brandon S.C. Chan — Academic Website Engine
   Open Editorial Architecture + Apple & Google Design System
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const THEME_KEY = 'bc_theme_v5';

  const SOCIAL_ICONS = {
    email:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>',
    scholar:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>',
    x:        '<svg width="13.5" height="13.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    github:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    cv:       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
  };

  const AWARD_ICON = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('.theme-icon');
    if (!icon) return;
    if (theme === 'dark') {
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    } else {
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
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

  function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    const nav = document.getElementById('topnav');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
        bar.style.width = pct + '%';
      }
      if (nav) {
        nav.classList.toggle('scrolled', scrollTop > 36);
      }
    }, { passive: true });
  }

  // ─── Render Flat Editorial Paper Rows + 3D Offprint Sheet ─────────────────
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

      const tagText = p.tag || p.venue || 'Working Paper';
      const eqText = p.equation || 'E[U(c)] = max';
      const hasUrl = p.url && p.url !== '#';
      const yearMatch = ((p.venue || '') + ' ' + (p.tag || '')).match(/20\d{2}/);
      const pdfLabel = hasUrl ? 'PDF ↗' : 'WP · ' + (yearMatch ? yearMatch[0] : (2025 - idx));

      const offprintHtml = `
        <div class="thumb-stage">
          <div class="thumb-manuscript" title="${hasUrl ? 'Click to toggle abstract or view PDF' : 'Click to toggle abstract'}">
            <div>
              <div class="ms-header">${tagText}</div>
              <div class="ms-title">${p.title}</div>
              <div class="ms-author">${p.authors || 'Brandon S.C. Chan'}</div>
              <div class="ms-eq">${eqText}</div>
            </div>
            <div class="ms-lines">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="ms-footer">
              <span>YALE ECON</span>
              <span>${pdfLabel}</span>
            </div>
          </div>
        </div>
      `;

      const upstreamRef = (document.referrer && !document.referrer.includes(window.location.hostname))
        ? encodeURIComponent(document.referrer)
        : '';
      const withRef = (rawUrl) => {
        if (!rawUrl || !upstreamRef || !rawUrl.startsWith('papers/')) return rawUrl;
        return rawUrl + (rawUrl.includes('?') ? '&' : '?') + 'ref=' + upstreamRef;
      };

      const titleInner = hasUrl
        ? `<a href="${withRef(p.url)}" target="_blank" rel="noopener">${p.title}</a>`
        : p.title;
      const titleHtml = `<div class="title">${titleInner}</div>`;

      const authorsPart = p.authors ? `<span class="authors">${p.authors}</span>` : '';
      const venuePart = p.venue ? `<span class="venue">${authorsPart ? '&middot; ' : ''}${p.venue}</span>` : '';
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
      } else if (p.badges && Array.isArray(p.badges)) {
        p.badges.forEach(b => {
          if (typeof b === 'string' && b.indexOf(',') !== -1) {
            const i = b.indexOf(',');
            awards.push({ title: b.slice(0, i).trim(), desc: b.slice(i + 1).trim() });
          }
        });
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

      const presHtml = p.presentations
        ? `<div class="presentations"><b>Presentations:</b> ${p.presentations.replace(/^Presentations:\s*/i, '')}</div>`
        : '';

      const mediaHtml = (p.media && Array.isArray(p.media) && p.media.length > 0)
        ? `<div class="media-coverage"><b>Media Coverage:</b> ${p.media.map(m => {
            const outlet = m.outlet ? `<i>${m.outlet}</i>: ` : '';
            return `<a href="${m.url}" target="_blank" rel="noopener">${outlet}&ldquo;${m.title}&rdquo; &#8599;</a>`;
          }).join(' <span class="media-sep">&middot;</span> ')}</div>`
        : '';

      let actionsItems = '';
      if (p.abstract) {
        actionsItems += `
          <button type="button" class="action-chip abstract-toggle" aria-expanded="false">
            <span>Abstract</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>`;
      }
      if (p.links && p.links.length > 0) {
        actionsItems += p.links
          .filter(l => l.url && l.url !== '#')
          .map(l => `<a class="action-chip" href="${withRef(l.url)}" target="_blank" rel="noopener">${l.label} &#8599;</a>`)
          .join('');
      }
      if (p.bibtex) {
        actionsItems += `<button type="button" class="action-chip bibtex-toggle" aria-expanded="false">BibTeX</button>`;
      }
      const actionsHtml = actionsItems ? `<div class="paper-actions">${actionsItems}</div>` : '';

      const abstractDrawerHtml = p.abstract
        ? `<div class="drawer-grid abstract-drawer"><div class="drawer-inner"><p class="abstract">${p.abstract}</p></div></div>`
        : '';

      const bibtexDrawerHtml = p.bibtex
        ? `<div class="drawer-grid bibtex-drawer"><div class="drawer-inner"><div class="bibtex-box"><button type="button" class="copy-bibtex-btn">Copy</button><pre>${p.bibtex}</pre></div></div></div>`
        : '';

      row.innerHTML = `
        ${offprintHtml}
        <div>
          ${titleHtml}
          ${metaHtml}
          ${badgesHtml}
          ${awardsHtml}
          ${actionsHtml}
          ${abstractDrawerHtml}
          ${bibtexDrawerHtml}
          ${presHtml}
          ${mediaHtml}
        </div>
      `;

      const absBtn = row.querySelector('.abstract-toggle');
      const absDrawer = row.querySelector('.abstract-drawer');
      if (absBtn && absDrawer) {
        absBtn.addEventListener('click', () => {
          const isOpen = absDrawer.classList.toggle('open');
          absBtn.setAttribute('aria-expanded', String(isOpen));
        });
      }

      const bibBtn = row.querySelector('.bibtex-toggle');
      const bibDrawer = row.querySelector('.bibtex-drawer');
      if (bibBtn && bibDrawer) {
        bibBtn.addEventListener('click', () => {
          const isOpen = bibDrawer.classList.toggle('open');
          bibBtn.setAttribute('aria-expanded', String(isOpen));
        });
      }

      const copyBtn = row.querySelector('.copy-bibtex-btn');
      if (copyBtn && p.bibtex) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) navigator.clipboard.writeText(p.bibtex);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
        });
      }

      const thumb = row.querySelector('.thumb-manuscript');
      if (thumb) {
        thumb.addEventListener('click', () => {
          if (absBtn) absBtn.click();
          else if (hasUrl) window.open(p.url, '_blank', 'noopener');
        });
      }

      listEl.appendChild(row);
    });
  }

  function renderHonours(honours) {
    const sec = document.getElementById('honours-section');
    const list = document.getElementById('honours-list');
    if (!sec || !list) return;
    if (!honours || honours.length === 0) {
      sec.style.display = 'none';
      return;
    }
    sec.style.display = 'block';
    list.innerHTML = honours.map(h => {
      const detail = h.detail || h.org || '';
      return `
        <li class="honour-item">
          <span class="honour-year">${h.year || ''}</span>
          <span>
            <span class="honour-title">${h.title}</span>
            ${detail ? `<span class="honour-org"> &mdash; ${detail}</span>` : ''}
          </span>
        </li>
      `;
    }).join('');
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

    const emailEl = document.querySelector('.contact-email');
    if (emailEl && data.email) {
      const displayEmail = data.email.replace('@', ' [at] ');
      emailEl.textContent = displayEmail;
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

    // Interactive Research Field Filter Chips under About
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
    renderHonours(data.honours);

    // Ensure visible sections always have sequential 01, 02, 03... indices
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
  }

  // ─── Apple & DeepMind Topographic Iso-Contours + Curved Geodesic Network ──
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
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ribbons = [];
    let hubs = [];
    let arcs = [];
    let shockwaves = [];
    let pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
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

      const isMobile = width < 600;
      const numRibbons = isMobile ? 7 : 11;
      const numCtrl = isMobile ? 16 : 26;
      ribbons = [];

      // 1. Continuous Topographic Equipotential Ribbons (Apple / DeepMind Silk Isolines)
      for (let r = 0; r < numRibbons; r++) {
        const v = (r + 0.5) / numRibbons;
        const baseY = height * (0.08 + v * 0.78);
        const nodes = [];
        for (let c = 0; c < numCtrl; c++) {
          const u = c / (numCtrl - 1);
          nodes.push({
            u,
            v,
            baseX: u * width,
            baseY,
            x: u * width,
            y: baseY,
            vy: 0,
            vx: 0
          });
        }
        ribbons.push({
          index: r,
          v,
          phase: r * 0.42,
          amp: 6 + (r % 3) * 2.5,
          nodes
        });
      }

      // 2. Peripheral Spatial Gravity Hubs (Left & Right Wings — Zero Center Crossing / No "X")
      const hubCoords = isMobile
        ? [
            // Left wing
            { ux: 0.08, uy: 0.22, size: 2.4 },
            { ux: 0.16, uy: 0.44, size: 3.0 },
            { ux: 0.10, uy: 0.68, size: 2.2 },
            // Right wing
            { ux: 0.91, uy: 0.24, size: 2.5 },
            { ux: 0.84, uy: 0.46, size: 3.0 },
            { ux: 0.90, uy: 0.70, size: 2.2 }
          ]
        : [
            // Left Spatial Cluster (e.g., Lancashire / Midlands corridor)
            { ux: 0.06, uy: 0.20, size: 2.2, primary: false },
            { ux: 0.15, uy: 0.15, size: 2.8, primary: true },
            { ux: 0.12, uy: 0.36, size: 3.2, primary: true },
            { ux: 0.23, uy: 0.28, size: 2.4, primary: false },
            { ux: 0.21, uy: 0.50, size: 2.9, primary: true },
            { ux: 0.09, uy: 0.58, size: 2.3, primary: false },
            { ux: 0.18, uy: 0.72, size: 2.5, primary: false },
            // Right Spatial Cluster (e.g., London / Thames & Bristol corridor)
            { ux: 0.93, uy: 0.19, size: 2.2, primary: false },
            { ux: 0.84, uy: 0.16, size: 2.8, primary: true },
            { ux: 0.88, uy: 0.37, size: 3.2, primary: true },
            { ux: 0.77, uy: 0.29, size: 2.4, primary: false },
            { ux: 0.79, uy: 0.51, size: 2.9, primary: true },
            { ux: 0.91, uy: 0.59, size: 2.3, primary: false },
            { ux: 0.82, uy: 0.73, size: 2.5, primary: false }
          ];

      hubs = hubCoords.map((h, i) => ({
        id: i,
        ux: h.ux,
        uy: h.uy,
        baseX: h.ux * width,
        baseY: h.uy * height,
        x: h.ux * width,
        y: h.uy * height,
        vx: 0,
        vy: 0,
        size: h.size,
        primary: !!h.primary,
        energy: 0
      }));

      // Connect nearby hubs within each wing via smoothly curved geodesic arcs
      const edgePairs = isMobile
        ? [[0, 1], [1, 2], [0, 2], [3, 4], [4, 5], [3, 5]]
        : [
            // Left cluster geodesic mesh
            [0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [2, 5], [4, 5], [4, 6], [5, 6],
            // Right cluster geodesic mesh
            [7, 8], [7, 9], [8, 9], [8, 10], [9, 10], [9, 11], [10, 11], [9, 12], [11, 12], [11, 13], [12, 13]
          ];

      arcs = edgePairs.map((pair, idx) => ({
        a: pair[0],
        b: pair[1],
        bend: (idx % 2 === 0 ? 1 : -1) * (12 + (idx % 3) * 6),
        speed: 0.16 + (idx % 4) * 0.045,
        phase: (idx * 0.23) % 1,
        hasPulse: idx % 2 === 0
      }));
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const nx = clientX - rect.left;
      const ny = clientY - rect.top;
      pointer.vx = nx - pointer.x;
      pointer.vy = ny - pointer.y;
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
    }

    function onLeave() {
      pointer.active = false;
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.65,
        strength: 22,
        alpha: 0.45
      });
    }

    buildScene();
    window.addEventListener('resize', buildScene);
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave, { passive: true });
    hero.addEventListener('touchmove', onMove, { passive: true });
    hero.addEventListener('touchend', onLeave, { passive: true });
    canvas.addEventListener('click', onClick);

    function quadPoint(x0, y0, cx, cy, x1, y1, s) {
      const inv = 1 - s;
      return {
        x: inv * inv * x0 + 2 * inv * s * cx + s * s * x1,
        y: inv * inv * y0 + 2 * inv * s * cy + s * s * y1
      };
    }

    function step() {
      t += 0.014;
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const lineColor = styles.getPropertyValue('--mesh-line').trim() || 'rgba(0, 82, 204, 0.095)';
      const corridorColor = styles.getPropertyValue('--mesh-corridor').trim() || 'rgba(0, 82, 204, 0.22)';
      const nodeColor = styles.getPropertyValue('--mesh-node').trim() || 'rgba(180, 120, 20, 0.44)';

      // Advance shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5.5;
        sw.strength *= 0.965;
        sw.alpha *= 0.96;
        if (sw.radius > sw.maxRadius || sw.strength < 0.35) {
          shockwaves.splice(s, 1);
        }
      }

      // 1. Update & Draw Smooth Topographic Equipotential Ribbons
      ctx.lineWidth = 1;
      ribbons.forEach(rib => {
        const nodes = rib.nodes;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          // Smooth harmonic spatial potential wave
          const waveY =
            Math.sin(n.u * Math.PI * 2.5 + t * 0.95 + rib.phase) * rib.amp +
            Math.cos(n.u * Math.PI * 4.0 - t * 0.65 + rib.v * 3.0) * (rib.amp * 0.45);

          let dyImpulse = 0;
          let dxImpulse = 0;

          if (pointer.active) {
            const dx = n.baseX - pointer.x;
            const dy = n.baseY - pointer.y;
            const dist2 = dx * dx + dy * dy;
            const rad2 = 140 * 140;
            if (dist2 < rad2) {
              const w = 1 - dist2 / rad2;
              const smoothW = w * w * (3 - 2 * w);
              dyImpulse += (dy > 0 ? 1 : -1) * smoothW * 14 + Math.sin(dist2 * 0.001 - t * 3) * smoothW * 5;
              dxImpulse += (dx / 140) * smoothW * 6;
            }
          }

          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const dx = n.baseX - sw.x;
            const dy = n.baseY - sw.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const band = Math.abs(dist - sw.radius);
            if (band < 48) {
              dyImpulse += Math.cos((band / 48) * (Math.PI / 2)) * sw.strength * (dy >= 0 ? 0.7 : -0.7);
            }
          }

          const targetY = n.baseY + waveY + dyImpulse;
          const targetX = n.baseX + dxImpulse;
          n.vy = (n.vy + (targetY - n.y) * 0.08) * 0.86;
          n.vx = (n.vx + (targetX - n.x) * 0.08) * 0.86;
          n.y += n.vy;
          n.x += n.vx;
        }

        // Render smooth quadratic spline ribbon
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < nodes.length - 1; i++) {
          const xc = (nodes[i].x + nodes[i + 1].x) * 0.5;
          const yc = (nodes[i].y + nodes[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
        }
        const last = nodes[nodes.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      });

      // 2. Update Spatial Gravity Hubs (Spring-Damper Physics)
      hubs.forEach(h => {
        const floatX = Math.sin(t * 0.8 + h.id * 1.3) * 3.5;
        const floatY = Math.cos(t * 0.7 + h.id * 1.7) * 3.5;
        let gx = 0, gy = 0;
        h.energy *= 0.93;

        if (pointer.active) {
          const dx = pointer.x - h.baseX;
          const dy = pointer.y - h.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170 && dist > 1) {
            const pull = (1 - dist / 170);
            gx += (dx / dist) * pull * 9;
            gy += (dy / dist) * pull * 9;
            h.energy = Math.max(h.energy, pull * 0.85);
          }
        }

        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const dx = h.baseX - sw.x;
          const dy = h.baseY - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - sw.radius) < 36) {
            h.energy = 1.0;
          }
        }

        h.vx = (h.vx + (h.baseX + floatX + gx - h.x) * 0.07) * 0.86;
        h.vy = (h.vy + (h.baseY + floatY + gy - h.y) * 0.07) * 0.86;
        h.x += h.vx;
        h.y += h.vy;
      });

      // 3. Draw Curved Geodesic Transport Arcs & Equilibrium Pulses
      arcs.forEach(arc => {
        const h1 = hubs[arc.a];
        const h2 = hubs[arc.b];
        if (!h1 || !h2) return;

        const mx = (h1.x + h2.x) * 0.5;
        const my = (h1.y + h2.y) * 0.5;
        const dx = h2.x - h1.x;
        const dy = h2.y - h1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const cx = mx + nx * arc.bend;
        const cy = my + ny * arc.bend;

        ctx.strokeStyle = corridorColor;
        ctx.lineWidth = (h1.energy + h2.energy > 0.4) ? 1.35 : 0.95;
        ctx.beginPath();
        ctx.moveTo(h1.x, h1.y);
        ctx.quadraticCurveTo(cx, cy, h2.x, h2.y);
        ctx.stroke();

        if (arc.hasPulse) {
          const s = (t * arc.speed + arc.phase) % 1;
          const pt = quadPoint(h1.x, h1.y, cx, cy, h2.x, h2.y, s);
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Draw Spatial Hub Nodes & Subtle Optical Rings
      hubs.forEach(h => {
        if (h.primary || h.energy > 0.15) {
          ctx.strokeStyle = corridorColor;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(h.x, h.y, h.size + 3.2 + h.energy * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = h.primary ? nodeColor : corridorColor;
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Expanding Click Shockwave Rings
      shockwaves.forEach(sw => {
        ctx.strokeStyle = corridorColor;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

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

  // ─── 3D Portrait Glare + Paper Row Ambient Spotlight & Offprint Tilt ───────
  function init3DTiltAndRowGlow() {
    const wrap = document.getElementById('portrait-wrap');
    const card = document.getElementById('portrait-card');
    const glare = document.getElementById('portrait-glare');
    if (wrap && card) {
      let rx = 0, ry = 0, trx = 0, try_ = 0, raf = null;
      function animatePortrait() {
        rx += (trx - rx) * 0.14;
        ry += (try_ - ry) * 0.14;
        card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
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
        trx = -(py - 0.5) * 8;
        try_ = (px - 0.5) * 8;
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
          thumb.style.transform = `rotateX(${(-ny * 10).toFixed(1)}deg) rotateY(${(nx * 12).toFixed(1)}deg) translateY(-2px)`;
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
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

    let idx = 0;
    document.querySelectorAll('.paper, h2.section, .teaching-item, .fav-category, .honour-item').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewH * 0.88) {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = (idx % 4) * 50 + 'ms';
        obs.observe(el);
        idx++;
      }
    });
  }

  let cachedData = null;

  function renderCurrentPage(data) {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (document.getElementById('hero-name')) renderResearchView(data);
  }

  function initSpaNav() {
    document.addEventListener('click', e => {
      const link = e.target.closest('nav a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.endsWith('.pdf')) return;
      if (href.includes('#')) return;

      e.preventDefault();
      fetch(href)
        .then(r => r.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const containerEl = document.querySelector('.container');
          if (containerEl) {
            containerEl.style.opacity = '0';
          }
          setTimeout(() => {
            document.title = doc.title;
            const currentNav = document.querySelector('nav');
            const newNav = doc.querySelector('nav');
            if (currentNav && newNav) {
              currentNav.innerHTML = newNav.innerHTML;
              initThemeToggle();
            }
            const newContainer = doc.querySelector('.container');
            if (containerEl && newContainer) {
              containerEl.innerHTML = newContainer.innerHTML;
              containerEl.style.opacity = '1';
            }
            window.history.pushState({}, '', href);
            window.scrollTo({ top: 0, behavior: 'instant' });
            if (cachedData) renderCurrentPage(cachedData);
          }, 120);
        })
        .catch(() => {
          window.location.href = href;
        });
    });

    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initProgressBar();
    initSpaNav();

    fetch('content.json')
      .then(r => r.json())
      .then(data => {
        cachedData = data;
        renderCurrentPage(data);
      })
      .catch(err => console.error('Error loading content.json:', err));
  });
})();
