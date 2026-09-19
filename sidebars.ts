import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',
    'architecture',
    {type: 'category', label: 'MiniJAM', link: {type: 'doc', id: 'minijam/index'}, collapsed: false, items: [
      {type: 'category', label: 'Introduction', items: [
        'minijam/introduction/what-is-minijam',
        'minijam/introduction/architecture-overview',
        'minijam/introduction/minijam-and-jam',
      ]},
      {type: 'category', label: 'Protocol & Execution', items: [
        'minijam/architecture/minijam-spec',
        'minijam/architecture/execution-boundary',
      ]},
      {type: 'category', label: 'Stage-1 Network', items: [
        'minijam/network/stage-1',
        'minijam/network/formal-rpc',
        'minijam/network/worker',
      ]},
      {type: 'category', label: 'Build on MiniJAM', items: [
        'minijam/developers/quickstart',
        'minijam/developers/local-docker',
      ]},
      {type: 'category', label: 'Resources', items: [
        'minijam/resources/glossary',
        'minijam/resources/ecosystem-resources',
      ]},
      {type: 'category', label: 'Legacy', collapsed: true, items: [
        'archive/stage-0-playground',
        'minijam/developers/playground-api',
      ]},
    ]},
    {type: 'category', label: 'JamScript', link: {type: 'doc', id: 'jamscript/index'}, collapsed: false, items: [
      {type: 'category', label: 'Getting Started', items: [
        'jamscript/getting-started/quickstart',
        'jamscript/getting-started/installation',
        'jamscript/getting-started/first-service',
      ]},
      {type: 'category', label: 'Language', items: [
        'jamscript/language/language-overview',
        'jamscript/language/supported-javascript',
        'jamscript/language/types-and-data',
        'jamscript/language/state',
        'jamscript/language/determinism',
      ]},
      {type: 'category', label: 'Application Runtime', items: [
        'jamscript/runtime/execution-model',
        'jamscript/runtime/refine-and-accumulate',
        'jamscript/runtime/managed-state',
        'jamscript/runtime/memory',
        'jamscript/runtime/abi',
      ]},
      {type: 'category', label: 'Ownership', items: ['jamscript/ownership/index']},
      {type: 'category', label: 'Deployment', items: ['jamscript/deployment/index']},
      {type: 'category', label: 'Backend & Client', items: [
        'jamscript/backend/index',
        'jamscript/client/index',
      ]},
      {type: 'category', label: 'Tooling', items: [
        'jamscript/tooling/compiler',
        'jamscript/tooling/configuration',
      ]},
      {type: 'category', label: 'Reference', items: [
        'jamscript/reference/compatibility',
        'jamscript/reference/stability',
      ]},
    ]},
    {type: 'category', label: 'MINI Ecosystem', link: {type: 'doc', id: 'ecosystem/index'}, collapsed: false, items: [
      'ecosystem/incentive-protocol',
      'ecosystem/tokenomics',
    ]},
    {type: 'category', label: 'Compatibility', collapsed: true, items: ['reference/compatibility']},
  ],
};

export default sidebars;
