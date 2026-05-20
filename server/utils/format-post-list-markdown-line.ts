import type { PostListItem } from '../../shared/types/content/post-list-item'

export const formatPostListMarkdownLine = (
  post: PostListItem,
  siteUrl: string,
): string => {
  const url = new URL(post.path, siteUrl).toString()
  const date = post.date ? ` (${post.date})` : ''
  const description = post.description ? ` — ${post.description}` : ''

  return `- [${post.title}](${url})${date}${description}`
}
