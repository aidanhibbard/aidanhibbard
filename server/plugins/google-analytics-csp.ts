const googleAnalyticsConnectSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://region1.google-analytics.com',
]

const googleAnalyticsScriptSrc = [
  'https://www.googletagmanager.com',
]

const googleAnalyticsImgSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
]

export default defineNitroPlugin((nitroApp) => {
  if (!process.env.GOOGLE_ANALYTICS_ID) {
    return
  }

  nitroApp.hooks.hook('nuxt-security:routeRules', (routeRules) => {
    for (const route of Object.keys(routeRules)) {
      routeRules[route] = defuReplaceArray(
        {
          headers: {
            contentSecurityPolicy: {
              'connect-src': googleAnalyticsConnectSrc,
              'script-src': googleAnalyticsScriptSrc,
              'img-src': googleAnalyticsImgSrc,
            },
          },
        },
        routeRules[route],
      )
    }
  })
})
