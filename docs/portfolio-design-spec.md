# Corporate portfolio design specification

## Product goal

This portfolio introduces Giovane Ferreira da Silva to technical leaders,
recruiters, product teams, and potential clients. The page should communicate,
in under one minute:

- the professional role and location;
- the breadth of frontend, backend, cloud, and mobile experience;
- verified work history, education, languages, and certifications;
- selected projects with context and working links;
- a clear path to start a professional conversation.

English is the primary language. Portuguese is a complete alternate experience,
not a partial translation.

## Sources of truth

Use the sources in this order:

1. `Giovane_Ferreira_da_Silva_Resume.pdf` for professional information;
2. `Projects.md` for project details and links;
3. `src/data/portfolio.ts` for the normalized public content;
4. `src/app/design-system.css`, `src/app/globals.css`, and `src/components/` for
   presentation and behavior.

The public site intentionally omits the email address contained in the résumé.
`CONTACT_URL` accepts only HTTPS URLs and falls back to the verified LinkedIn
profile.

## Confirmed professional profile

- Name: Giovane Ferreira da Silva.
- Professional name: Giovane Ferreira.
- Role: Full Stack Developer.
- Location: São Paulo, Brazil.
- Experience: technology roles since October 2020.
- Current résumé roles: Junior Software Developer at Fundação Cásper Líbero and
  freelance Full Stack Developer at Mandem Jobs — Design Studio.
- Previous role: IT Intern at Fundação Cásper Líbero.
- Education: FIAP, UNINOVE, and Centro Universitário Senac.
- Languages: Portuguese, native or bilingual; English, full professional.
- Certifications: PHP and TDD with PHPUnit; Object-Oriented PHP.
- Core competencies: System Design, Clean Architecture, and Microservices.

No result, metric, title, employer, or date should be inferred beyond those
sources.

## Information architecture

1. Fixed header with professional brand, section navigation, EN/PT switch, and
   accessible mobile menu.
2. Profile hero with positioning statement, experience action, verified metrics,
   and an executive profile card.
3. Expertise with three delivery capabilities and a technology directory.
4. Experience with a chronological work history and a credential panel.
5. Selected work displayed as case-oriented project cards.
6. Contact banner with the configured channel and professional networks.
7. Compact corporate footer.

Internal section navigation uses buttons and smooth scrolling. It must not add
hash fragments or other navigation state to the browser URL.

## Visual direction: corporate engineering

The interface combines the confidence of an enterprise profile with the detail
of an engineering dossier.

- Deep navy is the primary canvas.
- Institutional blue indicates actions, navigation, and structure.
- Warm off-white surfaces give credentials and cases a document-like quality.
- Mint is reserved for verified/live states.
- Typography uses self-hosted Inter through `next/font`, with a neutral system
  fallback and high contrast.
- Thin borders, consistent radii, and restrained elevation create hierarchy.
- The layout avoids decorative dashboards, stock imagery, and simulated code
  terminals.

### Core tokens

```css
:root {
  --navy-950: #07111f;
  --navy-900: #0b1728;
  --navy-850: #0f1d31;
  --navy-800: #14253c;
  --blue-500: #4f8ff7;
  --blue-400: #73a7fa;
  --blue-200: #bed5fb;
  --mint-400: #78d8bd;
  --sand-100: #f6f3ec;
  --slate-50: #f2f5f8;
  --ink-900: #101b2a;
  --shell: 1180px;
  --header-height: 76px;
}
```

### Typography

- Display: Inter/system sans, weight 800–900.
- Body: Inter/system sans, regular and semibold.
- Metadata: system monospace for dates, indexes, and compact labels.
- Hero title: `clamp(3.4rem, 6.6vw, 6.15rem)`.
- Section titles: `clamp(2.45rem, 5vw, 4.45rem)`.
- Headings use balanced wrapping to reduce isolated words.

## Bilingual behavior

- Server-rendered and metadata defaults are English.
- Every translatable content field stores both `en` and `pt` values.
- Both versions are server-rendered; CSS exposes only the selected locale.
- The header switch updates the document language, title, and description.
- The preference is stored in `localStorage` under `portfolio-locale`.
- A small pre-hydration script applies a saved Portuguese preference without a
  visible content flash.
- Switching language does not change the route or URL.
- Technical tokens and brand names use `translate="no"` where appropriate.

## Responsive behavior

- Above 1050 px: full navigation, two-column hero, three capability cards.
- 861–1050 px: compact brand and responsive content columns.
- 768–860 px: stacked hero, horizontal profile card, single-column capabilities.
- Below 768 px: accessible menu, single-column cases and metrics.
- Below 520 px: full-width actions and simplified timeline/card metadata.
- Full-bleed fixed navigation accounts for device safe areas.

Manual review targets: 320, 768, 1024, and 1440 px.

## Accessibility and interaction

- English `lang` is present on the initial document; Portuguese content and the
  active document language use `pt-BR`.
- A skip link targets the main content.
- Native buttons and links are used according to behavior.
- All controls have at least a 44 px target and a visible focus state.
- The mobile menu moves focus to its first item and supports Escape.
- External links communicate that they open in a new tab to assistive technology.
- Active navigation uses `aria-current="location"`.
- Decorative layers and marks are hidden from assistive technology.
- Reduced-motion preferences remove smooth scrolling and reveal transitions.

## Architecture and performance

- `Main` and `Footer` are Server Components.
- Only `Header` hydrates for language, navigation, menu, and reveal behavior.
- Static data stays in `src/data/portfolio.ts` and requires no runtime fetch.
- No visual framework, icon package, analytics, or third-party script is loaded.
- Sections below the fold use `content-visibility`.
- Scroll layout reads are batched in `requestAnimationFrame`.
- The language choice causes a layout recalculation without re-rendering the
  full content tree.

## Acceptance checks

- `npm run lint`
- `npm test`
- `npm run build`
- keyboard navigation and mobile Escape behavior
- English-default and saved-Portuguese loading
- reduced motion
- project status and secure external links
- résumé source kept outside `public/`
- no public email address
