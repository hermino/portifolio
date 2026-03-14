---
name: Angular Portfolio Design
description: Use this skill when creating, modifying, or reviewing any UI component, page, or style in this Angular portfolio project. Enforces SCSS + BEM, Angular 21 standalone/Signals conventions, OnPush change detection, and the project's design token system. Activate for tasks involving component creation, styling, theming, layout, responsive design, or admin panel UI.
version: 1.0.0
---

# Angular Portfolio Design System

This skill governs all frontend work in this repository. Every rule here is derived directly from the existing codebase patterns — consistency with what already exists is the primary goal.

---

## 1. Non-Negotiable Rules

These are hard constraints. Never break them:

1. **SCSS only** — no plain CSS files, no `style=""` inline styles, no `styles: [...]` in `@Component`
2. **BEM only** — every class name follows Block__Element--Modifier; no utility classes, no Tailwind, no arbitrary class names
3. **Standalone components** — never use NgModules; all components use `standalone: true`
4. **`inject()` for DI** — never use constructor injection; always use `inject()` at property level
5. **`OnPush` required** — every new component must declare `changeDetection: ChangeDetectionStrategy.OnPush`
6. **Signals for state** — use `signal()`, `computed()`, `effect()`, `input()`, `output()`, `model()` — never `BehaviorSubject`, never `@Input()`/`@Output()` in new components
7. **CSS custom properties for all values** — never hardcode colors, font families, or durations; always use `var(--token-name)`

---

## 2. Design Tokens

All tokens are defined in `frontend/src/styles.scss`. Always reference these — never use raw values.

### Color Surfaces
```scss
var(--color-bg)           // Deepest background — #09090C dark / #F6F4EF light
var(--color-bg-subtle)    // Cards, sidebars — #0F0F14 dark / #EDEAE3 light
var(--color-bg-muted)     // Subtle sections — #16161E dark / #E4E1D9 light
var(--color-bg-emphasis)  // Highlighted areas — #1C1C26 dark / #D8D5CC light
```

### Color Text
```scss
var(--color-text)          // Primary text — #E8E4D9 dark / #0D0D10 light
var(--color-text-muted)    // Secondary text, labels — #9898A8 dark / #4C4C5A light
var(--color-text-subtle)   // Disabled, metadata — #50505E dark / #9898A8 light
```

### Color Accent
```scss
var(--color-accent)        // #CAFF4D dark / #5A8A00 light — lime-green primary accent
var(--color-accent-dim)    // 10% accent — backgrounds, active states
var(--color-accent-border) // 20% accent — borders on accent elements
var(--color-accent-glow)   // 5% accent — ambient glow effects
```

### Color Borders
```scss
var(--color-border)        // Subtle dividers — #1E1E28 dark / #D8D5CC light
var(--color-border-strong) // Input borders, prominent dividers — #28283A dark / #C4C0B6 light
```

### Typography
```scss
var(--font-display) // 'Barlow Condensed', sans-serif — headings, titles, eyebrows
var(--font-mono)    // 'DM Mono', monospace — body, labels, code, UI text
```

### Layout
```scss
var(--max-width)      // 1340px — outer container cap
var(--content-width)  // 90vw — inner content width
var(--sidebar-width)  // 320px — right sidebar
```

### Z-Index Scale
```scss
var(--z-nav)    // 200 — sticky navigation
var(--z-toggle) // 300 — theme toggle, modals
```

### Motion
```scss
/* Durations */
var(--duration-fast)   // 0.22s — micro-interactions, hover
var(--duration-base)   // 0.25s — standard transitions
var(--duration-medium) // 0.35s — panel reveals, dropdowns
var(--duration-slow)   // 0.7s — page-level, scroll animations

/* Easings */
var(--ease)     // cubic-bezier(0.25, 0.46, 0.45, 0.94) — standard
var(--ease-out) // cubic-bezier(0.16, 1, 0.3, 1) — spring-like exits
```

---

## 3. Typography Rules

