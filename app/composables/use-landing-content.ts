import type { PostListItem } from '#shared/types/content/post-list-item'
import type { ContentSeoPage } from '#shared/types/content/content-seo-page'
import type { LandingContent } from '#shared/types/content/landing-content'

type HomeContent = ContentSeoPage & {
  landing?: LandingContent
}

export default () => {
  const { data: home } = useAsyncData('landing-home', () =>
    queryCollection('content').path('/').first() as Promise<HomeContent | null>,
  )

  const { data: latestPosts } = useAsyncData('landing-posts', () =>
    queryCollection('content')
      .where('path', 'LIKE', '/posts/%')
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'date')
      .limit(3)
      .all() as Promise<PostListItem[]>,
  )

  useContentSeo(home)

  const landing = computed(() => home.value?.landing)
  const latestPostsList = computed(() => latestPosts.value ?? [])
  const hasPosts = computed(() => latestPostsList.value.length > 0)

  return {
    landing,
    latestPosts: latestPostsList,
    hasPosts,
  }
}
