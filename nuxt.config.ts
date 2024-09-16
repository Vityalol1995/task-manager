// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-icons'],
  css: [
      '@/assets/styles/style.scss'
  ],
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ]
})
