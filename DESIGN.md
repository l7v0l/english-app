---
name: Lisan Spark
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.25rem
  margin: 1rem
  margin-sm: 0.75rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is crafted for a mobile-first language acquisition experience, bridging native Arabic speakers with fluent English mastery. The core brand personality is warm, encouraging, celebratory, and structurally disciplined. It blends contemporary soft-modern UI with gamified tactile cues to eliminate the cognitive friction and intimidation often tied to learning a new language script and vocabulary.

The aesthetic fuses **Soft Modernism** with **Playful Tactility**:
- Pill-soft boundaries, friendly generous radiuses, and physical tactile feedback that reward daily progress.
- Dual-directionality at its core: engineered from the ground up for strict bidirectional integrity, prioritizing RTL (Right-to-Left) layouts for Arabic context while seamlessly housing LTR (Left-to-Right) English vocabulary snippets, phonetics, and interactive exercises.
- Cheerful yet legible gamification: avoiding cluttered juvenile visuals in favor of focused, high-clarity surfaces, luminous jewel tones, and celebratory momentum indicators (streaks, badges, and progress rings).

## Colors

The palette balances clinical clarity with organic warmth, pairing deep focus tones with vibrant achievement cues.

- **Primary (`#0D9488` - Deep Emerald):** The foundational anchor for major interactive calls to action, active navigation tabs, core lesson progress, and authoritative instructional headers.
- **Secondary (`#14B8A6` - Luminous Mint Teal):** The energetic support tier used for secondary state selections, success states, subtle active fills, and exercise correct-response indicators.
- **Tertiary (`#F59E0B` - Warm Amber):** Reserved specifically for momentum, gamified reward loops, streak multipliers, XP counters, and star ratings. It should never be diluted into ordinary layout chrome.
- **Neutrals & Surfaces:**
  - App Canvas Ground: Light, ultra-soft mint-tinted cream (`#F0FDF4`) blending into cool structural white (`#F8FAFC`).
  - Card & Module Surfaces: Pure clean white (`#FFFFFF`) to maximize optical contrast against Arabic diacritics and Latin glyphs.
  - Text & Structural Borders: Neutral slate scale (`#0F172A` for primary headlines, `#334155` for body readability, `#64748B` for secondary labels, and `#E2E8F0` for structural separators).
- **Feedback Accents:**
  - Error/Correction: `#EF4444` (Vibrant Crimson) for incorrect answers and audio retry states.
  - Success/Celebration: `#10B981` (Bright Jade) alongside `#14B8A6` for lesson completion.

## Typography

Typography governs the dual-language dynamic. The system utilizes **Plus Jakarta Sans** for Latin characters and interfaces natively with contemporary geometric Arabic companions (such as *Cairo* or *Tajawal*).

### Bidirectional & Optical Considerations
- **Vertical Metric Alignment:** Arabic scripts carry taller ascenders, lower descenders, and accent marks (Tashkeel). The baseline heights have been generous to eliminate clipping in mixed-script cards. Body copy uses an expanded line-height ratio (1.5x–1.65x) to maintain breathability when Arabic and English intermingle in the same sentence.
- **Weight Calibration:** When switching between Latin (`Plus Jakarta Sans`) and Arabic typefaces, normalize perceived weight: Arabic display weights should sit at `700` (Bold) to match `800` (ExtraBold) in Latin, preventing Arabic characters from appearing visually lighter.
- **Directional Isolation:** Ensure English words and IPA phonetic transcriptions within Arabic sentences are wrapped in directional isolation tags (`<bdi>` or `dir="ltr"`) to prevent punctuation bleed and incorrect clause order.

## Layout & Spacing

The layout operates on an 8pt base grid optimized for mobile ergonomics, supporting responsive expansion up to compact tablets.

### Fluid Mobile Architecture
- **Safe Margins:** A standard mobile edge margin of `1rem` (16px) expands to `1.5rem` (24px) on tablets. Critical touch targets must stay within vertical thumb reach zones.
- **Bidirectional Mirroring (RTL-First):**
  - Layout axes invert strictly according to document direction. Leading icons (e.g., arrow back, lesson steps, category indicators) swap orientation automatically.
  - Unidirectional icons that depict physical operations (like a speaker/audio wave, play/pause controls, and checkmarks) maintain invariant orientation.
  - Horizontal progress meters fill right-to-left for native Arabic screens, tracking lesson advancement toward the left terminal.

### Layout Breakpoints
- **Mobile (< 640px):** Single-column fluid view with pinned bottom action bar (`space-md` inner padding) and vertical exercise stacking.
- **Tablet (640px - 1024px):** 2-column structured view where reference material or grammar tips rest alongside active exercise blocks, constrained to a maximum reading container width of 720px.

