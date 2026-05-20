export const buildAlternateHtmlLink = (path: string): string => {
  const href = path === '/' ? '/' : path

  return `<${href}>; rel="alternate"; type="text/html"`
}
