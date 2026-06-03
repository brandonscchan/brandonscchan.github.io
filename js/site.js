/* ------------------------------------------------------------------
   Renders content.json into the page. Every page has empty
   containers (divs with ids) — this script fills them in.
   ------------------------------------------------------------------ */

// Escape only text we don't want to treat as HTML. Fields that may
// legitimately contain HTML tags (abstracts, venues, bios) are passed
// through raw — so authors can bold words, italicize journal names,
// or drop in links.
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SOCIAL_ICONS = {
  email:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg>',
  scholar:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 9l11 7 9-5.73V17h2V9z M5 13.18v4L12 21l7-3.82v-4L12 17z"/></svg>',
  x:        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.09-2.36 4.31-2.36 4.61 0 5.46 3.03 5.46 6.97V22h-4.56v-6.56c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V22H7.62V8z"/></svg>',
  github:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.74.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.67 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.46.1-3.05 0 0 .95-.3 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.17-1.47 3.12-1.17 3.12-1.17.61 1.59.22 2.76.11 3.05.73.8 1.17 1.82 1.17 3.07 0 4.4-2.69 5.37-5.25 5.65.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z"/></svg>',
  website:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>'
};

function renderNav(activePage, profile) {
  const nav = document.getElementById('topnav');
  if (!nav) return;
  const items = [
    { key: 'research', label: 'Research', href: 'index.html' },
    { key: 'cv',       label: 'CV',       href: profile.cv || 'files/cv.pdf' },
    { key: 'teaching', label: 'Teaching', href: 'teaching.html' },
    { key: 'data',     label: 'Data',     href: 'data.html' },
    { key: 'contact',  label: 'Contact',  href: 'index.html#contact' }
  ];
  nav.innerHTML = '<ul>' + items.map(i =>
    `<li><a href="${esc(i.href)}"${i.key === activePage ? ' class="active"' : ''}>${esc(i.label)}</a></li>`
  ).join('') + '</ul>';
}

function renderHero(profile, opts = {}) {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const portraitHTML = profile.portrait
    ? `<img class="portrait" src="${esc(profile.portrait)}" alt="${esc(profile.name)}" />`
    : '';

  const socialsHTML = (profile.socials || []).map(s => {
    const icon = SOCIAL_ICONS[s.type] || SOCIAL_ICONS.website;
    return `<a href="${esc(s.url)}" title="${esc(s.type)}" aria-label="${esc(s.type)}">${icon}</a>`;
  }).join('');

  const title = opts.titleOverride || profile.title;
  const subtitle = opts.subtitle;

  hero.innerHTML = `
    ${portraitHTML}
    <h1>${esc(opts.nameOverride || profile.name)}</h1>
    <div class="title">${esc(title)}</div>
    ${profile.affiliation && !opts.hideAffiliation ? `<div class="affiliation">${esc(profile.affiliation)}</div>` : ''}
    ${subtitle ? `<div class="affiliation">${esc(subtitle)}</div>` : ''}
    ${!opts.hideContact ? `
      <div class="contact" id="contact">
        ${esc(profile.email.replace('@', ' [at] '))}
        ${profile.location ? ` <span>·</span> ${esc(profile.location)}` : ''}
      </div>
      <div class="socials">${socialsHTML}</div>
    ` : ''}
  `;
}

function renderFooter(profile) {
  const f = document.getElementById('footer');
  if (f) f.innerHTML = esc(profile.footer || '');
}

function renderAbout(bio) {
  const about = document.getElementById('about');
  if (!about || !bio) return;
  about.innerHTML = `
    <h2 class="section">About</h2>
    ${bio.map(p => `<p>${p}</p>`).join('')}
  `;
}

// Star/award icon used in front of each "award" entry.
const AWARD_ICON = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

// Split a paper's `badges` array into two visual groups:
//   - tags:   short, comma-free strings -> small grey pills
//   - awards: anything with a comma, or any {title, desc} object
// This means you don't have to restructure content.json — long
// award descriptions automatically render in the nicer style.
function classifyBadges(badges) {
  const tags = [], awards = [];
  for (const b of (badges || [])) {
    if (b && typeof b === 'object') {
      awards.push({
        title: b.title || b.name || '',
        desc:  b.desc  || b.description || ''
      });
    } else if (typeof b === 'string' && b.indexOf(',') !== -1) {
      const i = b.indexOf(',');
      awards.push({ title: b.slice(0, i).trim(), desc: b.slice(i + 1).trim() });
    } else if (b) {
      tags.push(String(b));
    }
  }
  return { tags, awards };
}

function renderAward(a) {
  const desc = a.desc ? ` <span class="award-desc">— ${esc(a.desc)}</span>` : '';
  return `
    <div class="award">
      <span class="award-icon">${AWARD_ICON}</span>
      <span><span class="award-title">${esc(a.title)}</span>${desc}</span>
    </div>
  `;
}

