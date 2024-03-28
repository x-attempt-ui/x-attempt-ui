import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'X Attempt UI',
  base: '/x-attempt-ui/',
  description: 'An awesome vue component library!',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/install' },
      { text: '组件', link: '/component/overview' },
    ],

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
        items: [
          { text: 'Button组件', link: '/component/button' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
