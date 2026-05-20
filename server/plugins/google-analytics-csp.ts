import {
  cspSelf,
  googleAnalyticsConnectSrc,
  googleAnalyticsImgSrc,
  googleAnalyticsScriptSrc,
} from '../../shared/google-analytics-csp-sources'

const mergeCspSources = (
  existing: string | string[] | false | undefined,
  additions: readonly string[],
): string[] => {
  const base = existing === false
    ? []
    : Array.isArray(existing)
      ? existing
      : existing
        ? [existing]
        : []

  return [...new Set([cspSelf, ...base, ...additions])]
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
