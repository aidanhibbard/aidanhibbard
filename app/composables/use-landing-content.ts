import type { PostListItem } from '#shared/types/content/post-list-item'
import type { ContentSeoPage } from '#shared/types/content/content-seo-page'
import type { LandingContent } from '#shared/types/content/landing-content'
import type { ResumePage } from '#shared/types/content/resume-page'
import type { ResumeRole } from '#shared/types/content/resume-role'

type HomeContent = ContentSeoPage & {
  landing?: LandingContent
}

type ResumeContent = ContentSeoPage & {
  resume?: ResumePage
}

export const useLandingContent = async () => {
  const { data: home } = await useAsyncData('landing-home', () =>
    queryCollection('content').path('/').first() as Promise<HomeContent | null>,
  )

  const { data: resume } = await useAsyncData('landing-resume', () =>
    queryCollection('content').path('/resume').first() as Promise<ResumeContent | null>,
  )

  const { data: latestPosts } = await useAsyncData('landing-posts', () =>
    queryCollection('content')
      .where('path', 'LIKE', '/posts/%')
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'date')
      .limit(3)
      .all() as Promise<PostListItem[]>,
  )

  useContentSeo(home)

  const landing = computed(() => home.value?.landing)
  const roles = computed<ResumeRole[]>(() =>
    resume.value?.resume?.experience.slice(0, 4).map(entry => ({
      period: entry.period,
      title: entry.title,
      organization: entry.organization,
      summary: entry.summary,
    })) ?? [],
  )
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