### Type Scale

| Role | Font | Size | Weight | Letter-spacing | Line-height |
|------|------|------|--------|----------------|-------------|
| Hero H1 | `--font-display` | `clamp(4.5rem, 11vw, 10rem)` | 800 | `-0.03em` | 0.88 |
| Section H2 | `--font-display` | `clamp(2rem, 3.5vw, 3rem)` | 800 | `0.02em` | 0.95 |
| Card H3 | `--font-display` | `1.05rem–1.1rem` | 700 | `-0.025em` | — |
| Admin title | `--font-display` | `1.4rem–1.8rem` | 800 | `-0.02em` | — |
| Eyebrow | `--font-mono` | `0.62rem–0.68rem` | 500 | `0.2em` | — |
| Body | `--font-mono` | `14px base` | 300 | — | 1.75 |
| UI label | `--font-mono` | `0.62rem–0.65rem` | 400 | `0.1em` | — |
| Metadata | `--font-mono` | `0.6rem` | 400 | `0.04em` | — |

### Rules
- **Display font** (`--font-display`) → headings only; use `font-weight: 800` for prominence
- **Mono font** (`--font-mono`) → everything else: body, labels, buttons, inputs, nav, admin UI
- **Eyebrow text** (section labels above headings) → always `text-transform: uppercase`, `letter-spacing: 0.2em`, `color: var(--color-accent)`
- **UI labels** (form labels, nav links, buttons) → always `text-transform: uppercase`, `letter-spacing: 0.1em`
- **Never** use `font-size` larger than `1rem` for body text in `--font-mono`

---

## 4. Spacing Scale

There is no strict step scale — use multiples of `0.25rem` for sub-`1rem` values and multiples of `0.5rem` above `1rem`. These are the canonical values used in the codebase:

```
0.2rem   — icon gap, tight badge padding
0.25rem  — minimum internal spacing
0.3rem   — compact row gap
0.4rem   — label-to-input gap, icon-to-text
0.5rem   — default flex gap between siblings
0.55rem  — button vertical padding
0.6rem   — input vertical padding
0.75rem  — small button padding-x, list item gap
1rem     — base unit, section padding
1.25rem  — form grid gap
1.5rem   — card gap, form internal spacing
2rem     — sidebar padding, section header gap
2.5rem   — admin content padding
3rem     — large section gap
5rem     — hero to content gap
7rem     — between major sections (desktop)
```

**Patterns:**
- Component internal padding: `1rem–2rem`
- Between sibling elements: `0.4rem–0.75rem`
- Between sections: `3rem–7rem`
- Button padding: `0.55rem` vertical / `0.75rem–1.2rem` horizontal

---

## 5. BEM Methodology

### Naming Convention
```
.block              // Component root
.block__element     // Part of the component
.block--modifier    // Variation of block
.block__element--modifier  // Variation of element
```

### Rules
- **One block per component** — the component's host element class = block name
- **Double underscore** `__` for elements, **double hyphen** `--` for modifiers
- **No nesting blocks** — `.card__footer` is correct; `.card__footer__button` is not (create a new block instead)
- **State modifiers** via `[class.block--state]="signal()"` in templates
- **Never** use generic names like `.wrapper`, `.container`, `.item` alone — always namespace under a block

### Established Block Names (do not rename)
```
Public UI:   site-nav, site-hero, section-header, tech-badge, btn,
             about, timeline, skills, skills-grid, project, project-grid,
             experience, contacts, footer
Admin UI:    admin, admin-page, admin-btn, admin-form, admin-field,
             admin-list, admin-toast, login-wrapper, login-card
```

### SCSS File Structure
```scss
// Component SCSS file pattern
.block {
  // Block-level styles

  &__element {
    // Element styles

    &--modifier {
      // Modifier on element
    }
  }

  &--modifier {
    // Modifier on block
  }
}
```

---

## 6. Angular 21 Component Conventions

