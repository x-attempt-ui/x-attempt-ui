import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import componentConfig from './config/components.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'A Vue 3 UI Framework | X Attempt UI',
  base: '/x-attempt-ui/',
  description: 'An awesome vue component library!',
  head: [['link', { rel: 'icon', href: '/x-attempt-ui/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/install' },
      { text: '组件', link: '/component/overview' },
    ],

    logo: 'logo.svg',

    siteTitle: '',

    sidebar: [
      {
        text: '基础',
        items: [
          { text: '安装', link: '/guide/install' },
          { text: '快速开始', link: '/guide/quickstart' },
        ],
      },
      {
        text: 'Overview 组件总览',
        items: [
          { text: 'Overview 组件总览', link: '/component/overview' },
        ],
      },
      {
        text: '基础组件',
        items: componentConfig,
      },
    ],

    outline: {
      level: [2, 3],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XinXiaoIsMe/x-attempt-ui' },
    ],

    footer: {
      copyright: 'Copyright © 2024-present XinXiaoIsMe',
    },

    search: {
      provider: 'local',
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
