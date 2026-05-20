export type ContentSeoPage = {
  path?: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
  seo?: {
    title?: string
    description?: string
    robots?: string
    [key: string]: unknown
  }
  robots?: string | boolean
  schemaOrg?: Record<string, unknown> | Record<string, unknown>[]
  ogImage?: {
    component?: string
    props?: Record<string, unknown>
    url?: string
  }
}
