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
    logo.jpg         ← generated logo (also used as favicon)
    img/             ← page imagery (downloaded locally, self-contained)
```
Pages are plain HTML styled with Tailwind (via CDN) + Google Fonts. No build step required.

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
- Tailwind is loaded from the CDN (fine for now; for production, compile with the Tailwind CLI to drop the runtime warning and shrink payload).
- Replace placeholder copy, contact details, prices, and AI-generated imagery with real content.
- `Privacy Policy` / `Terms of Service` footer links are placeholders (`#`).
