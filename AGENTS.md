# bem

`@shelf/bem`: a public npm library that builds BEM class names (`block`, element, and modifiers), a slim version of `bem-cn`. The source is `src/index.ts`, and `README.md` documents the API.

## Commands

- `pnpm install` — install dependencies.
- `pnpm test` — run the Jest tests.
- `pnpm lint` — format with oxfmt and fix lint; CI runs `pnpm lint:ci`.
- `pnpm type-check` — type-check.
- `pnpm build` — compile to `lib/`; `pnpm size` then checks the size limit of `lib/index.js` in `package.json`.
- `pnpm find-deadcode` — list unused files, exports, and dependencies.

## Rules

- Keep the library small: after a change to `src/index.ts`, run `pnpm build` and `pnpm size`.
- When the API changes, update the API section of `README.md`.
- This repository is public: do not put internal links, Jira keys, or internal hostnames in code, commits, or pull requests.

## Shared Skills

- Use `shelf-git-conventions` for branches, commits, and pull requests. The default branch is `master`.
- Use `unit-tests-101` when you write or review unit tests.
