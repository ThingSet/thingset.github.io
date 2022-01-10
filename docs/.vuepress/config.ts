import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

var path = require('path');

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en',
  title: 'ThingSet',
  description: 'The Data Accessibility Framework',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
    //['link', { rel: "manifest", href: "/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#5bbad5"}],
    ['link', { rel: "shortcut icon", href: "/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#2b5797"}],
    ['meta', { name: "msapplication-config", content: "/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  base: '/',
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        // exclude older versions from search
        isSearchable: (page) => !/^\/spec\/v0\.[1-3]+/.test(page.path),
      },
    ],
  ],
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    logo: '/images/thingset-logo.png',
    navbar: [
      {
        text: 'Specification',
        ariaLabel: 'Specification Menu',
        children: [
          { text: 'v0.5 (draft)', link: '/spec/v0.5/introduction' },
          { text: 'v0.4 (current)', link: '/spec/v0.4/introduction' },
          { text: 'v0.3', link: '/spec/v0.3/1a_introduction' },
          { text: 'v0.2', link: '/spec/v0.2/1a_introduction' },
          { text: 'v0.1', link: '/spec/v0.1/' },
          { text: 'Changelog', link: '/spec/changelog' }
        ]
      }
    ],
    sidebar: {
      '/spec/v0.1/': [
        'general',
        'functions',
        'can'
      ],
      '/spec/v0.2/': [
        {
          text: 'Why ThingSet?',
          children: [
            '1a_introduction',
            '1b_existing_solutions'
          ]
        },{
          text: 'Application Layer',
          children: [
            '2a_general',
            '2b_functions'
          ]
        },{
          text: 'Lower Layers',
          children: [
            '3a_serial',
            '3b_can',
            '3c_lora'
          ]
        }
      ],
      '/spec/v0.3/': [
        {
          text: 'Why ThingSet?',
          children: [
            '1a_introduction',
            '1b_existing_solutions'
          ]
        },{
          text: 'Application Layer',
          children: [
            '2a_general',
            '2b_text_mode',
            '2c_binary_mode',
          ]
        },{
          text: 'Lower Layers',
          children: [
            '3a_serial',
            '3b_can',
            '3c_lorawan'
          ]
        },{
          text: 'Protocol Mapping',
          children: [
            '4a_http',
            '4b_coap',
            '4c_mqtt'
          ]
        },{
          text: 'Tools',
          children: [
            '5a_serial',
            '5b_can',
          ]
        }
      ],
      '/spec/v0.4/': [
        {
          text: 'Why ThingSet?',
          children: [
            'introduction',
            'existing_solutions'
          ]
        },{
          text: 'Application Layer',
          children: [
            'appl_general_concept',
            'appl_data_structure',
            'appl_access_functions',
            'appl_text_mode',
            'appl_binary_mode',
          ]
        },{
          text: 'Transport Layers',
          children: [
            'transp_serial',
            'transp_can',
            'transp_lorawan'
          ]
        },{
          text: 'Protocol Mapping',
          children: [
            'mapping_http',
            'mapping_coap',
            'mapping_mqtt'
          ]
        },{
          text: 'Tools',
          children: [
            'tools_serial',
            'tools_can',
          ]
        }
      ],
      '/spec/v0.5/': [
        {
          text: 'Why ThingSet?',
          children: [
            'introduction',
            'existing_solutions'
          ]
        },{
          text: 'Application Layer',
          children: [
            'appl_general_concept',
            'appl_data_structure',
            'appl_access_functions',
            'appl_text_mode',
            'appl_binary_mode',
          ]
        },{
          text: 'Transport Layers',
          children: [
            'transp_serial',
            'transp_can',
            'transp_lorawan'
          ]
        },{
          text: 'Protocol Mapping',
          children: [
            'mapping_http',
            'mapping_coap',
            'mapping_mqtt'
          ]
        },{
          text: 'Tools',
          children: [
            'tools_serial',
            'tools_can',
          ]
        }
      ]
    },
    contributors: false,
    docsRepo: 'ThingSet/thingset.github.io',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    lastUpdated: true,
    sidebarDepth: 1
  }
})
