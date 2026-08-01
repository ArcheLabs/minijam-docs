import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MiniJAM Documentation',
  tagline: 'Documentation for MiniJAM, the Incentive Protocol, and MINI.',
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
      docs: {routeBasePath: 'docs', sidebarPath: './sidebars.ts', breadcrumbs: true, showLastUpdateTime: true},
      blog: false,
      theme: {customCss: './src/css/custom.css'},
    } satisfies Preset.Options],
  ],
  themeConfig: {
    colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: true},
    navbar: {
      title: 'MiniJAM',
      items: [
        {type: 'doc', docId: 'index', label: 'Documentation', position: 'left'},
        {type: 'doc', docId: 'minijam/index', label: 'MiniJAM', position: 'left'},
        {type: 'doc', docId: 'incentive-protocol/index', label: 'Incentive Protocol', position: 'left'},
        {type: 'doc', docId: 'mini/index', label: 'MINI', position: 'left'},
        {href: 'https://github.com/ArcheLabs', label: 'GitHub', position: 'right'},
        {type: 'localeDropdown', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Documentation', items: [
          {label: 'MiniJAM', to: '/docs/minijam'},
          {label: 'Incentive Protocol', to: '/docs/incentive-protocol'},
          {label: 'MINI', to: '/docs/mini'},
        ]},
        {title: 'Project', items: [{label: 'GitHub', href: 'https://github.com/ArcheLabs'}]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ArcheLabs. Built with Docusaurus.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
