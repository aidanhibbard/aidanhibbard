import type { PostListItem } from '#shared/types/content/post-list-item'
import type { SiteSchemaIds } from '#shared/types/content/site-schema-ids'

type ResolvePostsCollectionSchemaOrgInput = {
  posts: PostListItem[]
  totalPosts: number
  page: number
  pageSize: number
  description: string
}

export const resolvePostsCollectionSchemaOrg = (
  input: ResolvePostsCollectionSchemaOrgInput,
  ids: SiteSchemaIds,
): Record<string, unknown>[] => {
  const {
    posts,
    totalPosts,
    page,
    pageSize,
    description,
  } = input

  return [
    {
      '@type': 'CollectionPage',
      'name': 'Blog',
      description,
      'url': ids.pageUrl('/posts'),
      'isPartOf': {
        '@id': ids.websiteId,
      },
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': totalPosts,
        'itemListElement': posts.map((post, index) => ({
          '@type': 'ListItem',
          'position': (page - 1) * pageSize + index + 1,
          'item': {
            '@type': 'BlogPosting',
            'headline': post.title,
            'description': post.description,
            'datePublished': post.date,
            'url': ids.pageUrl(post.path),
            'author': {
              '@id': ids.identityId,
            },
          },
        })),
      },
    },
  ]
}
