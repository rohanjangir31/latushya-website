---
name: "Frontend Design Skill (10K Agency Standard)"
description: "Strict design rules, typography scale, spacing system, and color tokens for a premium, agency-level aesthetic. Avoids generic AI UI patterns."
---

# Frontend Design Rules (Latushya 10K Standard)

When acting as a frontend engineer/designer on this project, you MUST adhere to the following design principles. **NEVER** use generic Tailwind templates, random hex colors, or default browser spacing.

## 1. Typography Scale
We use a premium editorial typographic style.
- **Display Typeface:** Always use `font-display` (e.g., *Outfit* or *Playfair Display*). Weights should be `font-light` (300) or `font-normal` (400).
- **Body Typeface:** Always use `font-sans` (e.g., *Inter* or *Roboto*).
- **Responsive Sizing:** Use `clamp()` for all massive headlines to ensure perfect responsiveness across devices without abrupt media query jumps.
  - *Example Large Hero:* `font-size: clamp(2.5rem, 8vw, 6rem)`
  - *Example Section Header:* `font-size: clamp(1.8rem, 4vw, 3rem)`
- **Line Height:** Headlines should be tight (e.g., `leading-[0.95]` or `1.1`), while body copy should breathe heavily (e.g., `leading-[1.8]` or `2.0`).

## 2. Spacing System
We use an 8px base grid, but we lean heavily into **oversized, luxurious padding**.
- Small gaps: `gap-4`, `gap-8`
- Section padding: `py-24`, `py-32` (or `clamp(4rem, 10vw, 8rem)`)
- Avoid tight, clustered layouts. Let components breathe. Negative space is a sign of luxury.

## 3. Color Tokens
Do NOT invent random hex codes. Stick strictly to our established CSS variables in `index.css`:
- **Backgrounds:** `bg-black-deep` (our primary dark background), `bg-black-charcoal` (for cards/subsections).
- **Accents:** `text-gold`, `border-gold/30`, `bg-gold/10` (used extremely sparingly, never as large block backgrounds).
- **Text:** `text-white` (primary), `text-gray-subtle` (secondary body), `text-gray-luxury` (tertiary/dividers).

## 4. Components & 21st.dev Integration
- **Button States:** Buttons (`.btn-gold`) must have clear hover states, subtle transitions, and avoid rounded pill shapes (use sharp or slightly rounded corners `rounded-sm` for an architectural feel).
- **21st.dev Integration:** If the user asks for a complex new component (like a pricing table, Bento grid, or elaborate navbar), you should pull inspiration or exact code from [21st.dev](https://21st.dev) and immediately adapt it to match the tokens and typography above.

## 5. Animation (Framer Motion)
- **Entrance:** Use staggered, slow reveals (`duration: 0.8` to `1.2`, `ease: [0.25, 0.46, 0.45, 0.94]`).
- **Scroll:** Tie complex animations to `useInView` so sections breathe into existence as the user scrolls.
- **Hover:** Micro-interactions (like borders lighting up or slight scaling) should feel weightless but intentional.

## 6. The "Generic AI" Veto
If your proposed UI looks like a standard TailwindUI template or a generic SaaS dashboard, **start over**. Our aesthetic is high-end editorial, architectural, and cinematic.
