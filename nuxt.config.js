export default {
  // Target: https://go.nuxtjs.dev/config-target
  //target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'buzzer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      'primeflex/primeflex.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  primevue: {
    theme:'lara-light-blue',
    components: ['Button', 'Message', 'InputText', 'Dialog','Chips', 'InputMask', 'Chip', 'DataView']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    'primevue/nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDy3XEmmm-34Pfs7sYlQsU2zURT0HuRt_4",
          authDomain: "locky-stream-tools.firebaseapp.com",
          databaseURL: "https://locky-stream-tools-default-rtdb.firebaseio.com",
          projectId: "locky-stream-tools",
          storageBucket: "locky-stream-tools.appspot.com",
          messagingSenderId: "663761155724",
          appId: "1:663761155724:web:9433ef33f6ffe9a3fa2da9"
        },
        services: {
          database: true,
          auth: true 
        }
      }
    ]

  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
  }
}
