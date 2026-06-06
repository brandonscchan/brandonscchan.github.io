# Brandon Chan — Academic Website

A fast, minimalist academic website. **All of your content lives in one
file: [`content.json`](content.json).** You never have to touch HTML to
add a paper, change your bio, or list a course.

Design influences:

| Element | Inspired by |
| ------- | ----------- |
| Typography — **Fjalla One** headings + **Libre Franklin** body | [christiankwolf.com](https://www.christiankwolf.com) |
| Large rectangular hero photo | [joelflynn.com](https://joelflynn.com) |
| Small "journal icon" thumbnails next to papers | [brunopellegrino.com](https://www.brunopellegrino.com) |

Pure HTML + CSS + a tiny vanilla-JS renderer. No framework, no build
step, no dependencies. Hosts free on GitHub Pages.

---

## TL;DR — the two things you'll ever do

1. **Edit content** → open [`content.json`](content.json), change text, save.
2. **Preview it** → double-click **`preview.command`**, your browser opens.

When happy, publish with three commands (see [Publishing](#5-publish-to-the-web-github-pages)):

```bash
git add -A && git commit -m "Update site" && git push
```

---

## 1. File structure

```
website/
├── content.json       ← EDIT THIS to change the site (text, papers, etc.)
├── preview.command    ← DOUBLE-CLICK to preview the site locally (macOS)
├── index.html         Research / home page (template shell — rarely touched)
├── teaching.html      Teaching page (template shell)
├── data.html          Data page (template shell)
├── favourites.html    Favourites page — papers & quotes by category
├── css/style.css      Styling. All the easy knobs are in the :root block at the top.
├── js/site.js         Renders content.json into the pages (rarely touched)
├── images/            Portrait + paper thumbnails (journal icons)
├── files/             CV, paper PDFs, appendices
├── .nojekyll          Tells GitHub Pages to serve the files as-is
└── README.md          This file
```

You will normally only touch **`content.json`** and the files in
**`images/`** and **`files/`**.

---

## 2. Edit your content

Open [`content.json`](content.json) in any text editor (VS Code is great).
Top-level keys:

| Key                 | What it controls                                   |
| ------------------- | -------------------------------------------------- |
| `profile`           | Name, title, affiliation, email, bio, socials      |
| `working_papers`    | Working papers (home page)                         |
| `published_papers`  | Published papers (home page)                       |
| `work_in_progress`  | Shorter in-progress entries (home page)            |
| `teaching`          | `instructor`, `ta`, `materials` lists              |
| `data`              | Public datasets                                    |
| `favourites`        | Favourite papers & quotes, grouped by category     |

> Your **profile photo, name, and contact details appear only on the
> front page**. The Teaching, Data, and Favourites pages show just a
> heading so the focus stays on their content.

### Add a working paper

Append an object to the `working_papers` array:

```json
{
  "title": "A New Paper",
  "url": "files/new_paper.pdf",
  "thumb": "images/new_paper_thumb.png",
  "authors": "with Jane Doe",
  "venue": "<i>Journal of X</i>, forthcoming",
  "badges": ["NBER WP #99999"],
  "abstract": "One paragraph summarizing the paper...",
  "links": [
    { "label": "PDF",    "url": "files/new_paper.pdf" },
    { "label": "Slides", "url": "files/new_paper_slides.pdf" }
  ],
  "presentations": "AEA (2026), NBER SI (2026), Yale, Princeton."
}
```

- `"thumb": ""` (or no `thumb`) shows a small **PDF** placeholder box. Set
  it to an image path to show a real journal icon (see §3).
- `badges` are flexible: a short string → a small grey pill; a string
  **with a comma** (e.g. `"Best Paper, Yale, 2026"`) → a gold-star award
  line. Mix freely.
- Abstracts, venues, and bios accept **inline HTML** (`<i>`, `<b>`,
  `<a href="...">`). Everything else is plain text and auto-escaped.
- To **delete** a paper, remove its object. To **reorder**, reorder the array.

### Change your name, title, email, socials

Edit `profile` at the top of `content.json`.

- `portrait`: path to your photo, or `""` to hide it.
- `socials`: supported `type` values are `email`, `scholar`, `x`,
  `linkedin`, `github`, `website`. Remove the ones you don't use and fill
  in real URLs for the rest.

### Favourite papers & quotes (the Favourites page)

`favourites` has an `intro` line and a list of `categories`. Each category
has a `name` and any mix of `papers` and `quotes`:

```json
"favourites": {
  "intro": "A running list of papers and passages I keep returning to.",
  "categories": [
    {
      "name": "Spatial Economics",
      "papers": [
        {
          "citation": "Krugman, P. (1991), \"Increasing Returns and Economic Geography,\" <i>JPE</i>.",
          "url": "https://www.jstor.org/stable/2937739",
          "note": "Why this one stuck with me — one sentence (optional)."
        }
      ],
      "quotes": [
        {
          "text": "A short passage worth rereading.",
          "source": "Author, <i>Title</i> (Year)"
        }
      ]
    }
  ]
}
```

- A paper with a `url` becomes a clickable link; leave `url` as `""` for
  plain text. `note` is optional.
- A category can have only papers, only quotes, or both.
- **Add a category** by appending another `{ "name": ..., "papers": [...],
  "quotes": [...] }` object. Reorder the array to reorder the page.
- `citation`, `note`, `text`, and `source` all accept inline HTML
  (`<i>`, `<b>`, `<a>`).

### JSON safety tip

JSON is strict: every string needs double quotes, **no trailing commas**,
and no comments. If the page shows an error after an edit, paste the file
into <https://jsonlint.com> — it points at the exact line.

---

## 3. Photos and journal icons

### Your hero photo (the big one at the top)

Replace `images/portrait.jpg` with your own photo (keep the same filename,
or update `profile.portrait` in `content.json`). It's shown as a large
rectangle, joelflynn.com-style.

To change how it looks, edit the `:root` block at the top of
[`css/style.css`](css/style.css):

| Variable | Effect |
| --- | --- |
| `--photo-max-width` | How wide the photo gets (default `440px`). |
| `--photo-aspect`    | `auto` keeps your photo's real shape. Set `3 / 2` for a wide landscape banner (it will crop to fill). |
| `--photo-radius`    | Corner rounding (`0` = sharp corners). |

### Journal icons next to papers (brunopellegrino.com)

Each paper can show a small thumbnail. Put a small image in `images/` and
set `"thumb": "images/that_image.png"` on the paper. Clicking it opens the
paper. With no `thumb`, a tidy **PDF** placeholder shows instead.

**Make a thumbnail from a PDF on macOS** (one line, no install):

```bash
sips -s format png -Z 400 files/your_paper.pdf --out images/your_paper_thumb.png
```

Then set `"thumb": "images/your_paper_thumb.png"` on that paper.

---

## 4. Preview locally

**Easiest:** double-click **`preview.command`**. It serves the site and
opens your browser at <http://localhost:8000>. Edit `content.json`, save,
refresh the browser to see changes. Press `Ctrl+C` or close the window to
stop.

> Why not just open `index.html`? The page loads `content.json` with
> `fetch()`, which browsers block for files opened directly off disk. The
> preview helper serves it over HTTP so everything works.

Prefer the terminal? From this folder: `python3 -m http.server 8000`.

---

## 5. Publish to the web (GitHub Pages)

Your site will live at **https://brandonscchan.github.io**. One-time
setup, then every future update is three commands.

### Step 1 — Create the repository

1. Go to <https://github.com/new> (sign in as **brandonscchan**).
2. **Repository name:** `brandonscchan.github.io` — exactly, all lowercase.
   (This special name is what makes the URL `brandonscchan.github.io`
   with no extra path.)
3. Set it to **Public** (required for free GitHub Pages).
4. Do **not** add a README, .gitignore, or license — this folder already
   has everything.
5. Click **Create repository**.

### Step 2 — Push this folder

Open Terminal and run these, one block at a time:

```bash
cd "/Users/brand/Library/Mobile Documents/com~apple~CloudDocs/Career/website"

git init
git branch -M main
git add -A
git commit -m "Launch website"
git remote add origin https://github.com/brandonscchan/brandonscchan.github.io.git
git push -u origin main
```

> **Password prompt?** GitHub no longer accepts your account password over
> HTTPS. When asked for a password, paste a **Personal Access Token**
> instead. Create one at <https://github.com/settings/tokens?type=beta>:
> *Generate new token → Repository access: Only select repositories →
> brandonscchan.github.io → Permissions: Contents = Read and write*.
> Copy the token and paste it as the password. (Your Mac's Keychain
> remembers it after the first time.)

### Step 3 — Turn on Pages

For a repo named `username.github.io`, Pages usually turns on by itself.
To confirm:

1. On GitHub, open the repo → **Settings** → **Pages**.
2. **Source:** *Deploy from a branch*. **Branch:** `main` · `/ (root)` → **Save**.
3. Wait ~30–60 seconds, then visit **https://brandonscchan.github.io**.

### Step 4 — (Optional) Custom domain

If you buy a domain (e.g. `brandonchan.com`):

1. **Settings → Pages → Custom domain** → enter it → **Save** (this adds a
   `CNAME` file to the repo).
2. At your registrar, add DNS records:
   - **Apex** (`brandonchan.com`): four `A` records →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - **`www`**: one `CNAME` record → `brandonscchan.github.io`.
3. Back on GitHub, tick **Enforce HTTPS** once the certificate is ready
   (~10 min).

---

## 6. Update the live site later

After the one-time setup, your whole workflow is:

```bash
cd "/Users/brand/Library/Mobile Documents/com~apple~CloudDocs/Career/website"
# ...edit content.json, drop PDFs into files/ or images/ ...
git add -A
git commit -m "Add new working paper"
git push
```

Refresh **https://brandonscchan.github.io** about 30–60 seconds later.

---

## 7. More tweaks (all in `css/style.css` `:root`)

- **Accent / link color** — `--link`.
- **Page width** — `--max-width`.
- **Fonts** — `--font-head` (headings) and `--font-body` (text). To swap
  fonts entirely, change these and update the Google Fonts `<link>` in the
  `<head>` of each `.html` file.
- **Thumbnail size** — `--thumb-width`.
- **Browser-tab icon (favicon)** — it's the Yale "Y" at
  `images/favicon.png` (with `images/apple-touch-icon.png` for phones). To
  change it, replace those two square PNGs. To make a square icon from any
  image on macOS:
  ```bash
  sips -c 394 394 images/source.png --out /tmp/sq.png          # center-crop square
  sips -Z 256 /tmp/sq.png --out images/favicon.png             # 256×256 tab icon
  sips -Z 180 /tmp/sq.png --out images/apple-touch-icon.png    # 180×180 phone icon
  ```
- **Remove the Data tab** — delete `data.html`, remove the `'data'` entry
  in the `items` array inside `js/site.js`, and delete the `"data"` key
  from `content.json`.
- **Analytics** — paste your Plausible / Google Analytics snippet into the
  `<head>` of each `.html` file.

---

## 8. License

Use and adapt freely. No attribution required.
