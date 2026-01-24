# Changelog

All notable changes to this project are documented here, in chronological order, with detailed descriptions of the implementation details.

## 2026-01-11
- **Initial**: Project bootstrap and initial investigator sheet structure.

## 2026-01-12
- **Feat**: Implemented photo customization, allowing users to upload and persist investigator portraits via Base64.
- **Fix**: Adjusted layout spacing and updated English, French, and Spanish translations for better alignment.
- **Style**: Redesigned trackers with a bold border style and added themed background colors to the tracker section and footer.

## 2026-01-17
- **Feat**: Migrated the core application to React for improved state management and component-based architecture.

## 2026-01-18
- **Feat**: Set up GitHub Pages deployment workflow using GitHub Actions.
- **Fix**: Corrected script paths in `index.html` and removed dead imports from `useInvestigator.ts`.
- **Feat**: Added full investigator data persistence with JSON export/import and a global data reset feature.
- **Fix**: Localized the favicon asset and updated the linkage in the document head.
- **Refactor**: Integrated `react-i18next` for robust internationalization support.
- **Feat**: Added German (DE) language support across all interface labels and skill names.
- **Refactor**: Enhanced the `StatBox` component to better handle empty or zero values for improved readability.
- **Feat**: Implemented responsive CSS breakpoints to ensure usability on mobile devices.
- **Feat**: Created a mobile-friendly language selector dropdown and updated reset button styling for consistency.
- **Feat**: Added localized toast notifications and confirmation dialogs for data-heavy actions.
- **Feat**: Updated documentation in `README.md` with project screenshots and technical stack details.

## 2026-01-19
- **Feat**: Implemented a reusable `SectionTitle` component to standardize look-and-feel across the sheet.
- **Feat**: Expanded the `FellowInvestigatorsSection` to a grid layout supporting up to 8 entries.
- **Fix**: Standardized typography across the application to consistently use "P22 Typewriter" and "Century Gothic".
- **Update**: Refreshed project screenshots for the documentation.
- **Fix**: Enabled typewriter font rendering for all numeric stat displays.

## 2026-01-20
- **Fix**: Removed redundant font-weight settings from input fields to match printed sheet aesthetics.

## 2026-01-23
- **Feat**: Added optimized `woff2` assets for all custom fonts.
- **Feat**: Implemented a PWA-ready `site.webmanifest` and high-resolution icons.
- **Feat**: Optimized SEO with Open Graph meta tags, Twitter card support, and a dedicated `og-image.png`.
- **Feat**: Implemented the `ZoomControls` component with manual zoom levels and "Fit to Width/Height" logic.

## 2026-01-24
- **Feat**: Added localized tooltips and `title` attributes to all navigation and zoom controls.
- **Feat**: Integrated SVG icons for all sidebar actions (Roll, Save, Print, etc.).
- **Feat**: Added a localized "Scroll to Top" button that appears dynamically on long devices.
- **Feat**: Added full Portuguese (PT) translation support.
- **Fix**: Updated GitHub Actions deployment logic to skip rebuilds unless `src/` or `public/` files change.
- **Fix**: Implemented a global CSS button reset to enable the use of semantic `<button>` tags without default styling.
- **Feat**: Performed a comprehensive accessibility (a11y) audit:
    - Replaced decorative icon `alt` text with `aria-hidden="true"`.
    - Added semantic ARIA landmarks (`<main>`, `<nav>`, `<aside>`) with localized labels.
    - Synchronized the root `<html lang="...">` attribute with the i18next state.
    - Wrapped all interactive elements in properly labeled buttons.
- **Feat**: Added a `normalize` utility to sanitize investigator names for safe file downloads.
