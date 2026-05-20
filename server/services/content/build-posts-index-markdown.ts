import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import type { PostListItem } from '../../../shared/types/content/post-list-item'
import { formatPostListMarkdownLine } from '../../utils/format-post-list-markdown-line'

const POSTS_INDEX_DESCRIPTION = 'Notes on building software, debugging production systems, and the occasional side quest.'

export const buildPostsIndexMarkdown = async (event: H3Event): Promise<string> => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.site as { url?: string } | undefined)?.url ?? 'https://aidanhibbard.dev'

  const posts = await queryCollection(event, 'content')
    .where('path', 'LIKE', '/posts/%')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date')
    .all() as PostListItem[]

  const lines: string[] = [
    '# Blog',
    '',
    POSTS_INDEX_DESCRIPTION,
    '',
  ]

  if (posts.length === 0) {
    return lines.join('\n').trimEnd()
  }

  lines.push('## Posts', '')

  for (const post of posts) {
    lines.push(formatPostListMarkdownLine(post, siteUrl))
  }

  return lines.join('\n').trimEnd()
}
