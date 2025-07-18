import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/nodepools',
        'concepts/nodeclasses',
        'concepts/scheduling',
        'concepts/disruption',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/settings',
        {
          type: 'doc',
          id: 'reference/nap-vs-self-hosted',
          label: 'NAP vs Self-hosted',
          className: 'sidebar-azure-only',
        },
        {
          type: 'doc',
          id: 'reference/custom-networking',
          label: 'Custom Networking',
          className: 'sidebar-azure-only',
        },
        {
          type: 'doc',
          id: 'reference/instance-types',
          label: 'Instance Types',
        },
        {
          type: 'doc',
          id: 'reference/managing-amis',
          label: 'Managing AMIs',
          className: 'sidebar-aws-only',
        },
        {
          type: 'doc',
          id: 'reference/upgrade-guide',
          label: 'Upgrade Guide',
          className: 'sidebar-aws-only',
        },
      ],
    },
  ],
};

export default sidebars;
