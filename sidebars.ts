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
    {type: 'category', label: 'JamScript', link: {type: 'doc', id: 'jamscript/index'}, collapsed: false, items: [
      {type: 'category', label: 'Getting Started', items: [
        'jamscript/getting-started/quickstart', 'jamscript/getting-started/installation', 'jamscript/getting-started/first-service',
      ]},
      {type: 'category', label: 'Language', items: [
        'jamscript/language/language-overview', 'jamscript/language/supported-javascript',
        'jamscript/language/types-and-data', 'jamscript/language/state', 'jamscript/language/determinism',
      ]},
      {type: 'category', label: 'Runtime', items: [
        'jamscript/runtime/execution-model', 'jamscript/runtime/refine-and-accumulate', 'jamscript/runtime/memory', 'jamscript/runtime/abi',
      ]},
      {type: 'category', label: 'Tooling', items: ['jamscript/tooling/compiler', 'jamscript/tooling/configuration']},
      {type: 'category', label: 'Reference', items: ['jamscript/reference/compatibility', 'jamscript/reference/stability']},
    ]},
    {type: 'category', label: 'Ecosystem', collapsed: false, items: [
      'ecosystem/incentive-protocol',
      'ecosystem/tokenomics',
    ]},
  ],
};

export default sidebars;
