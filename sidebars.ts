import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',
    {type: 'category', label: 'MiniJAM', link: {type: 'doc', id: 'minijam/index'}, collapsed: false, items: [
      {type: 'category', label: 'Introduction', items: [
        'minijam/introduction/what-is-minijam',
        'minijam/introduction/architecture-overview', 'minijam/introduction/minijam-and-jam',
      ]},
      {type: 'category', label: 'Build on MiniJAM', items: [
        'minijam/developers/quickstart', 'minijam/developers/local-docker',
        'minijam/developers/playground-api',
      ]},
      {type: 'category', label: 'Resources', items: [
        'minijam/resources/glossary', 'minijam/resources/ecosystem-resources',
      ]},
    ]},
    'incentive-protocol/index', 'mini/index',
  ],
};

export default sidebars;
