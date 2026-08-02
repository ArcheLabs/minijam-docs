# MiniJAM Documentation

Docusaurus 3 documentation site for MiniJAM. The default locale is English, with Simplified Chinese under `i18n/zh-CN`.

## Requirements

- Node.js
- npm

## Install

```bash
npm ci
```

## Development

Start the English site:

```bash
npm run start:en
```

Start the Simplified Chinese site:

```bash
npm run start:zh
```

The default Docusaurus command is also available:

```bash
npm run start
```

## Build

Build all locales:

```bash
npm run build
```

Build one locale:

```bash
npm run build:en
npm run build:zh
```

Serve the production build locally:

```bash
npm run serve
```

## Checks

Run TypeScript checks:

```bash
npm run typecheck
```

Check that English and Simplified Chinese docs have matching file paths:

```bash
npm run check:i18n
```

Run the full validation pipeline:

```bash
npm run check
```

`npm run check` runs typecheck, i18n parity, and the production build.

## Documentation Structure

English source docs:

```text
docs/
```

Simplified Chinese docs:

```text
i18n/zh-CN/docusaurus-plugin-content-docs/current/
```

Sidebar configuration:

```text
sidebars.ts
```

Site configuration:

```text
docusaurus.config.ts
```

## Translations

Generate or refresh Simplified Chinese UI translation files:

```bash
npm run write-translations:zh
```

When adding a new documentation page, add the English file under `docs/` and the Simplified Chinese file at the same relative path under `i18n/zh-CN/docusaurus-plugin-content-docs/current/`, then update `sidebars.ts` if needed.
