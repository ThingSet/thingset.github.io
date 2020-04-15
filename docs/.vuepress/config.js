module.exports = {
    title: 'ThingSet Protocol Specification',
    description: 'The ThingSet protocol provides a consistent, standardized way to configure, ' +
        'monitor and control ressource-constrained devices via different communication ' +
        'interfaces like Serial, LoRa, USB, Bluetooth or CAN.',
    head: [
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
        ['link', { rel: "manifest", href: "/favicons/site.webmanifest"}],
        ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#5bbad5"}],
        ['link', { rel: "shortcut icon", href: "/favicons/favicon.ico"}],
        ['meta', { name: "msapplication-TileColor", content: "#2b5797"}],
        ['meta', { name: "msapplication-config", content: "/favicons/browserconfig.xml"}],
        ['meta', { name: "theme-color", content: "#ffffff"}],
    ],
    base: '/thingset/',
    plugins: [
        'vuepress-plugin-export',
    ],
    themeConfig: {
        logo: '/favicons/apple-touch-icon.png',
        nav: [
            {
                text: 'History',
                ariaLabel: 'History Menu',
                items: [
                    { text: 'develop', link: '/' },
                    { text: 'v0.2', link: '/v0.2/' },
                    { text: 'v0.1', link: '/v0.1/' }
                ]
            }
        ],
        sidebar: {
            '/': [{
                title: 'Why ThingSet?',
                collapsable: false,
                children: [
                    '',
                    '1b_existing_solutions'
                ]
            },{
                title: 'Application Layer',
                collapsable: false,
                children: [
                    '2a_general',
                    '2b_text_mode',
                    '2c_binary_mode',
                ]
            },{
                title: 'Lower Layers',
                collapsable: false,
                children: [
                    '3a_serial',
                    '3b_can',
                    '3c_lora'
                ]
            }],
            '/v0.2/': [{
                title: 'Why ThingSet?',
                collapsable: false,
                children: [
                    '/v0.2/',
                    '1b_existing_solutions'
                ]
            },{
                title: 'Application Layer',
                collapsable: false,
                children: [
                    '2a_general',
                    '2b_functions'
                ]
            },{
                title: 'Lower Layers',
                collapsable: false,
                children: [
                    '3a_serial',
                    '3b_can',
                    '3c_lora'
                ]
            }],
            '/v0.1/': [
                'general',
                'functions',
                'can'
            ]
        },
        // if your docs are in a different repo from your main project:
        docsRepo: 'LibreSolar/thingset',
        // if your docs are not at the root of the repo:
        docsDir: 'docs',
        // if your docs are in a specific branch (defaults to 'master'):
        docsBranch: 'master',
        // defaults to false, set to true to enable
        editLinks: false,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Edit this page on GitHub!',

        lastUpdated: 'Last Updated', // string | boolean
    }
}
