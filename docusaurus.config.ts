import {themes as prismThemes} from 'prism-react-renderer';


import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'The Embodied Intelligence Textbook',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // TODO: Update this when the GitHub repository is public
  url: 'https://Ahmednoorani258.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ai-book-new/',

  // GitHub pages deployment config.
  organizationName: 'Ahmednoorani258', // Usually your GitHub org/user name.
  projectName: 'ai-book-new', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'textbookSidebar',
          position: 'left',
          label: 'Textbook',
        },
        // TODO: Add link to GitHub repo when public
        // {
        //   href: 'https://github.com/your-org/ai-book-new',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules',
          items: [
            // Links to be added as content is created
          ],
        },
        {
          title: 'Community',
          items: [
            // Links to be added later
          ],
        },
        {
          title: 'More',
          items: [
            // TODO: Add link to GitHub repo when public
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/your-org/ai-book-new',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI-Book Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
