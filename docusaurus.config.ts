import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MiniJAM Documentation',
  tagline: 'Documentation for MiniJAM, the Incentive Protocol, and MINI.',
  favicon: 'img/logo.svg',
  url: process.env.SITE_URL ?? 'https://docs.minijam.org',
  baseUrl: process.env.BASE_URL ?? '/',
  organizationName: 'ArcheLabs',
  projectName: 'minijam-docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en', direction: 'ltr'},
      'zh-CN': {label: '简体中文', htmlLang: 'zh-CN', direction: 'ltr'},
    },
  },
  presets: [
    ['classic', {
      docs: {
        routeBasePath: 'docs',
        sidebarPath: './sidebars.ts',
        breadcrumbs: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/ArcheLabs/minijam-docs/edit/main/',
      },
      blog: false,
      theme: {customCss: './src/css/custom.css'},
    } satisfies Preset.Options],
  ],
  themeConfig: {
    colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: true},
    navbar: {
      title: 'MiniJAM',
      logo: {alt: 'MiniJAM', src: 'img/logo.svg'},
      items: [
        {type: 'doc', docId: 'index', label: 'Documentation', position: 'left'},
        {type: 'doc', docId: 'minijam/index', label: 'MiniJAM', position: 'left'},
        {type: 'doc', docId: 'ecosystem/incentive-protocol', label: 'Incentive Protocol', position: 'left'},
        {type: 'doc', docId: 'ecosystem/tokenomics', label: 'MINI', position: 'left'},
        {href: 'https://github.com/ArcheLabs/minijam-docs', label: 'Docs GitHub', position: 'right'},
        {href: 'https://github.com/ArcheLabs/minijam-client', label: 'MiniJAM Client', position: 'right'},
        {type: 'localeDropdown', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Documentation', items: [
          {label: 'MiniJAM', to: '/docs/minijam'},
          {label: 'Incentive Protocol', to: '/docs/incentive-protocol'},
          {label: 'MINI Tokenomics', to: '/docs/ecosystem/tokenomics'},
        ]},
        {title: 'Project', items: [
          {label: 'Documentation repository', href: 'https://github.com/ArcheLabs/minijam-docs'},
          {label: 'MiniJAM Client', href: 'https://github.com/ArcheLabs/minijam-client'},
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ArcheLabs. Built with Docusaurus.`,
    },
    image: 'img/logo.svg',
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
