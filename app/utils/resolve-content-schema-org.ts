import type { ContentSeoPage } from '#shared/types/content/content-seo-page'
import type { SiteSchemaIds } from '#shared/types/content/site-schema-ids'
import { defineWebPage } from 'nuxt-schema-org/schema'

const includesSchemaType = (
  entry: Record<string, unknown>,
  type: string,
): boolean => {
  const schemaType = entry['@type']

  if (Array.isArray(schemaType)) {
    return schemaType.includes(type)
  }

  return schemaType === type
}

const resolveCustomSchemaOrg = (
  page: ContentSeoPage,
): Record<string, unknown>[] => {
  if (!page.schemaOrg) {
    return []
  }

  return Array.isArray(page.schemaOrg) ? page.schemaOrg : [page.schemaOrg]
}

const resolveAbsoluteImageUrl = (
  imageUrl: string,
  siteUrl: string,
): string => {
  if (/^https?:\/\//.test(imageUrl)) {
    return imageUrl
  }

  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const normalizedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`

  return `${normalizedSiteUrl}${normalizedPath}`
}

const resolveBlogPostingNode = (
  page: ContentSeoPage,
  ids: SiteSchemaIds,
): Record<string, unknown> | null => {
  const path = page.path

  if (!path?.startsWith('/posts/') || !page.date || !page.title) {
    return null
  }

  const node: Record<string, unknown> = {
    '@type': 'BlogPosting',
    headline: page.title,
    datePublished: page.date,
    url: ids.pageUrl(path),
    mainEntityOfPage: {
      '@id': ids.webpageId(path),
    },
    author: {
      '@id': ids.identityId,
    },
    publisher: {
      '@id': ids.identityId,
    },
  }

  if (page.description) {
    node.description = page.description
  }

  if (page.tags?.length) {
    node.keywords = page.tags.join(', ')
  }

  if (page.ogImage?.url) {
    node.image = resolveAbsoluteImageUrl(page.ogImage.url, ids.siteUrl)
  }

  return node
}

export const resolveContentSchemaOrg = (
  page: ContentSeoPage | null | undefined,
  ids: SiteSchemaIds,
): Record<string, unknown>[] => {
  if (!page) {
    return []
  }

  const path = page.path ?? ''
  const autoBlogPosting = resolveBlogPostingNode(page, ids)
  const nodes: Record<string, unknown>[] = []

  for (const entry of resolveCustomSchemaOrg(page)) {
    if (autoBlogPosting && includesSchemaType(entry, 'BlogPosting')) {
      continue
    }

    if (path === '/about' && includesSchemaType(entry, 'AboutPage')) {
      continue
    }

    nodes.push(entry)
  }

  if (path === '/about') {
    nodes.push(defineWebPage({
      '@type': 'AboutPage',
    }))
  }

  if (autoBlogPosting) {
    nodes.push(autoBlogPosting)
  }

  return nodes
}
