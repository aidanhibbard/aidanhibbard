export type SiteSchemaIds = {
  siteUrl: string
  websiteId: string
  identityId: string
  pageUrl: (path: string) => string
  webpageId: (path: string) => string
}