## Elevation & Depth

Visual hierarchy rejects harsh drop shadows in favor of **Soft Playful Elevation** and tactile layered extrusions that feel physically pressable.

### Elevation Levels
- **Level 0 (Flat / Well):** Base backgrounds (`#F0FDF4` or `#F8FAFC`). Recessed drop zones for drag-and-drop word exercises use an inner stroke (`#CBD5E1`) with a subtle inset tint.
- **Level 1 (Resting Card):** Pure white container (`#FFFFFF`) with a dual-layer ambient shadow:
  - `0 4px 12px -2px rgba(13, 148, 136, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`
  - Edge treatment: 1px subtle boundary stroke (`#E2E8F0` or `#CCFBF1`).
- **Level 2 (Interactive Floating / Streak Modals):**
  - `0 10px 24px -4px rgba(13, 148, 136, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05)`
  - Used for floating bottom sheets, streak milestone toasts, and quick-look vocabulary translations.
- **Level 3 (Tactile Push):** Primary action buttons utilize a 3D bottom border shelf (4px solid `#0F766E` underneath `#0D9488`). On press, the element translates down 2px with the shelf reducing to 2px, providing an instantaneous gamified mechanical response.

## Shapes

The shape system adopts a **Pill-Shaped and Extra-Rounded** baseline (`roundedness: 3`) to cultivate an approachable, anxiety-free learning atmosphere.

- **Primary Controls & Chips:** Fully pill-shaped (`rounded-full` / `9999px`) to invite immediate tapping without sharp tactile friction.
- **Cards & Learning Units:** Standard cards utilize `rounded-2xl` (1rem to 1.5rem), while major congratulatory modals, achievement containers, and daily streak milestones employ `rounded-3xl` (2rem).
- **Match-Pair Tiles & Audio Triggers:** Squircle geometry (`rounded-xl` to `rounded-2xl`) with consistent corner continuity to keep Arabic script comfortably centered without visual crowding in corner junctions.

## Components

### Buttons
- **Primary Action (Tactile Pill):** Height: 52px. Background: `#0D9488`, bottom tactile lip: 4px `#0F766E`, text: `#FFFFFF`, shape: `rounded-full`. Active state executes a `translate-y-1` transform with reduced bottom lip.
- **Streak / Gamification Button:** Height: 44px. Background: `#FEF3C7`, text: `#92400E`, border: 1.5px solid `#F59E0B`. Carries streak icon leading on the right in RTL mode.
- **Ghost / Tertiary Action:** Transparent background with `#0D9488` bold text and subtle hover fill (`rgba(20, 184, 166, 0.08)`).

### Chips & Word Banks
- **Selectable Word Tiles:** Height: 44px minimum. Border radius: `rounded-xl`. Background: `#FFFFFF`, border: 2px solid `#E2E8F0`. When selected: background `#CCFBF1`, border color `#0D9488`, text `#0F766E`.
- **Phonetic Pronunciation Badges:** Compact pill chips (`rounded-full`) in soft slate tint with small speaker icon aligned to the logical start (right in RTL, left in LTR).

### Input Fields & Translation Cards
- **Interactive Form Inputs:** Height: 56px, background `#FFFFFF`, border: 2px solid `#E2E8F0`, rounded at `rounded-2xl`. Focus state transitions border to `#14B8A6` with an outer halo of `rgba(20, 184, 166, 0.2)`. Direction automatically switches based on input language detection.
- **Dual-Script Flashcard:** Base: `#FFFFFF` card with `rounded-3xl` corners, 16px padding. Features prominent English phrase at top (LTR, `headline-lg`), followed by a light `#E2E8F0` horizontal divider, and the Arabic translation and contextual grammar note at bottom (RTL, `body-lg`).

### Lists & Learning Paths
- **Lesson Node Units:** Stepper path arranged vertically or serpentine. Completed nodes feature `#0D9488` with a white checkmark; current node is highlighted with an active glowing pulse (`0 0 0 6px rgba(20, 184, 166, 0.25)`); locked nodes sit in muted `#E2E8F0`.
- **Streak Counter Bar:** Positioned in top app header. Displays flame asset, current number count in high-contrast bold amber (`#B45309`), housed in a soft pill capsule (`#FFFBEB`).

### Checkboxes & Radio Selectors
- **Multiple Choice Exercise Items:** Full-width card options with 16px horizontal padding and `rounded-2xl`. Uses an interactive circular indicator that fills with an emerald checkmark on selection, providing a gentle scale-up bounce animation (`transform: scale(1.02)`).