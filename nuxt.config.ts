const cacheTTL = 60 * 60 * 24 * 365; // 1 year – you can set this to whatever you want

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['@/assets/scss/main.scss'],

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/img/**': { headers: { 'cache-control': `public,max-age=${cacheTTL},s-maxage=${cacheTTL}` } },
      '/_nuxt/**': { headers: { 'cache-control': `public,max-age=${cacheTTL},s-maxage=${cacheTTL}` } },
    },
  },

  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/icon', '@vueuse/nuxt'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  googleFonts: {
    // https://google-fonts.nuxtjs.org/getting-started/options
    families: {
      Inter: [100, 300, 400, 500, 600, 700],
    },
  },
});
