
const Guide = [
  { text: 'Get Started', link: '/guide/setup' },
  { text: '简介', link: '/guide/introduction' },
];

const functions = [
  { text: 'Core', link: '/packages/core/' ,items:[] },
  { text: 'Shared', link: '/packages/shared/' }
];

const DefaultSideBar = [
  { text: '快速指南', items: Guide },
  { text: '工具函数集合', items: functions },
];

export default {
  base: '/handy.js/',
  title: 'handy.js',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: true,
    lastUpdatedText: '最后修改时间',
    socialLinks: [{ icon: 'github', link: '' }],
    nav: [
      { text: '快速指南', link: '/guide/setup' },
      { text: '函数集合', link: '/packages/core' },
    ],
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '',
          items: DefaultSideBar,
        },
      ],
      '/packages/': [
        {
          text: '',
          items: DefaultSideBar,
        },
      ],
    },
    
  },
};