function renderPaper(p) {
  // The "journal icon" thumbnail (brunopellegrino.com). If the paper has a
  // url, the thumbnail links to it; otherwise it's just an image / placeholder.
  const hasLink = p.url && p.url !== '#';
  const thumbImg = p.thumb
    ? `<img src="${esc(p.thumb)}" alt="${esc(p.title)}">`
    : '';
  const thumbInner = thumbImg
    ? (hasLink ? `<a href="${esc(p.url)}">${thumbImg}</a>` : thumbImg)
    : '';
  const thumbHTML = p.thumb
    ? `<div class="thumb">${thumbInner}</div>`
    : `<div class="thumb placeholder">PDF</div>`;

  const { tags, awards } = classifyBadges(p.badges);

  const tagsHTML = tags.length
    ? `<div class="badges">${tags.map(t => `<span class="badge">${esc(t)}</span>`).join('')}</div>`
    : '';

  const awardsHTML = awards.length
    ? `<div class="awards">${awards.map(renderAward).join('')}</div>`
    : '';

  const linksHTML = (p.links && p.links.length)
    ? `<div class="links">${p.links.map(l => `<a href="${esc(l.url)}">[${esc(l.label)}]</a>`).join(' ')}</div>`
    : '';

  const presentationsHTML = p.presentations
    ? `<div class="presentations"><b>Presentations:</b> ${p.presentations}</div>`
    : '';

  const titleHTML = p.url && p.url !== '#'
    ? `<a href="${esc(p.url)}">${esc(p.title)}</a>`
    : esc(p.title);

  return `
    <div class="paper">
      ${thumbHTML}
      <div>
        <div class="title">${titleHTML}</div>
        ${p.authors ? `<div class="authors">${esc(p.authors)}</div>` : ''}
        ${p.venue ? `<div class="venue">${p.venue}</div>` : ''}
        ${tagsHTML}
        ${awardsHTML}
        ${p.abstract ? `<p class="abstract">${p.abstract}</p>` : ''}
        ${linksHTML}
        ${presentationsHTML}
      </div>
    </div>
  `;
}

function renderWIP(p) {
  return `
    <div class="paper">
      <div></div>
      <div>
        <div class="title">${esc(p.title)}</div>
        ${p.authors ? `<div class="authors">${esc(p.authors)}</div>` : ''}
        ${p.abstract ? `<p class="abstract">${p.abstract}</p>` : ''}
      </div>
    </div>
  `;
}

function renderPaperSection(id, heading, papers, wip = false) {
  const el = document.getElementById(id);
  if (!el || !papers || !papers.length) { if (el) el.innerHTML = ''; return; }
  el.innerHTML = `
    <h2 class="section">${esc(heading)}</h2>
    ${papers.map(wip ? renderWIP : renderPaper).join('')}
  `;
}

function renderTeachingItem(item) {
  return `
    <div class="teaching-item">
      <div class="course-title">${esc(item.course_title)}</div>
      ${item.meta ? `<div class="course-meta">${esc(item.meta)}</div>` : ''}
      ${item.description ? `<div class="course-desc">${item.description}</div>` : ''}
    </div>
  `;
}

function renderTeachingSection(id, heading, items) {
  const el = document.getElementById(id);
  if (!el || !items || !items.length) { if (el) el.innerHTML = ''; return; }
  el.innerHTML = `
    <h2 class="section">${esc(heading)}</h2>
    ${items.map(renderTeachingItem).join('')}
  `;
}

async function loadContent() {
  // Cache-bust so edits show up immediately in the preview panel.
  const res = await fetch('content.json?v=' + Date.now());
  if (!res.ok) throw new Error('Failed to load content.json');
  return res.json();
}

// Entry point for each page. Call with the page key.
window.renderPage = async function (page) {
  try {
    const data = await loadContent();
    const profile = data.profile || {};

    renderNav(page, profile);
    renderFooter(profile);

    if (page === 'research') {
      renderHero(profile);
      renderAbout(profile.bio);
      renderPaperSection('working-papers',   'Working Papers',    data.working_papers);
      renderPaperSection('published-papers', 'Published Papers',  data.published_papers);
      renderPaperSection('work-in-progress', 'Work in Progress',  data.work_in_progress, true);
    } else if (page === 'teaching') {
      renderHero(profile, {
        nameOverride: 'Teaching',
        titleOverride: 'Courses & Teaching Materials',
        hideAffiliation: true,
        hideContact: true
      });
      const t = data.teaching || {};
      renderTeachingSection('teaching-instructor', 'As Instructor',       t.instructor);
      renderTeachingSection('teaching-ta',         'As Teaching Assistant', t.ta);
      renderTeachingSection('teaching-materials',  'Teaching Materials',  t.materials);
    } else if (page === 'data') {
      renderHero(profile, {
        nameOverride: 'Data',
        titleOverride: 'Public datasets from my research',
        hideAffiliation: true,
        hideContact: true
      });
      renderTeachingSection('data-list', 'Datasets', data.data);
    }
  } catch (err) {
    console.error(err);
    document.body.innerHTML =
      '<div style="max-width:700px;margin:80px auto;padding:0 24px;font-family:sans-serif">' +
      '<h2>Couldn\u2019t load <code>content.json</code>.</h2>' +
      '<p>If you are previewing locally, make sure you are serving the site over HTTP, not opening the HTML file directly. From this folder run:</p>' +
      '<pre>python3 -m http.server 8000</pre>' +
      '<p>then visit <a href="http://localhost:8000">http://localhost:8000</a>.</p>' +
      '<p>Underlying error: ' + esc(err.message) + '</p></div>';
  }
};
