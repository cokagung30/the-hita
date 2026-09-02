# Tri Hita – AI Agent Instructions

## Project Overview
Hospitality landing page for **The Hita**, a Bali boutique guest house with multiple locations (Uluwatu, Seminyak, Sri Krisna). Single-page marketing site with booking integration via swiftbook.io.

## Tech Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (uses `@import "tailwindcss"` in CSS, not v3 `@tailwind` directives)
- **Framer Motion 12** for all animations
- **Lucide React** for icons
- **Turbopack** as the bundler

## Commands
```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build (Turbopack)
npm run start    # Serve production build
```
No test runner is configured.

## Project Structure
```
src/
  app/
    _components/   # Page-scoped components (co-located with page.tsx)
    page.tsx       # "use client" – main page, all section logic here
    layout.tsx     # Server Component root layout (font, metadata)
    globals.css    # Tailwind v4 import + custom keyframes + utilities
  components/      # Shared components (Header, Footer)
  constants/       # Static data arrays (REST_ITEMS, etc.)
  models/          # TypeScript type definitions
public/
  images/          # Static images (.webp) + logo .svg + banner.webm
```

## Conventions

### File & Naming
- Files: `kebab-case.tsx` / `kebab-case.ts`
- Components: `PascalCase` named exports (no default exports for components)
- Type definitions: `type` keyword, `PascalCase` (e.g., `type Rest = { ... }`)
- Exported data constants: `SCREAMING_SNAKE_CASE` (e.g., `REST_ITEMS`)
- Local inline data in components: `camelCase` arrays

### Where to Put Things
| Content | Location |
|---|---|
| New page section components | `src/app/_components/` |
| Reusable UI components (Header, Footer) | `src/components/` |
| Static data / content arrays | `src/constants/constants.ts` |
| TypeScript types for data models | `src/models/` |

### Styling
- **Tailwind utility classes only** — no CSS Modules, no inline `style` props unless unavoidable
- **Arbitrary values** are common: `bg-[#3D2709]`, `min-w-[85vw]`, `from-[#2a1e14]/40`
- **Opacity modifiers**: `text-white/70`, `bg-white/95`
- Responsive via `sm:` / `md:` / `lg:` prefixes

### Animations (Framer Motion)
- Use `whileInView` + `viewport={{ once: false }}` for scroll-triggered animations
- Stagger list items with `delay: index * 0.15`
- Use `whileHover` / `whileTap` for interactive micro-animations
- Use `AnimatePresence` for mount/unmount transitions

### State & Data
- No external state manager — use React `useState` / `useRef` locally
- Reusable data lives in `src/constants/`; one-off section data can be hardcoded at the top of `page.tsx`
- Guard against SSR hydration mismatches with `isMounted` + `suppressHydrationWarning`
- Scroll listeners must use `{ passive: true }` and be wrapped in `requestAnimationFrame`

### Path Aliases
- `@/` → `src/` (configured in `tsconfig.json`)

## Key Patterns to Follow
- `src/app/page.tsx` is `"use client"` — keep it that way; add new sections here
- `src/app/layout.tsx` is a Server Component — do not add client-side logic
- Images: use `next/image` with `fill` + `sizes` prop for responsive images
- **All photos are `.webp`**; logos stay `.svg`. No JPEG/PNG/AVIF — new images follow this.
  Served without a `<picture>` fallback (WebP support is ~97%: Safari 14+ / iOS 14+).
- Hero video is `banner.webm` (VP9), served via `<source>` not `src`, so another
  format (e.g. MP4/H.264 for older Safari) can be added as one extra line.
- External booking links open via `window.open(url, '_blank')`
