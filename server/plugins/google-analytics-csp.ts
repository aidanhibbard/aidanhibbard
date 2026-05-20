const googleAnalyticsConnectSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://region1.google-analytics.com',
  'https://www.google.com',
]

const googleAnalyticsScriptSrc = [
  'https://www.googletagmanager.com',
]

const googleAnalyticsImgSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
]

const mergeCspSources = (
  existing: string | string[] | false | undefined,
  additions: string[],
): string[] => {
  const base = existing === false
    ? []
    : Array.isArray(existing)
      ? existing
      : existing
        ? [existing]
        : []

  return [...new Set(['\'self\'', ...base, ...additions])]
}

export default defineNitroPlugin((nitroApp) => {
  if (!process.env.GOOGLE_ANALYTICS_ID) {
    return
  }

  nitroApp.hooks.hook('nuxt-security:routeRules', (routeRules) => {
    for (const route of Object.keys(routeRules)) {
      const rule = routeRules[route] ?? { headers: {} }
      const headers = rule.headers === false ? {} : (rule.headers ?? {})
      const existingCsp = headers.contentSecurityPolicy === false
        ? {}
        : (headers.contentSecurityPolicy ?? {})

      headers.contentSecurityPolicy = {
        ...existingCsp,
        'connect-src': mergeCspSources(existingCsp['connect-src'], googleAnalyticsConnectSrc),
        'script-src': mergeCspSources(existingCsp['script-src'], googleAnalyticsScriptSrc),
        'img-src': mergeCspSources(existingCsp['img-src'], googleAnalyticsImgSrc),
      }

      routeRules[route] = {
        ...rule,
        headers,
      }
    }
  })
})
