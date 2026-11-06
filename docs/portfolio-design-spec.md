# Portfolio design specification

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

1. Fixed header with the GF signature logo, section navigation, EN/PT switch,
   and accessible mobile menu.
2. Red hero block with a first-person greeting, a short summary, two actions,
   the GF signature in large scale, and the current role.
3. Projects in an endless horizontal carousel with a screenshot per project;
   it pauses on hover, focus, or its toggle and becomes a static scroll row with
   reduced motion.
4. Skills in a dark block with three areas and their tools.
5. Experience as a dated job list beside a credentials panel.
6. Red contact block with the configured channel and GitHub.
7. Compact footer with the GF signature.

Internal section navigation uses buttons and smooth scrolling. It must not add
hash fragments or other navigation state to the browser URL.

## Visual direction: red blocks

The page reads as a sequence of solid blocks on a light paper ground.

- Paper (`--paper-100`) is the page ground; white-ish surfaces hold cards.
- Red (`--red-600`) fills the hero and contact blocks and marks accents.
- Warm ink (`--ink-900`) fills the skills block and sets text.
- Green and amber are reserved for project status.
- The GF signature logo is the brand mark; it is recolored by CSS, never edited.
- Copy is first person, short, and uses only facts from the sources above.

### Typography

- Display: Archivo at an expanded width, weight 800.
- Body: Instrument Sans.
- Metadata: JetBrains Mono for dates, kickers, and tags.
- All three are self-hosted through `next/font`.
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

- Above 1050 px: full navigation, hero copy beside the signature, three skill columns.
- Up to 1050 px: compact brand, single-column skills and experience.
- Below 768 px: accessible menu, signature above the hero copy, stacked jobs.
- Below 520 px: full-width actions.
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
