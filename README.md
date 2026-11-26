# Brandon S.C. Chan — Personal Website

Static academic homepage for **Brandon S.C. Chan** (Department of Economics, Yale University). All displayed content is driven by [`content.json`](content.json).

## Usage

- **Edit content:** update [`content.json`](content.json).
- **Preview locally:** `python3 -m http.server 8000` and open <http://localhost:8000>.
- **Publish:** `git add -A && git commit -m "Update site" && git push`

## Structure

```text
.
├── content.json       Site copy, links, and paper metadata
├── index.html         Main page markup and citation/JSON-LD metadata
├── css/style.css      Editorial layout and typography styles
├── js/site.js         Client-side renderer for content.json
├── images/            Portrait (portrait.jpg) and BC favicons
├── files/cv.pdf       Curriculum Vitae
├── papers/            Paper PDFs and canonical metadata landing pages
├── llms.txt           Concise LLM summary index
├── llms-full.txt      Technical summary for AI assistants
├── robots.txt         Crawler directives
├── sitemap.xml        XML sitemap
└── .nojekyll          GitHub Pages static-site marker
```
