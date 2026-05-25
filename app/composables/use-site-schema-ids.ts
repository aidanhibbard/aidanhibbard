import type { SiteSchemaIds } from '#shared/types/content/site-schema-ids'

const normalizeSiteUrl = (url: string): string => {
  return url.replace(/\/$/, '')
}

export default (): SiteSchemaIds => {
  const { url } = useSiteConfig()
  const siteUrl = normalizeSiteUrl(url)

  const pageUrl = (path: string): string => {
    return `${siteUrl}${path}`
  }

  return {
    siteUrl,
    websiteId: `${siteUrl}/#website`,
    identityId: `${siteUrl}/#identity`,
    pageUrl,
    webpageId: (path: string) => `${pageUrl(path)}#webpage`,
  }
}
