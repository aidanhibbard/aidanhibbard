import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import type { PostListItem } from '../../../shared/types/content/post-list-item'
import type { LandingContent } from '../../../shared/types/content/landing-content'
import { formatPostListMarkdownLine } from '../../utils/format-post-list-markdown-line'

type HomeContent = {
  title?: string
  description?: string
  landing?: LandingContent
}

export const buildHomepageMarkdown = async (event: H3Event): Promise<string> => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.site as { url?: string } | undefined)?.url ?? 'https://aidanhibbard.dev'

  const home = await queryCollection(event, 'content').path('/').first() as HomeContent | null
  const posts = await queryCollection(event, 'content')
    .where('path', 'LIKE', '/posts/%')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date')
    .limit(3)
    .all() as PostListItem[]

  const lines: string[] = [
    `# ${home?.title ?? 'Home'}`,
    '',
  ]

  if (home?.description) {
    lines.push(home.description, '')
  }

  if (posts.length > 0) {
    lines.push('## Latest writing', '')

    for (const post of posts) {
      lines.push(formatPostListMarkdownLine(post, siteUrl))
    }

    lines.push('')
  }

  const landing = home?.landing

  if (landing) {
    lines.push(
      `## ${landing.heroHeadline}`,
      '',
      landing.heroEyebrow,
      '',
      landing.heroLead,
      '',
    )

    if (landing.heroFocus) {
      lines.push(landing.heroFocus, '')
    }

    lines.push(
      `- [${landing.heroCtaPrimaryLabel}](${siteUrl}/posts)`,
      `- [${landing.heroCtaSecondaryLabel}](${siteUrl}/resume)`,
      '',
      `## ${landing.blogHeadline}`,
      '',
      landing.blogLead,
      '',
      '## About',
      '',
      `### ${landing.aboutHeadline}`,
      '',
      landing.aboutLead,
      '',
      landing.aboutBody,
      '',
    )
  }

  return lines.join('\n').trimEnd()
}