### Component Anatomy
```typescript
import { Component, ChangeDetectionStrategy, inject, signal, computed, input, output, model } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [/* only what's needed */],
  templateUrl: './my-component.component.html',  // admin
  // templateUrl: './my-component.html',          // public
  styleUrl: './my-component.component.scss',      // admin
  // styleUrl: './my-component.scss',             // public
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  // 1. Injected services
  private service = inject(MyService);
  protected toast = inject(ToastService);

  // 2. Inputs (replaces @Input())
  readonly title = input<string>('');
  readonly items = input.required<Item[]>();

  // 3. Outputs (replaces @Output())
  readonly selected = output<Item>();

  // 4. Two-way bindings (replaces @Input + @Output pair)
  readonly value = model<string>('');

  // 5. Internal state
  readonly loading = signal(false);
  readonly data = signal<Item[]>([]);

  // 6. Derived state
  readonly count = computed(() => this.data().length);
}
```

### Signals API — When to Use What

| API | Use for | Example |
|-----|---------|---------|
| `signal()` | Mutable local state | `loading = signal(false)` |
| `computed()` | Values derived from other signals | `isAuth = computed(() => !!session())` |
| `effect()` | Side effects reacting to signals | DOM attrs, localStorage, analytics |
| `input()` | Component inputs from parent | `title = input<string>('')` |
| `input.required()` | Required inputs | `items = input.required<Item[]>()` |
| `output()` | Component events to parent | `selected = output<Item>()` |
| `model()` | Two-way bound values | `value = model<string>('')` |

### Dependency Injection
```typescript
// ✅ Correct
private service = inject(MyService);
protected toast = inject(ToastService);
readonly auth = inject(AuthService);

// ❌ Wrong
constructor(private service: MyService) {}
```

### `@defer` — Deferred Loading
Use for below-the-fold content and heavy components. Pattern from this project:
```html
@defer (on viewport) {
  <app-heavy-section />
} @placeholder {
  <div></div>
}
```
Always pair with `@placeholder`. Use `on viewport` for scroll-driven content, `on interaction` for user-triggered content.

### Control Flow Syntax
```html
<!-- Loops -->
@for (item of items(); track item.id) {
  <div class="block__element">{{ item.name }}</div>
}

<!-- Conditionals -->
@if (loading()) {
  <span>Loading...</span>
} @else if (error()) {
  <span class="block__error">{{ error() }}</span>
} @else {
  <div class="block__content">...</div>
}

<!-- Switch -->
@switch (status()) {
  @case ('active') { <span class="badge badge--active">Active</span> }
  @case ('inactive') { <span class="badge badge--inactive">Inactive</span> }
  @default { <span>Unknown</span> }
}
```

**Never use** `*ngIf`, `*ngFor`, `*ngSwitch` — always use the `@` control flow syntax.

### Reactive Forms (Admin only)
```typescript
private fb = inject(FormBuilder);

form = this.fb.group({
  name: ['', Validators.required],
  category: ['Hard skills', Validators.required],
  displayOrder: [0],
});

save(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.toast.warning('Fill in all required fields.');
    return;
  }
  const v = this.form.value;
  // proceed
}
```

Template-driven forms (`[(ngModel)]`) are acceptable only for simple standalone forms like the login page.

### Service Pattern
```typescript
// API service — always return Observable
@Injectable({ providedIn: 'root' })
export class ThingApiService {
  private db = inject(SupabaseService).client;

  getAll(): Observable<Thing[]> {
    return from(this.db.from('things').select('*').order('display_order')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Row[]).map(toModel);
      })
    );
  }
}

// Component consumes Observable, stores in signal
this.service.getAll().subscribe({
  next: data => this.items.set(data),
  error: () => this.toast.error('Failed to load.'),
});
```

---

## 7. File Naming Conventions

### Public Components (portfolio-facing)
```
components/my-section/
  my-section.ts          // NOT my-section.component.ts
  my-section.html
  my-section.scss
```

