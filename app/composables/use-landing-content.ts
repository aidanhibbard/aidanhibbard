import type { PostListItem } from '#shared/types/content/post-list-item'
import type { ContentSeoPage } from '#shared/types/content/content-seo-page'
import type { LandingContent } from '#shared/types/content/landing-content'
import type { ResumeRole } from '#shared/types/content/resume-role'

type HomeContent = ContentSeoPage & {
  landing?: LandingContent
}

type ResumeContent = ContentSeoPage & {
  roles?: ResumeRole[]
}

export const useLandingContent = () => {
  const { data: home } = useAsyncData('landing-home', () =>
    queryCollection('content').path('/').first() as Promise<HomeContent | null>,
  )

  const { data: resume } = useAsyncData('landing-resume', () =>
    queryCollection('content').path('/resume').first() as Promise<ResumeContent | null>,
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
  const roles = computed(() => resume.value?.roles ?? [])
  const currentRole = computed(() => roles.value[0] ?? null)
  const pastRoles = computed(() => roles.value.slice(1))
  const featuredPost = computed(() => latestPosts.value?.[0] ?? null)
  const sidebarPosts = computed(() => latestPosts.value?.slice(1) ?? [])
  const hasPosts = computed(() => (latestPosts.value?.length ?? 0) > 0)

  return {
    landing,
    currentRole,
    pastRoles,
    featuredPost,
    sidebarPosts,
    hasPosts,
  }
}
