# Horse Haven — Project Brief

> Working doc so any session can resume. Building a marketing website.

## Decisions locked
- **Business name:** Horse Haven
- **Focus:** Boarding + Lessons / Training
- **Site type:** Info + contact marketing site (no booking/payments/portal for v1)
- **Vibe:** Warm / family-friendly — bright, approachable, rounded shapes, welcoming to beginners & families
- **Design tool:** Google Stitch (MCP registered as `stitch`, healthy)
- **Stack:** Git + Cloudflare Pages, repo `shizzoobies/boardinghorses`
- **Hosting:** Cloudflare Pages, auto-deploy on push to `main`

## Pages
Home · Boarding · Lessons & Training · Gallery · About · Contact

## Workflow
1. Generate design in Stitch (prompt below) → 2. Review/iterate with client → 3. Build static site from approved design → 4. Push to GitHub → 5. Connect Cloudflare Pages → deploy.

## Stitch prompt to use (next session)
```
Design a warm, family-friendly marketing website for "Horse Haven", a horse stable
offering boarding and riding lessons/training. Bright and approachable look — soft
earthy/warm palette, rounded corners, friendly rounded sans-serif headings, plenty
of inviting photography of horses, riders, and the facility. Welcoming to beginners
and families.

Pages:
- Home: full-width hero with a horse/pasture photo, headline + subhead + primary CTA
  ("Book a tour" / "Contact us"), short intro, two feature cards linking to Boarding
  and Lessons, a testimonials strip, and a footer with contact info + map.
- Boarding: intro, stall vs pasture board options as cards, amenities list with
  icons, a simple pricing tiers table, photo gallery, CTA.
- Lessons & Training: program overview, lesson levels (beginner/intermediate/advanced),
  instructor bio cards with photos, what-to-expect section, scheduling/contact CTA.
- Gallery: responsive photo grid of facility and horses.
- About: story, mission, team, location with map.
- Contact: contact form (name, email, phone, message), hours, phone, email, address,
  embedded map.

Consistent warm/family-friendly design system across all pages: shared header nav
(logo "Horse Haven" + links: Home, Boarding, Lessons, Gallery, About, Contact) and
shared footer. Mobile-responsive.
```

## Status
- [x] Repo connected + foundation files (.gitignore, README, this brief) — local, not yet pushed
- [ ] Stitch tools loaded (requires Claude Code restart)
- [ ] Design generated in Stitch
- [ ] Design approved
- [ ] Site built
- [ ] Pushed to GitHub
- [ ] Cloudflare Pages connected & deployed
