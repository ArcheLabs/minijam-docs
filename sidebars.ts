import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',
    {type: 'category', label: 'MiniJAM', link: {type: 'doc', id: 'minijam/index'}, collapsed: false, items: [
      {type: 'category', label: 'Introduction', items: [
        'minijam/introduction/what-is-minijam', 'minijam/introduction/current-status',
        'minijam/introduction/architecture-overview', 'minijam/introduction/minijam-and-jam',
      ]},
      {type: 'category', label: 'Build on MiniJAM', items: ['minijam/developers/quickstart', 'minijam/developers/development-model', 'minijam/developers/local-docker']},
      {type: 'category', label: 'Concepts', items: ['minijam/concepts/execution-pipeline']},
      {type: 'category', label: 'Resources', items: ['minijam/resources/known-limitations', 'minijam/resources/glossary']},
    ]},
    'incentive-protocol/index', 'mini/index',
  ],
};

export default sidebars;
