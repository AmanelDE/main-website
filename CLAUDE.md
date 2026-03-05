# Amanel – Website & Brand Documentation

## Project Overview

**Amanel** is a specialty retail store based in Frankfurt, Germany, offering natural and sustainable products for babies and young children. The store is located at Sigmund-Freud-Straße 56–58, 60435 Frankfurt, and operates in partnership with Zwergperten Frankfurt.

**Tagline:** *Natur für Baby und Kind* (Nature for Baby and Child)

**Target audience:** Young, affluent parents who are expecting or have recently had a child. They value quality, sustainability, and personal service over mass-market convenience.

-----

## Language

> **The entire website is written in German (Deutsch).**

All copy, navigation labels, section headings, button text, and metadata must remain in German. Do not translate any user-facing content to English. The `lang` attribute on the `<html>` element is set to `"de"`.

-----

## Brand Identity

### Tone of Voice

- Warm, personal, and trustworthy — the brand speaks directly to parents using the informal **"ihr/euch"** (not the formal "Sie")
- Professional but never cold; knowledgeable but never condescending
- Emphasis on natural materials, personal consultation, and the emotional significance of early childhood
- No emojis anywhere in the UI

### Brand Values

1. **Natural materials** — Every product is carefully sourced for safety and sustainability
1. **Personal consultation** — Appointments are encouraged; the store prides itself on taking time for each customer
1. **Local roots** — Firmly anchored in Frankfurt, community-oriented
1. **Quality over quantity** — A curated assortment rather than a broad catalogue

-----

## Color Palette

All colors are defined as CSS custom properties on `:root`.

|Token         |Hex      |Usage                                             |
|--------------|---------|--------------------------------------------------|
|`--rose`      |`#df4d69`|Primary brand color, CTAs, highlights             |
|`--rose-dark` |`#c63055`|Hover state for rose elements                     |
|`--rose-mid`  |`#f58a8e`|Softer accents                                    |
|`--rose-soft` |`#fac0ba`|Backgrounds, subtle tints                         |
|`--rose-pale` |`#fde8e4`|Card backgrounds, icon containers                 |
|`--teal`      |`#0e6d83`|Secondary brand color, Beratung section background|
|`--teal-mid`  |`#afe3e0`|Teal accents, labels on dark teal backgrounds     |
|`--teal-soft` |`#d7f1f0`|Light teal backgrounds                            |
|`--cream`     |`#fdf8f5`|Main page background                              |
|`--warm-white`|`#fffaf8`|Alternate section background                      |
|`--text-dark` |`#2c2220`|Primary text                                      |
|`--text-mid`  |`#6b4f4a`|Secondary / body text                             |
|`--text-light`|`#a07c78`|Captions, meta labels                             |

**Footer background:** `#fdf0ec` (light warm cream) — kept bright and friendly, consistent with the overall light aesthetic. Note: `--text-light` (`#a07c78`) fails WCAG AA contrast on this background (2.54:1). The footer bottom bar (copyright, Impressum, Datenschutz links) uses `--text-mid` instead.

**Partner accent (Zwergperten):** `#3ab54a` — Zwergperten's own brand green, used exclusively for their name and tagline in the partner section.

-----

## Typography

|Role              |Font                |Weights         |Notes                                                                                                                    |
|------------------|--------------------|----------------|-------------------------------------------------------------------------------------------------------------------------|
|Display / Headings|**Playfair Display**|400, 600, italic|Serif, warm and editorial. Used for all `h1`–`h3`, the footer logo text, and the partner name.                           |
|Body / UI         |**DM Sans**         |300, 400, 500   |Clean, modern sans-serif. Used for all body copy, navigation, labels, and buttons.                                       |
|Partner logo      |**Lilita One**      |400             |Chunky display font matching Zwergperten's own brand identity. Used only for the Zwergperten name in the partner section.|

All fonts are **self-hosted** as woff2 files in `/fonts/`. All 7 variants are preloaded via `<link rel="preload">` in `_partials/head.html` to prevent render-blocking font discovery.

-----

## Project Structure & Development Workflow

### Directory Layout

```
_pages/          ← PAGE SOURCES — edit these
  index.html     ← Main landing page
  imprint.html   ← Impressum
  privacy-policy.html
  jobs.html
  spielzeug.html
  kinderwagen.html
  tragen.html
  kleidung.html
  kindersitze.html
_partials/       ← SHARED COMPONENTS — edit these
  head.html      ← Generic <head> content (meta tags, CSS, favicon) — edit this
  nav.html       ← Navigation (Single Source of Truth)
  footer.html    ← Footer (Single Source of Truth)
css/
  main.css       ← All styles — edit this
js/
  main.js        ← Scroll-reveal JS — edit this
fonts/           ← Self-hosted woff2 font files (do not edit)
images/          ← Source images (use AVIF format)

build.js         ← Build script (node build.js)

dist/            ← BUILD OUTPUT — do not edit directly
  index.html     ← Served at /
  imprint/       ← Served at /imprint
  privacy-policy/← Served at /privacy-policy
  jobs/          ← Served at /jobs
  css/
  js/
  images/
```

