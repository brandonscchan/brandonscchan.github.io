# Brandon S.C. Chan — Academic Website

Personal academic website for **Brandon S.C. Chan** (Pre-Doctoral Fellow in Economics, Yale University). All content lives in [`content.json`](content.json).

### Architecture & Design System

| Layer | Specification |
| ----- | ------------- |
| **Typography** | **Inter** (`cv02`, `cv03`, `cv04`, `cv11`) + **Newsreader** optical serif + **JetBrains Mono** tabular numerals |
| **Color Palette** | Apple P3 Warm Daylight (`#FCFCFA` / `#0052CC` Yale Cobalt) & OLED Midnight (`#070A12` / `#60A5FA` Sapphire) |
| **Hero Canvas** | 60fps coupled harmonic wave PDE rendered via smooth quadratic-spline topographic equipotential contours and curved geodesic transport arcs |
| **Editorial Layout** | Open 880px academic column with 3D-tilting miniature manuscript offprints, spring-animated Abstract/BibTeX drawers, and interactive field filtering |

---

## Quick Usage

1. **Edit content** → open [`content.json`](content.json), update text, and save.
2. **Preview locally** → double-click **`preview.command`** or run `python3 -m http.server 8000` and open <http://localhost:8000>.
3. **Publish** →
   ```bash
   git add -A && git commit -m "Update site" && git push
   ```

## File Structure

```
website/
├── content.json       ← Site data (bio, working papers, honours, data)
├── index.html         Research & home page
├── data.html          Datasets & replication files page
├── css/style.css      Styling & Apple/Google theme tokens
├── js/site.js         Content renderer, 3D offprints & topographic wave canvas
├── images/            Portrait & favicons
├── files/             CV & paper PDFs
├── preview.command    Local macOS preview launcher
└── .nojekyll          GitHub Pages static indicator
```

