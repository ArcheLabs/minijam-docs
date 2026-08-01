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

The complete MiniJAM Stack is currently supported for external operation only through a digest-pinned Docker release. A release-specific bundle, chain spec, genesis hash, five immutable image digests, Authority keystore, three Worker seeds, and Playground Relayer URI are required. Native source builds are not an external-user deployment path.

Do not document the private Jambda implementation as a reduced MiniJAM HostCall support matrix. HostCall remains a JAM/Jambda execution-model concept; MiniJAM-specific differences belong to system-service handling and Work, Worker, Runtime, and chain-state integration.

## Content status

MiniJAM has the first-phase structure, a complete Chinese draft of “MiniJAM 与 JAM”, and a Docker-only Stage 0 deployment guide. The corresponding English page is an explicit translation-status placeholder. Incentive Protocol and MINI are planned products with overview pages only; no unconfirmed parameters, addresses, networks, audits, or returns are stated.
