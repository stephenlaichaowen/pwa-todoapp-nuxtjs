
export default {
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#1177da' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' },
      { name: '"mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { src: '/setup.js' }
    ]
  },

  target: 'static',

  components: true,

  css: [
    '@/assets/css/styles.css'
  ],

  loading: { color: '#fff' },

  modules: [
    '@nuxtjs/pwa',
  ],

  buildModules: [
    // '@nuxtjs/pwa'
  ],

  pwa: {
    icon: {
      fileName: 'icon.png',
    },
    manifest: {
      name: 'My Awesome Todo List App',
      start_url: '/',
      display: 'fullscreen',
      orientation: 'portrait',
      theme_color: '#1177da'
    }
  }
}
