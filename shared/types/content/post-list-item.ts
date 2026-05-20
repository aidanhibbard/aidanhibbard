import type { PostTheme } from '#shared/types/content/post-theme'

export type PostListItem = {
  path: string
  title: string
  description: string
  date: string
  theme: PostTheme
  tags?: string[]
}