### Admin Components
```
admin/my-admin-section/
  my-admin-section.component.ts
  my-admin-section.component.html
  my-admin-section.component.scss
```

### Services
```
services/my-thing.service.ts         // all services
services/api/my-thing-api.service.ts // API-specific services
```

### Models
```
models/my-thing.model.ts

// Pattern inside:
export interface MyThing { id: string; name: string; }
export type CreateMyThing = Omit<MyThing, 'id'>;
export type UpdateMyThing = Omit<MyThing, 'id'>;
```

### Guards
```
guards/my-guard.guard.ts  // functional guard with CanActivateFn
```

---

## 8. SCSS Authoring Rules

### Component Files
- One `.scss` file per component — never share SCSS between components except via `@use`
- Use `@use '../admin-shared' as *` to access shared admin mixins/classes
- Never use `@import` (deprecated) — use `@use`

### Nesting
```scss
// ✅ Correct — BEM nesting via &
.admin-form {
  padding: 2rem;

  &__title {
    font-family: var(--font-display);
  }

  &--compact {
    padding: 1rem;
  }
}

// ❌ Wrong — arbitrary nesting
.admin-form {
  .title { ... }       // breaks BEM
  h3 { ... }           // element selector
  div { ... }          // element selector
}
```

Element selectors are allowed **only** inside `input`, `textarea`, `select`, `button` when scoped to a BEM block.

### Transitions
```scss
// Always use tokens
transition: color var(--duration-fast) var(--ease);
transition: border-color var(--duration-base);
transition: opacity var(--duration-base) var(--ease);

// Never hardcode
transition: color 0.2s ease; // ❌
```

### Input / Form Styling
Always override browser defaults for inputs:
```scss
input, textarea, select {
  background: var(--color-bg);
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.6rem 0.75rem;
  outline: none;
  appearance: none;

  &:focus { border-color: var(--color-accent); }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 100px var(--color-bg) inset;
    -webkit-text-fill-color: var(--color-text);
    caret-color: var(--color-text);
  }
}
```

### Flat Design
- **No `border-radius`** on structural elements (cards, forms, panels) — this project uses sharp corners
- `border-radius` is allowed only on small decorative/pill elements if explicitly required
- No `box-shadow` for depth — use `border: 1px solid var(--color-border)` instead

---

## 9. Responsive Patterns

### Breakpoints
```scss
// Primary — tablet/mobile layout collapse
@media (max-width: 960px) { ... }

// Small mobile
@media (max-width: 540px) { ... }
```

### Layout Collapse Pattern (960px)
```scss
// Desktop: two-column grid
.section {
  display: grid;
  grid-template-columns: 1fr var(--sidebar-width);
}

// Mobile: single column
@media (max-width: 960px) {
  .section {
    grid-template-columns: 1fr;
  }
}
```

### Admin Panel — Not Responsive
The admin panel (`/admin`) is desktop-only. No mobile breakpoints needed for admin components.

---

## 10. Icons

This project uses **Phosphor Icons** exclusively, always with the `ph-thin` weight:
```html
<i class="ph-thin ph-{icon-name}" aria-hidden="true"></i>
```

Always add `aria-hidden="true"` — icons are decorative. Text label must accompany every icon. Never use icons alone without visible text (unless in a button with an `aria-label`).

Common icons used in this project:
```
ph-arrow-left, ph-arrow-right, ph-arrow-up-right
ph-briefcase, ph-folder-open, ph-wrench, ph-chat-dots
ph-plus, ph-pencil-simple, ph-trash, ph-floppy-disk, ph-x
ph-check, ph-check-circle, ph-warning-circle
ph-sign-out, ph-shield-check
ph-github-logo, ph-globe, ph-envelope, ph-download-simple
```

---

## 11. Theming

The theme (`dark` / `light`) is applied via `data-theme` attribute on `<html>`:
```typescript
// ThemeService sets this via effect()
document.documentElement.setAttribute('data-theme', theme());
```

