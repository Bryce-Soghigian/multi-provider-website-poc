import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Karpenter Documentation',
  tagline: 'Just-in-time Nodes for Any Kubernetes Cluster',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://karpenter.sh',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Azure', // Usually your GitHub org/user name.
  projectName: 'karpenter-provider-azure', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Custom configuration for multi-provider support
  customFields: {
    providers: {
      azure: {
        name: 'Azure',
        icon: 'fab fa-microsoft',
        color: '#0078D4',
        nodeClassName: 'AKSNodeClass',
        nodeClassApi: 'karpenter.azure.com/v1beta1',
        repoUrl: 'https://github.com/Azure/karpenter-provider-azure',
        instanceLabels: {
          family: 'karpenter.azure.com/sku-family',
          name: 'karpenter.azure.com/sku-name',
          version: 'karpenter.azure.com/sku-version',
        },
        zones: ['eastus-1', 'eastus-2'],
        instanceTypes: ['Standard_D2s_v3', 'Standard_D4s_v3', 'Standard_E2s_v3'],
      },
      aws: {
        name: 'AWS',
        icon: 'fab fa-aws',
        color: '#FF9900',
        nodeClassName: 'EC2NodeClass',
        nodeClassApi: 'karpenter.k8s.aws/v1beta1',
        repoUrl: 'https://github.com/aws/karpenter-provider-aws',
        instanceLabels: {
          category: 'karpenter.k8s.aws/instance-category',
          family: 'karpenter.k8s.aws/instance-family',
          generation: 'karpenter.k8s.aws/instance-generation',
          size: 'karpenter.k8s.aws/instance-size',
        },
        zones: ['us-west-2a', 'us-west-2b'],
        instanceTypes: ['m5.large', 'm5.xlarge', 'c5.large', 'c5.xlarge'],
      },
    },
    defaultProvider: 'azure',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Azure/karpenter-provider-azure/tree/main/website-v2/',
          // Versioning configuration
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v1.6.0',
              path: '',
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Karpenter',
        src: 'img/white_full_logo.svg',
        srcDark: 'img/white_full_logo.svg',
        href: '/',
        width: 150,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/Azure/karpenter-provider-azure',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'karpenter',
      contextualSearch: false,
      searchParameters: {},
      searchPagePath: false,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
