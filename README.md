# Jordan Stables — Website

Marketing website for **Jordan Stables** — *Building a Partnership Between Horse & Rider.*
Riding lessons, clubs & programs, training, and horse camps.

> Previously this repo held a "Horse Haven" demo; it was replaced by the real Jordan
> Stables build (recoverable in git history before commit `e42a812`).

## Stack
- **Build:** Hand-authored static site (HTML/CSS/JS, no framework, no build step)
- **Design system:** "Equestrian Heritage" — Heritage Navy `#0A1F44` + Action Blue `#3A86FF`,
  cream `#FDFCFB` surfaces, **Libre Caslon Text** (display) + **Manrope** (body), soft corners,
  tonal layers (per the client `DESIGN.md`)
- **Source control:** GitHub — [`shizzoobies/boardinghorses`](https://github.com/shizzoobies/boardinghorses)
- **Hosting:** Cloudflare Pages (auto-deploy on push to `main`)

## Site map
| Page | File |
|------|------|
| Home | `index.html` |
| Lessons | `lessons.html` |
| Clubs & Programs | `clubs-programs.html` |
| Meet the Team | `meet-the-team.html` |
| Testimonials & FAQs | `testimonials-faqs.html` |
| Gallery (filter + lightbox) | `gallery.html` |
| Blog | `blog.html` |
| Contact (demo form) | `contact.html` |

## Project structure
```
public/                      ← the static site (deploy root)
  *.html                     ← the 8 pages
  assets/css/site.css        ← Equestrian Heritage design system
  assets/js/site.js          ← nav, reveals, gallery filter/lightbox, demo forms
  assets/img/                ← logos (navy/white/badge), real photos, gallery/
```

## Deploy (Cloudflare Pages)
Framework preset **None** · Build command **(empty)** · Output directory **`public`** · Branch `main`.

## Real details
Owner **Anysa Jordan** · 📞 (602) 535-9577 · ✉️ contact@jordanstables.com ·
IG/FB @jordanstablesaz · TikTok @jordan.stables · Horse Camp June 25–27.

## Before launch
- Wire the **contact form** + footer **newsletter** to a backend (Cloudflare Pages Functions / Formspree).
- Add a real **street address + embedded map** (only phone/email are public today).
- Confirm full **team roster** (only Anysa & Taylor are named); blog posts are sample content.
- Raw source assets live in the gitignored `Jordan Stables/` folder; processed copies are in `public/assets/`.
