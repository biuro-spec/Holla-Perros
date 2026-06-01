# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server → http://localhost:5173/Hola-Perros/
npm run build      # Production build → dist/
npm run preview    # Preview production build
npm run lint       # ESLint
```

Port może być zajęty — Vite automatycznie wybiera kolejny (np. 5174).

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/`). Każdy push na `master` uruchamia build i deploy automatycznie.

Strona live: **https://biuro-spec.github.io/Hola-Perros/**

Repozytorium: `https://github.com/biuro-spec/Hola-Perros.git`

## Architektura

**React 19 + Vite 8 + HashRouter** — strona statyczna hostowana na GitHub Pages, dlatego routing oparty na hash (`#/blog`, `#/blog/:id`).

```
src/
  App.jsx              # HashRouter + trasy: /, /blog, /blog/:id, /regulamin
  index.css            # Wszystkie style globalne + media queries (breakpoint: 1024px, 480px)
  pages/
    Home.jsx           # Jedna długa strona: Hero, O mnie, Usługi, Cennik, Kontakt
    Blog.jsx           # Siatka postów bloga
    BlogPost.jsx       # Pojedynczy artykuł (dangerouslySetInnerHTML z blogPosts.js)
    Regulamin.jsx
  components/
    Navbar.jsx         # Fixed navbar, glassmorphism po scrollu, hamburger z animacją
    Footer.jsx
    FloatingActions.jsx  # WhatsApp + telefon + scroll-to-top (pojawia się po 100px)
  data/
    blogPosts.js       # 10 postów ze zoptymalizowanym SEO (Racibórz, fryzjer dla psów)
public/
  zdjecia/             # Zdjęcia główne (hero.jpg i screenshoty)
  zdjecia/blog/        # Zdjęcia blogowe (post1-10.png)
```

## Kluczowe decyzje techniczne

**Routing**: HashRouter zamiast BrowserRouter — GitHub Pages nie obsługuje server-side routing. Linki kotwicowe (`#omnie`, `#uslugi`) działają jako URL hash fragmenty; wildcard route `path="*"` renderuje Home.

**Obrazy**: Wszystkie zdjęcia muszą być w `public/zdjecia/`, nie w root `zdjecia/`. Root `zdjecia/` nie jest kopiowany do `dist/` podczas buildu.

**Animacje**: Framer Motion z `whileInView` — przy full-page screenshotach (np. Playwright bez scrollu) sekcje są niewidoczne (`opacity: 0`). Do testów wizualnych trzeba scrollować stronę przed screenshotem.

**Scroll detection**: `window.scrollY` — nie używać `document.documentElement.scrollTop` jako głównego źródła, bo `html { overflow-x: hidden }` psuje `window.scrollY`. Aktualnie brak tego CSS — scroll działa przez `window.scrollY`.

**Body glow efekty**: `body::before` i `body::after` mają `position: fixed` (nie `absolute`) — ważne, żeby nie rozciągały `body.scrollHeight` poza stopkę.

## Paleta i typografia

```css
--bg-color: #FCFBF8
--bg-color-alt: #F4F1ED
--gold: #B8922A
--pink: #E49FB3
--text-dark: #2D2825
--text-light: #7A7571
--border-color: #EBE5DF

Headings: Cormorant Garamond (serif, Google Fonts)
Body: DM Sans (sans-serif, Google Fonts)
```

## Dane kontaktowe (zakodowane w źródle)

- Telefon / WhatsApp: `+48 512 501 558`
- Adres: ul. Opawska 67, 47-400 Racibórz
- Instagram: `@holaperros_salon`
- Google Maps iframe: Opawska 67, Racibórz

## SEO

Artykuły blogowe (`src/data/blogPosts.js`) zawierają celowo wplecione słowa kluczowe: _fryzjer dla psów Racibórz_, _groomer Racibórz_, _strzyżenie psów Śląsk_, _hOla Perros_, _ul. Opawska 67_. Każdy post kończy się sekcją CTA z tymi frazami.
