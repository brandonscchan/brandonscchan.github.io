/* Brandon S.C. Chan — Academic Homepage Renderer */

(function () {
  'use strict';

  function renderPapers(sectionId, listId, papers) {
    const sec = document.getElementById(sectionId);
    const listEl = document.getElementById(listId);
    if (!sec || !listEl) return;

    if (!Array.isArray(papers) || papers.length === 0) {
      sec.style.display = 'none';
      return;
    }

    sec.style.display = 'block';
    listEl.innerHTML = '';

    papers.forEach(p => {
      const article = document.createElement('article');
      article.className = 'paper';

      const titleLink = p.url
        ? `<a class="paper-title" href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`
        : `<span class="paper-title">${p.title}</span>`;
      const pagesHtml = p.pages ? ` <span class="paper-pages">(${p.pages})</span>` : '';
      const statusHtml = p.status ? `<p class="paper-status">${p.status}</p>` : '';

      const awardsHtml = Array.isArray(p.awards) && p.awards.length > 0
        ? `<ul class="paper-awards">${p.awards.map(a => {
            const label = a.url
              ? `<a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>`
              : a.title;
            return `<li>${label}${a.desc ? ` &mdash; ${a.desc}` : ''}</li>`;
          }).join('')}</ul>`
        : '';

      const actionItems = [];
      if (Array.isArray(p.links)) {
        p.links.forEach(l => {
          const label = l.meta ? `${l.label} (${l.meta})` : l.label;
          actionItems.push(`<a href="${l.url}" target="_blank" rel="noopener">[${label}]</a>`);
        });
      }
      if (p.abstract) {
        actionItems.push('<button type="button" class="inline-btn abstract-btn" aria-expanded="false">[Abstract]</button>');
      }
      if (p.bibtex) {
        actionItems.push('<button type="button" class="inline-btn bibtex-btn" aria-expanded="false">[BibTeX]</button>');
      }

      const actionsHtml = actionItems.length > 0
        ? `<div class="paper-actions">${actionItems.join('')}</div>`
        : '';

      const jelHtml = p.jel ? `<p><strong>JEL Classification:</strong> ${p.jel}</p>` : '';
      const presHtml = p.presentations ? `<p><strong>Presentations:</strong> ${p.presentations}</p>` : '';
      const mediaHtml = Array.isArray(p.media) && p.media.length > 0
        ? `<p><strong>Media Coverage:</strong> ${p.media.map(m => {
            const outlet = m.outlet ? `${m.outlet}: ` : '';
            return `<a href="${m.url}" target="_blank" rel="noopener">${outlet}&ldquo;${m.title}&rdquo;</a>`;
          }).join(' &middot; ')}</p>`
        : '';

      const abstractDrawerHtml = p.abstract
        ? `<div class="paper-drawer" hidden><p><strong>Abstract:</strong> ${p.abstract}</p>${jelHtml}${presHtml}${mediaHtml}</div>`
        : '';

      const bibtexDrawerHtml = p.bibtex
        ? `<div class="bibtex-drawer" hidden><button type="button" class="copy-bibtex-btn">Copy</button><pre>${p.bibtex}</pre></div>`
        : '';

      article.innerHTML = `<p class="paper-headline">${titleLink}${pagesHtml}</p>${statusHtml}${awardsHtml}${actionsHtml}${abstractDrawerHtml}${bibtexDrawerHtml}`;

      const abstractBtn = article.querySelector('.abstract-btn');
      const abstractDrawer = article.querySelector('.paper-drawer');
      const bibtexBtn = article.querySelector('.bibtex-btn');
      const bibtexDrawer = article.querySelector('.bibtex-drawer');
      const copyBtn = article.querySelector('.copy-bibtex-btn');

      if (abstractBtn && abstractDrawer) {
        abstractBtn.addEventListener('click', () => {
          const open = abstractDrawer.hidden;
          abstractDrawer.hidden = !open;
          abstractBtn.setAttribute('aria-expanded', String(open));
        });
      }

      if (bibtexBtn && bibtexDrawer) {
        bibtexBtn.addEventListener('click', () => {
          const open = bibtexDrawer.hidden;
          bibtexDrawer.hidden = !open;
          bibtexBtn.setAttribute('aria-expanded', String(open));
        });
      }

      if (copyBtn && p.bibtex) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) navigator.clipboard.writeText(p.bibtex);
          copyBtn.textContent = 'Copied';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1600);
        });
      }

      listEl.appendChild(article);
    });
  }

  function renderPage(data) {
    const nameEl = document.getElementById('hero-name');
    if (nameEl && data.name) nameEl.textContent = data.name;

    const photoEl = document.getElementById('hero-photo');
    if (photoEl && data.photo) photoEl.src = data.photo;

    const bioEl = document.getElementById('hero-bio');
    if (bioEl && data.bio) {
      const paras = Array.isArray(data.bio) ? data.bio : [data.bio];
      bioEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
    }

    const emailEl = document.getElementById('hero-email');
    if (emailEl && data.email) {
      emailEl.textContent = data.email;
      emailEl.href = `mailto:${data.email}`;
    }

    const linksEl = document.getElementById('hero-links');
    if (linksEl && Array.isArray(data.links)) {
      linksEl.innerHTML = data.links
        .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
        .join('');
    }

    renderPapers('working-papers-section', 'working-papers-list', data.working_papers);
    renderPapers('publications-section', 'publications-list', data.publications);
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
      .then(r => r.json())
      .then(renderPage)
      .catch(err => console.error('Error loading content.json:', err));
  });
})();
