export const cspSelf = '\'self\'' as const

export const cspScriptSrc = [
  cspSelf,
  'https:',
  '\'unsafe-inline\'',
  '\'strict-dynamic\'',
  '\'nonce-{{nonce}}\'',
  '\'wasm-unsafe-eval\'',
] as const

export const googleAnalyticsConnectSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://region1.google-analytics.com',
  'https://www.google.com',
] as const

export const googleAnalyticsScriptSrc = [
  'https://www.googletagmanager.com',
] as const

export const googleAnalyticsImgSrc = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
] as const

export const buildConnectSrc = (googleAnalyticsEnabled: boolean): string[] => {
  if (!googleAnalyticsEnabled) {
    return [cspSelf]
  }

  return [cspSelf, ...googleAnalyticsConnectSrc]
}