When adding new tokens that differ between themes, add them to **both** theme blocks in `styles.scss`:
```scss
:root, [data-theme="dark"] {
  --my-new-token: #value-dark;
}
[data-theme="light"] {
  --my-new-token: #value-light;
}
```

Never add theme-specific styles inside component SCSS — always use tokens.

---

## 12. Accessibility

- **All interactive elements** must be keyboard accessible (`tabindex`, `:focus-visible`)
- **Icons** always `aria-hidden="true"`, never alone without label text
- **Buttons with only icons** need `aria-label`
- **Forms** must associate `<label>` with `<input>` via `for`/`id` or wrapping
- **Skip link** (`<a class="skip-link" href="#main-content">`) exists in root — keep it
- **`.sr-only`** utility class exists in `styles.scss` — use for screen-reader-only text
- **Focus trap** for modals/overlays — see `Header` component pattern

---

## 13. Quick Reference — Admin Panel Blocks

These shared classes live in `admin-shared.scss`. Use them; don't duplicate:

```html
<!-- Page wrapper -->
<div class="admin-page">
  <div class="admin-page__header">
    <h1 class="admin-page__title"><i class="ph-thin ph-icon" aria-hidden="true"></i> Title</h1>
    <button class="admin-btn admin-btn--primary">
      <i class="ph-thin ph-plus" aria-hidden="true"></i> Add
    </button>
  </div>

  <!-- Form -->
  <form class="admin-form">
    <h3 class="admin-form__title">New Item</h3>
    <div class="admin-form__grid">
      <div class="admin-field">
        <label>Name <span class="admin-field__required">*</span> <span class="admin-field__hint">hint</span></label>
        <input formControlName="name" />
        <span class="admin-field__error">Required</span>
      </div>
      <div class="admin-field admin-field--full"><!-- spans both columns --></div>
    </div>
    <div class="admin-form__actions">
      <button type="submit" class="admin-btn admin-btn--primary">
        <i class="ph-thin ph-floppy-disk" aria-hidden="true"></i> Save
      </button>
      <button type="button" class="admin-btn">
        <i class="ph-thin ph-x" aria-hidden="true"></i> Cancel
      </button>
    </div>
  </form>

  <!-- List -->
  <div class="admin-list">
    @for (item of items(); track item.id) {
      <div class="admin-list__item">
        <div class="admin-list__info">
          <strong>{{ item.name }}</strong>
          <span>{{ item.subtitle }}</span>
          <span class="admin-list__meta">Meta info</span>
        </div>
        <div class="admin-list__actions">
          <button class="admin-btn admin-btn--sm">
            <i class="ph-thin ph-pencil-simple" aria-hidden="true"></i> Edit
          </button>
          <button class="admin-btn admin-btn--sm admin-btn--danger">
            <i class="ph-thin ph-trash" aria-hidden="true"></i> Delete
          </button>
        </div>
      </div>
    }
  </div>
</div>
```

---

## 14. What NOT to Do

| ❌ Avoid | ✅ Use instead |
|----------|---------------|
| `style="color: red"` inline styles | SCSS class with CSS token |
| `class="flex items-center"` utility classes | BEM class in SCSS |
| `@Input() title: string` | `title = input<string>('')` |
| `@Output() clicked = new EventEmitter()` | `clicked = output<void>()` |
| `constructor(private svc: Service)` | `private svc = inject(Service)` |
| `*ngIf`, `*ngFor`, `*ngSwitch` | `@if`, `@for`, `@switch` |
| `border-radius: 8px` on cards | Sharp corners — no border-radius |
| `box-shadow` for depth | `border: 1px solid var(--color-border)` |
| Hardcoded color `#CAFF4D` | `var(--color-accent)` |
| `transition: 0.2s ease` | `transition: var(--duration-base) var(--ease)` |
| `font-family: monospace` | `font-family: var(--font-mono)` |
| NgModules | Standalone components |
| `ChangeDetectionStrategy.Default` | `ChangeDetectionStrategy.OnPush` |
