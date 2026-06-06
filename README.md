# Horse Haven — Stable Website

Warm, family-friendly marketing website for **Horse Haven**, a horse stable offering **boarding** and **lessons / training**.

## Stack
- **Design:** Google Stitch (generate UI), iterated with the client
- **Build:** Static site (HTML/CSS/JS or Astro — TBD from design output)
- **Source control:** GitHub — [`shizzoobies/boardinghorses`](https://github.com/shizzoobies/boardinghorses)
- **Hosting:** Cloudflare Pages (auto-deploy on push to `main`)

## Site map
| Page | Purpose |
|------|---------|
| Home | Hero, value prop, links to boarding & lessons, primary CTA |
| Boarding | Stall/pasture options, amenities, pricing tiers, photos |
| Lessons & Training | Programs, levels, instructor bios, scheduling info |
| Gallery | Facility & horse photos |
| About | Story, team, location |
| Contact | Form, map, hours, phone/email |

## Project structure
```
public/              ← the static site (deploy root)
  index.html         ← Home
  boarding.html
  lessons.html
  gallery.html
  about.html
  contact.html
  assets/
    css/site.css     ← hand-authored design system ("Editorial Equestrian")
    js/site.js       ← header state, scroll reveals, mobile nav, gallery filter
    logo.jpg         ← generated logo (also used as favicon)
    img/             ← page imagery (downloaded locally, self-contained)
```
Hand-authored HTML + CSS (no framework, no build step). Type: **Fraunces** (display) +
**Hanken Grotesk** (body) via Google Fonts. Design language: warm ivory paper, espresso
ink, muted-sage accent; hairline rules and whitespace instead of cards; full-bleed imagery.

## Status
- [x] Repo connected, foundation files
- [x] Design generated in Stitch (6 pages + logo)
- [x] Images localized, navigation wired, favicon added
- [ ] Design reviewed / approved by client
- [ ] Cloudflare Pages connected & deployed

## Deploy (Cloudflare Pages)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Pick the `boardinghorses` repo, branch `main`
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `public`
4. Save & Deploy. Every push to `main` auto-deploys.

## Notes / future polish
- Replace placeholder copy, stats (40 acres, 15+ years), prices, hours, contact details, and AI-generated imagery with real content.
- The **contact form** is not yet wired to a backend — connect it to Cloudflare Pages Functions or a service like Formspree before launch (see the comment in `contact.html`).
- The contact-page **map** is a styled placeholder linking out — swap in a real embedded map for the actual address.
