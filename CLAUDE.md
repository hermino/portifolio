# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory.

```bash
# Development servers
npm start                    # Both apps concurrently (landpage :4200, admin :4201)
npm run start:landpage       # Port 4200
npm run start:admin          # Port 4201

# Production builds
npm run build                # Both apps
npm run build:landpage       # base href "/"
npm run build:admin          # base href "/admin/"
npm run build:gh-pages       # GitHub Pages, base href "/hermino.github.io/"

# Tests
npm test                     # Vitest via @angular/build:unit-test
```

No linters are configured yet.

## Architecture

This is an **Angular 21 multi-project workspace** with two standalone apps sharing code via a path alias.

```
frontend/
├── src/app/                 # Shared code (@shared/* alias points here)
│   ├── services/            # SupabaseService, AuthService, ThemeService, ToastService
│   │   └── api/             # SkillApiService, ExperienceApiService, ProjectApiService, ContactApiService
│   ├── guards/              # authGuard (functional, redirects to /admin/login)
│   ├── models/              # Skill, Experience, Project, ContactMessage interfaces
│   └── directives/          # scroll-reveal.directive
├── src/environments/        # Supabase URL + anon key (same for dev/prod)
├── projects/landpage/       # Public portfolio (port 4200)
└── projects/admin/          # Admin CRUD panel (port 4201)
```

### Key conventions

- **Standalone components only** — no NgModules
- **Angular Signals** for reactive state (not RxJS Subjects)
- **OnPush change detection** on all components
- **`@shared/*`** path alias for importing shared services/models/guards from either project
- **Functional guards** (`authGuard`)

### Backend: Supabase

All data lives in a hosted Supabase project (PostgreSQL). No custom API server.

- Tables: `projects`, `skills`, `experiences`, `contact_messages`
- Auth: email/password via Supabase Auth
- Row Level Security: public read on portfolio tables; authenticated-only write; public insert + admin-only read on `contact_messages`
- Schema + seed: `supabase/migrations/`
- Local Supabase dev: `supabase/config.toml` (API :54321, DB :54322, Studio :54323)

### Landpage (`projects/landpage`)

Single-page portfolio. Route: `/` → `HomeComponent`, which composes section components (`about`, `projects`, `experiences`, `skills`, `contacts`, `header`, `footer`, `theme-toggle`). Uses `scroll-reveal.directive` for intersection-observer animations.

### Admin (`projects/admin`)

Protected CRUD panel. Routes:
- `/login` — `AdminLoginComponent`
- `/admin` (auth-guarded) — `AdminComponent` (sidebar layout) with children: `experiences`, `projects`, `skills`, `contacts`

### Styling

- Global styles: `src/styles.scss`
- Component styles: per-component `.scss` files
- Design tokens and BEM class naming (see `angular-portfolio-design` skill for full conventions)
- Fonts: Barlow Condensed (headings), DM Mono (body/code) from Google Fonts
- Icons: Phosphor Icons from CDN