### How to Make Changes

| Task | Edit | Then run |
|------|------|----------|
| Page content | `_pages/<page>.html` | `node build.js` |
| Generic head content (CSS, favicon, meta tags) | `_partials/head.html` | `node build.js` |
| Navigation or footer | `_partials/nav.html` or `_partials/footer.html` | `node build.js` |
| Styles | `css/main.css` | `node build.js` |
| JavaScript | `js/main.js` | `node build.js` |
| Images | Replace file in `images/` | `node build.js` |

**Never edit files inside `dist/` directly** — they are overwritten on every build.

### Adding a New Page

1. Create `_pages/new-page.html` using this template:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  {{head}}
  <title>[Seitentitel] – Amanel</title>
  <meta name="description" content="[Beschreibung]" />
</head>
<body>

{{nav}}

<main class="page-content">
  <h1>[Seitenüberschrift]</h1>
  <p>[Inhalt]</p>
</main>

{{footer}}

<script src="/js/main.js" defer></script>
</body>
</html>
```

2. Add an entry to `build.js` in the `pages` array:

```js
{ src: '_pages/new-page.html', out: 'dist/new-page/index.html' },
```

3. Run `node build.js`.

The page is then available at `/new-page` after deployment.

### Deployment

Deploy the entire contents of `dist/` to the web server. The folder is self-contained — no build step needed on the server.

-----

## Page Structure

The website has a **landing page** plus separate **subpages**:

### Landing page (`_pages/index.html`) — sections in order:

1. **Navigation (fixed)** — Logo left, nav links center-right, "Termin buchen" CTA pill
1. **Hero** — Two-column: headline + trust indicators left; animated logo right on rose-tinted background
1. **Values** (`#sortiment`) — Three cards: Spielzeug, Tragen, Kleidung
1. **Sortiment / Categories** — Asymmetric bento grid with five product category cards
1. **Beratung** (`#beratung`) — Full-width teal section: consultation pitch left, opening hours + contact info right
1. **Partner** (`#partner`) — Zwergperten Frankfurt partnership section with skyline image
1. **Footer** (`#kontakt`) — Four-column light cream footer with links, contact details, Impressum, Datenschutz

### Subpages (`.page-content` layout):

- `/imprint` — Impressum (§ 5 TMG)
- `/privacy-policy` — Datenschutzerklärung (DSGVO)
- `/jobs` — Karriere

Subpages share the same nav and footer as the landing page. Nav links on subpages use `/#section` (e.g. `/#sortiment`) to navigate back to the landing page and scroll to the anchor.

-----

## Key UI Decisions

- **No emojis** — All icons are inline SVGs (Feather icon style, `stroke-width: 1.8`)
- **Logo rendering** — The Amanel logo (`logo.avif`) has a black background that is removed using `mix-blend-mode: multiply` on a light background
- **Zwergperten skyline** — Rendered in black using `filter: grayscale(1) brightness(0)` on a warm cream card background
- **Scroll reveal** — All secondary sections use an `IntersectionObserver`-based `.reveal` / `.visible` class system with staggered delays
- **Animations** — Hero logo floats (`float` keyframes), nav fades in from top (`fadeDown`), sections animate up on scroll (`fadeUp`). All motion is CSS-only
- **Wave dividers** — SVG wave shapes separate the values section from the hero, and the beratung section from the partner section
- **Responsive breakpoints** — Single-column layout below 820px; two-column adjustments at 1100px

-----

## Appointment Booking

All primary CTAs link to the external booking tool:

```
https://www.terminland.de/amanel
```

This is the main conversion goal of the website.

-----

## Contact Information

```
Amanel und Zwergperten Frankfurt
Sigmund-Freud-Straße 56–58
60435 Frankfurt

Tel:   069 36604008
Email: info@amanel.de
```

**Opening hours:**

- Monday – Friday: 09:00 – 14:00
- Saturday: 09:00 – 14:00
- Outside hours: by appointment only

-----

## Partner: Zwergperten Frankfurt

Zwergperten is a partner brand specialising in child car seats. They share the Frankfurt location with Amanel.

- **Website:** [zwergperten-shop.de/stores/zwergperten-frankfurt](https://www.zwergperten-shop.de/stores/zwergperten-frankfurt)
- **Email:** frankfurt@zwergperten.de
- **Brand color:** `#3ab54a` (green)
- **Tagline:** *Unterwegs schützen, wen wir lieben*
- In the UI, the Zwergperten name is rendered in **Lilita One** (uppercase, green) to match their own brand identity

-----

## Legal Pages

The following pages are linked in the footer and must exist:

|Page                |Path             |
|--------------------|-----------------|
|Impressum           |`/imprint`       |
|Datenschutzerklärung|`/privacy-policy`|
|Karriere            |`/jobs`          |
