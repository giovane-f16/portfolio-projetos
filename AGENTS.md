# Repository Guidelines

## Project Overview

`portfolio-projetos` is a software developer's portfolio website for showcasing their main projects. Each entry should highlight its purpose, technologies, key features, screenshots, and links to source code or a live demo. Prioritize a polished, responsive experience that communicates the developer's skills clearly.

## Project Structure & Module Organization

This repository is currently an initial scaffold: no application source, tests, or assets have been added. Place application code in `src/`, automated tests in `tests/` (or beside source files when the chosen framework expects that), and screenshots, icons, and other static files in `public/` or `assets/`. Keep project showcase data in a dedicated module or data directory so new portfolio entries can be added without changing presentation components.

## Build, Test, and Development Commands

No build system or package manager is configured yet. When adding a project, expose its common tasks through the ecosystem's standard manifest and document them in its README. Prefer predictable commands such as:

- `npm install` — install JavaScript dependencies from the lockfile.
- `npm run dev` — start the local development server.
- `npm test` — run the automated test suite.
- `npm run build` — create a production build.

Do not add repository-wide commands until they operate consistently across all included projects.

## Coding Style & Naming Conventions

Use the formatter and linter standard for each project's language, commit their configuration, and run them before opening a pull request. Default to two-space indentation for JSON, YAML, CSS, and JavaScript/TypeScript unless tooling specifies otherwise. Use `kebab-case` for project directories, `PascalCase` for UI components, and `camelCase` for JavaScript/TypeScript functions and variables. Keep modules focused and avoid committing generated output or dependency directories.

## Testing Guidelines

Every feature or bug fix should include relevant tests once a test framework is introduced. Name tests according to the selected tool, such as `*.test.ts` or `test_*.py`, and cover both expected behavior and important failure cases. Document any manual verification required for visual projects and include screenshots for visible changes.

## Commit & Pull Request Guidelines

Because no Git history is available in this checkout, use concise, imperative commit subjects; Conventional Commit prefixes are encouraged (for example, `feat: add expense tracker`). Keep commits scoped to one logical change. Pull requests should explain the change, list verification commands, link related issues, and include before/after screenshots for UI updates. Never commit secrets; provide sanitized examples such as `.env.example` instead.
