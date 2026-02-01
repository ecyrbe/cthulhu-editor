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
- **Fix**: Enhanced `WeaponTable` component and added weapon management to investigator data.
- **Fix**: Expanded skill list to match the original template with alternating background colors.
- **Feat**: Refactored `Tracker` component for better flexibility using `children` and added new layout options.
- **Feat**: Added GNU General Public License v2.0.

## 2026-01-25
- **Feat**: Major architectural overhaul of the investigator sheet, breaking it into modular sections (`HeaderSection`, `TrackersSection`, `IdentitySection`, etc.).
- **Feat**: Introduced the `InvestigatorPhoto` component for improved image handling and upload.
- **Feat**: Updated primary typography to "Liberation Serif".
- **Fix**: Improved data integrity with better `sanityMax` calculations and read-only inputs for calculated values.
- **Fix**: Refined skill management and enhanced type definitions for better stability.
- **Refactor**: Simplified routing and state management within the `App` component.

## 2026-01-26
- **Feat**: Integrated a global `Footer` component with localized copyright and trademark disclaimers.
- **Feat**: Added a "Print Blank" mode to allow users to export empty sheets.
- **Feat**: Refactored the `TrackersSection` to utilize specialized `TrackerCheckbox` and `TrackerNumber` components.
- **Feat**: Added the `CharacteristicField` component for standardized stat handling.

## 2026-01-27
- **Feat**: Replaced the legacy `Sidebar` and `ZoomControls` with an integrated `Toolbox` component, adding a new printer action.
- **Feat**: Migrated application state management to **Jotai** and implemented **React Router** for enhanced navigation.
- **Feat**: Added a global `ErrorBoundary` for improved application resilience.
- **Feat**: Defined new schemas and TypeScript interfaces for Investigator sub-sections (Identity, Trackers, Backstory, etc.).
- **Fix**: Resolved a critical layout issue that caused extra blank pages during printing.

## 2026-01-28
- **Feat**: Rebranded the investigator management interface from "Manager" to **"Registry"**.
- **Feat**: Implemented the `RegistryPage` with support for importing/exporting investigators.
- **Feat**: Added an `ImportPage` and enabled loading investigator data directly from URLs.
- **Feat**: Introduced a `LoadingScreen` and implemented buffered value handling to smooth out UI transitions.
- **Refactor**: Unified all input components to use `DebouncedInput` for better performance during rapid data entry.

## 2026-01-29
- **Feat**: Officially rebranded the project as **"Arkham Registry"**, updating metadata, Open Graph assets, and the landing page experience.
- **Feat**: Configured the application for deployment on the new `arkham-registry` domain.

## 2026-01-30
- **Feat**: Improved `RegistryPage` UX with a sticky breadcrumb header and responsive navigation layout.
- **Style**: Refined the `LandingPage` with new feature icons, reveal effects, and thematic styling.
- **Fix**: Standardized mobile view thresholds and adjusted media queries for better layout consistency.

## 2026-01-31
- **Feat**: Implemented a **Light/Dark mode** toggle with theme persistence.
- **Feat**: Added `handleNumberInput` utility to standardize numeric input across `StatBox`, `SkillStatBox`, and `DebouncedInput`.
- **Feat**: Updated example investigator data and balanced starting skill values.
- **Style**: Enhanced accessibility by increasing the hit area and visibility of key interactive icons.

## 2026-02-01
- **Feat**: Added the `ScrollToTop` component to improve navigation on long pages.
- **Feat**: Integrated the **Noto Color Emoji** font to ensure consistent flag rendering across different OS environments.
- **Style**: Switched the default fallback language to English for broader accessibility.
