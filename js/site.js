/* ------------------------------------------------------------------
   Brandon S.C. Chan — Academic Website Engine
   Editorial Minimalism: Archival Ivory / Apple OLED Midnight
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const THEME_KEY = 'bc_theme_v5';

  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const iconSpan = toggleBtn.querySelector('.theme-icon');
    const html = document.documentElement;

    const SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.07" y2="4.93"/></svg>';
    const MOON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      if (iconSpan) iconSpan.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
    }

    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);

    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  function initScrollChrome() {
    const progressBar = document.getElementById('progress-bar');
    const nav = document.getElementById('topnav');
    const navAnchors = Array.from(document.querySelectorAll('.nav-anchor'));
    const trackedSections = ['about-section', 'working-papers-section']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && maxScroll > 0) {
        progressBar.style.width = Math.min(100, (scrollTop / maxScroll) * 100) + '%';
      }
      if (nav) nav.classList.toggle('scrolled', scrollTop > 28);

      let currentId = 'working-papers-section';
      const anchorOffset = scrollTop + 170;
      for (const sec of trackedSections) {
        if (sec.style.display !== 'none' && sec.offsetTop <= anchorOffset) {
          currentId = sec.id;
        }
      }
      navAnchors.forEach(a => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href === '#' + currentId);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Quiet topographic iso-contour field behind the hero */
  function initHeroContours() {
    const canvas = document.getElementById('hero-canvas');
    const hero = document.getElementById('hero-stage');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    let pointerX = 0.65;
    let pointerY = 0.48;
    let pointerActive = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function readPalette() {
      const cs = getComputedStyle(document.documentElement);
      return {
        line: cs.getPropertyValue('--mesh-line').trim() || 'rgba(19, 58, 124, 0.07)',
        corridor: cs.getPropertyValue('--mesh-corridor').trim() || 'rgba(19, 58, 124, 0.14)'
      };
    }

    const LINES = 13;
    const SAMPLES = 44;

    function computeY(i, u, t, pal) {
      const baseRatio = 0.10 + (i / (LINES - 1)) * 0.80;
      const baseY = baseRatio * height;
      const phase = i * 0.42;
      const arch = Math.sin(u * Math.PI * 1.65 + t * 0.22 + phase) * 10
                 + Math.cos(u * Math.PI * 3.0 - t * 0.15 + i * 0.5) * 4;

      const x = u * width;
      const dx = x - pointerX * width;
      const dy = baseY - pointerY * height;
      const dist = Math.hypot(dx, dy);
      const infl = pointerActive * Math.max(0, 1 - dist / 240);
      const push = (dy >= 0 ? 1 : -1) * infl * infl * 14;
      const isCorridor = i === 4 || i === 8;

      return { x, y: baseY + arch + push, isCorridor, pal };
    }

    function renderFrame() {
      if (width === 0 || height === 0) return;
      const pal = readPalette();
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < LINES; i++) {
        const isCorridor = i === 4 || i === 8;
        ctx.beginPath();
        for (let s = 0; s <= SAMPLES; s++) {
          const u = s / SAMPLES;
          const pt = computeY(i, u, time, pal);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = isCorridor ? pal.corridor : pal.line;
        ctx.lineWidth = isCorridor ? 1.05 : 0.72;
        ctx.stroke();
      }
    }

    hero.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / (rect.width || 1);
      pointerY = (e.clientY - rect.top) / (rect.height || 1);
      pointerActive = 1;
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      pointerActive = 0;
    }, { passive: true });

    window.addEventListener('resize', () => {
      resize();
      if (reducedMotion) renderFrame();
    });

    resize();
    if (reducedMotion) {
      renderFrame();
      return;
    }

    function loop() {
      time += 0.008;
      renderFrame();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function bindTailArrow(htmlString) {
    const parts = htmlString.trim().split(' ');
    if (parts.length <= 1) {
      return `<span class="nowrap-tail">${htmlString}<span class="ext-arrow" aria-hidden="true">&#8599;</span></span>`;
    }
    const last = parts.pop();
    return `${parts.join(' ')} <span style="white-space:nowrap">${last}<span class="ext-arrow" aria-hidden="true">&#8599;</span></span>`;
  }

  function initEmailCopy(email) {
    const el = document.querySelector('#contact .contact-email');
    if (!el || !email) return;
    el.addEventListener('click', e => {
      e.preventDefault();
      if (navigator.clipboard) navigator.clipboard.writeText(email);
      const original = el.textContent;
      el.textContent = 'Copied email address';
      setTimeout(() => { el.textContent = original; }, 1600);
    });
  }

  const CHEVRON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  function renderPaperList(sectionId, listId, countId, sectionIndex, papers, defaultOpenFirst) {
    const sec = document.getElementById(sectionId);
    const listEl = document.getElementById(listId);
    if (!sec || !listEl) return;

    if (!papers || !Array.isArray(papers) || papers.length === 0) {
      sec.style.display = 'none';
      return;
    }
    sec.style.display = 'block';
    const countEl = document.getElementById(countId);
    if (countEl && sectionIndex) countEl.textContent = sectionIndex;
    listEl.innerHTML = '';

    papers.forEach((p, idx) => {
      const row = document.createElement('article');
      row.className = 'paper';

      const hasUrl = p.url && p.url !== '#';
      const titleHtml = `<h3 class="paper-title">${hasUrl
        ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`
        : p.title}</h3>`;

      const venue = p.venue ? `<span class="venue">${p.venue}</span>` : '';
      const sep = (p.authors && venue) ? ' &middot; ' : '';
      const metaHtml = `<p class="paper-meta"><span class="authors">${p.authors || ''}</span>${sep}${venue}</p>`;

      const awards = (p.awards_list && p.awards_list.length > 0) ? p.awards_list : [];
      const awardsHtml = awards.length > 0
        ? `<div class="awards">${awards.map(a => {
            const titleNode = a.url
              ? `<a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>`
              : a.title;
            return `
              <div class="award">
                <span class="award-bullet" aria-hidden="true">&#9642;</span>
                <span><span class="award-title">${titleNode}</span>${a.desc ? ` <span class="award-desc">&mdash; ${a.desc}</span>` : ''}</span>
              </div>`;
          }).join('')}</div>`
        : '';

      const actionParts = [];
      if (p.links && p.links.length > 0) {
        p.links
          .filter(l => l.url && l.url !== '#')
          .forEach(l => {
            const metaText = l.meta ? ` <span class="link-meta">(${l.meta})</span>` : '';
            actionParts.push(`<a href="${l.url}" target="_blank" rel="noopener">${l.label}${metaText}<span class="ext-arrow" aria-hidden="true">&#8599;</span></a>`);
          });
      }

      const startOpen = Boolean(defaultOpenFirst && idx === 0 && (p.abstract || p.presentations || (p.media && p.media.length)));
      if (p.abstract) {
        actionParts.push(`<button type="button" class="inline-toggle abstract-btn${startOpen ? ' active' : ''}" aria-expanded="${startOpen}">Abstract</button>`);
      }
      if (p.bibtex) {
        actionParts.push(`<button type="button" class="inline-toggle bibtex-btn" aria-expanded="false">BibTeX</button>`);
      }

      const linksRowHtml = actionParts.length > 0
        ? `<div class="paper-links-row">${actionParts.join('')}</div>`
        : '';

      const presHtml = p.presentations
        ? `<div class="presentations"><b>Presentations:</b> <span class="presentations-list">${p.presentations.replace(/^Presentations:\s*/i, '')}</span></div>`
        : '';

      const mediaHtml = (p.media && Array.isArray(p.media) && p.media.length > 0)
        ? `<div class="media-coverage"><b>Media Coverage:</b> ${p.media.map(m => {
            const outlet = m.outlet ? `<i>${m.outlet}</i>: ` : '';
            const inner = bindTailArrow(`${outlet}&ldquo;${m.title}&rdquo;`);
            return `<a href="${m.url}" target="_blank" rel="noopener">${inner}</a>`;
          }).join('<span class="media-sep" aria-hidden="true">&middot;</span>')}</div>`
        : '';

      const jelHtml = p.jel ? `<div class="abstract-jel">JEL Classification: ${p.jel}</div>` : '';
      const abstractHtml = p.abstract
        ? `<div class="abstract-pane">
             <p class="abstract"><span class="abstract-label">Abstract:</span>${p.abstract}</p>
             ${jelHtml}
             ${(presHtml || mediaHtml) ? `<div class="paper-notes-meta">${presHtml}${mediaHtml}</div>` : ''}
           </div>`
        : '';

      const bibtexHtml = p.bibtex
        ? `<div class="bibtex-drawer">
             <div class="bibtex-drawer-inner">
               <div class="bibtex-box"><button type="button" class="copy-bibtex-btn">Copy</button><pre>${p.bibtex}</pre></div>
             </div>
           </div>`
        : '';

      const drawerHtml = (p.abstract || p.bibtex)
        ? `<div class="paper-drawer${startOpen ? ' open' : ''}">
             <div class="paper-drawer-inner">
               ${abstractHtml}
               ${bibtexHtml}
             </div>
           </div>`
        : '';

      const toggleBtnHtml = (p.abstract || p.bibtex)
        ? `<button type="button" class="paper-toggle" aria-expanded="${startOpen}" aria-label="Toggle abstract and paper details">${CHEVRON_SVG}</button>`
        : '';

      row.innerHTML = `
        <div class="paper-top-row">
          <div class="paper-head">
            ${titleHtml}
            ${metaHtml}
            ${awardsHtml}
            ${linksRowHtml}
          </div>
          ${toggleBtnHtml}
        </div>
        ${drawerHtml}
      `;

      const drawer = row.querySelector('.paper-drawer');
      const chevronBtn = row.querySelector('.paper-toggle');
      const abstractBtn = row.querySelector('.abstract-btn');
      const bibtexBtn = row.querySelector('.bibtex-btn');
      const bibtexDrawer = row.querySelector('.bibtex-drawer');
      const copyBtn = row.querySelector('.copy-bibtex-btn');

      function syncDrawerState(isOpen) {
        if (!drawer) return;
        drawer.classList.toggle('open', isOpen);
        if (chevronBtn) chevronBtn.setAttribute('aria-expanded', String(isOpen));
        if (abstractBtn) {
          abstractBtn.classList.toggle('active', isOpen);
          abstractBtn.setAttribute('aria-expanded', String(isOpen));
        }
        if (!isOpen && bibtexDrawer) {
          bibtexDrawer.classList.remove('open');
          if (bibtexBtn) {
            bibtexBtn.classList.remove('active');
            bibtexBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }

      if (chevronBtn && drawer) {
        chevronBtn.addEventListener('click', () => {
          syncDrawerState(!drawer.classList.contains('open'));
        });
      }

      if (abstractBtn && drawer) {
        abstractBtn.addEventListener('click', () => {
          syncDrawerState(!drawer.classList.contains('open'));
        });
      }

      if (bibtexBtn && drawer && bibtexDrawer) {
        bibtexBtn.addEventListener('click', () => {
          const openingBib = !bibtexDrawer.classList.contains('open');
          if (openingBib && !drawer.classList.contains('open')) {
            syncDrawerState(true);
          }
          bibtexDrawer.classList.toggle('open', openingBib);
          bibtexBtn.classList.toggle('active', openingBib);
          bibtexBtn.setAttribute('aria-expanded', String(openingBib));
        });
      }

      if (copyBtn && p.bibtex) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) navigator.clipboard.writeText(p.bibtex);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
        });
      }

      listEl.appendChild(row);
    });
  }

  function renderResearchView(data) {
    const nameEl = document.getElementById('hero-name');
    if (nameEl && data.name) nameEl.textContent = data.name;

    const subEl = document.getElementById('hero-subtitle');
    if (subEl && data.title) subEl.textContent = data.title;

    const locEl = document.getElementById('hero-location');
    if (locEl && data.location) locEl.textContent = data.location;

    const photoEl = document.getElementById('hero-photo');
    if (photoEl && data.photo) photoEl.src = data.photo;

    initEmailCopy(data.email);

    const linksEl = document.getElementById('hero-links');
    if (linksEl) {
      const items = [];
      const cvHref = data.cv || (data.links && (data.links.find(l => l.type === 'cv') || {}).url);
      if (cvHref) {
        items.push(`<a href="${cvHref}" target="_blank" rel="noopener">Curriculum Vitae<span class="ext-arrow" aria-hidden="true">&#8599;</span></a>`);
      }
      if (data.links && Array.isArray(data.links)) {
        data.links.forEach(l => {
          if (!l.url || l.url === '#' || l.type === 'email' || l.type === 'cv') return;
          items.push(`<a href="${l.url}" target="_blank" rel="noopener">${l.label}<span class="ext-arrow" aria-hidden="true">&#8599;</span></a>`);
        });
      }
      linksEl.innerHTML = items.join('');
    }

    const bioEl = document.getElementById('hero-bio');
    if (bioEl && data.bio) {
      const paras = Array.isArray(data.bio) ? data.bio : [data.bio];
      bioEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
    }

    const hasPubs = data.publications && Array.isArray(data.publications) && data.publications.length > 0;
    const hasWp = data.working_papers && Array.isArray(data.working_papers) && data.working_papers.length > 0;
    const hasWip = data.work_in_progress && Array.isArray(data.work_in_progress) && data.work_in_progress.length > 0;
    const hasRest = data.resting_papers && Array.isArray(data.resting_papers) && data.resting_papers.length > 0;

    let secNum = 2;
    const nextIdx = () => String(secNum++).padStart(2, '0');

    renderPaperList('working-papers-section', 'working-papers-list', 'wp-count', hasWp ? nextIdx() : '', data.working_papers, true);
    renderPaperList('publications-section', 'publications-list', 'pub-count', hasPubs ? nextIdx() : '', data.publications, false);
    renderPaperList('wip-section', 'wip-list', 'wip-count', hasWip ? nextIdx() : '', data.work_in_progress, false);
    renderPaperList('resting-papers-section', 'resting-papers-list', 'rp-count', hasRest ? nextIdx() : '', data.resting_papers, false);

    initHeroContours();
    initScrollChrome();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    fetch('content.json')
      .then(r => r.json())
      .then(data => renderResearchView(data))
      .catch(err => console.error('Error loading content.json:', err));
  });
})();
