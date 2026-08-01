# MiniJAM Documentation

The MiniJAM documentation site is built with Docusaurus 3 and supports English and Simplified Chinese.

## Local development

```bash
npm ci
npm run start:en
```

To start the Chinese site, run:

```bash
npm run start:zh
```

Each locale uses its own local development process; both locales do not need to run in one server.

## Build all languages

```bash
npm run check
```

## Adding documentation

1. Add the English base file under `docs/`.
2. Add the Simplified Chinese file at the same path under `i18n/zh-CN/docusaurus-plugin-content-docs/current/`.
3. Keep `id` and `slug` identical.
4. Update `sidebars.ts`.
5. Run `npm run write-translations:zh`.
6. Translate new UI strings.
7. Run `npm run check`.
8. Check links in both locales and verify that the locale dropdown stays on the corresponding page.

Chinese is currently the primary writing language. English is the default site language and translations may temporarily lag behind. An English placeholder must never be marked as a complete translation. Security, compatibility, economic, and deployment claims require support from code or release records.

## Content status

MiniJAM has the first-phase structure and a complete Chinese draft of “MiniJAM 与 JAM”. The corresponding English page is an explicit translation-status placeholder. Incentive Protocol and MINI are planned products with overview pages only; no unconfirmed parameters, addresses, networks, audits, or returns are stated.
