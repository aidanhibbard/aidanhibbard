import type { ExperienceItem } from '~/types/experience-item'

const experience: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Niche',
    from: 'Jul 2025',
    to: 'Present',
    description:
      'Crafting user facing services with Next and Tailwind. Implementing best practices around testing and infrastructure. Built user onboarding, payment processing, and handled data integrations.',
    location: 'Remote',
    tags: ['Next', 'ShadCN', 'Railway', 'Postgres', 'Stripe', 'Clerk'],
  },
  {
    title: 'Senior full-stack developer',
    company: 'Art of X',
    from: 'Sep 2025',
    to: 'December 2025',
    description:
      'Building infrastructure in Digital Ocean, implementing user facing services with Nuxt, implementing background processing with BullMQ.',
    location: 'Remote',
    contract: true,
    tags: ['Nuxt', 'Digital Ocean', 'Vite', 'Supabase', 'BullMQ', 'Valkey'],
  },
  {
    title: 'Software Engineer',
    company: 'LegalNature',
    from: 'Aug 2024',
    to: 'Jul 2025',
    description: '',
    location: 'Remote',
    contract: true,
    tags: ['Nuxt', 'Rails', 'Tailwind', 'Stripe'],
  },
  {
    title: 'Lead Developer',
    company: 'Ability Hub',
    from: 'Oct 2024',
    to: 'Jun 2025',
    description:
      'Made first commits on apps. Built cloud infrastructure in Digital Ocean for microservices. Used Nuxt and Strapi to create user-facing news services. Handled architecture reviews for client needs.',
    location: 'Remote',
    contract: true,
    tags: ['Nuxt', 'Strapi', 'Tailwind', 'Auth0', 'Stripe'],
  },
  {
    title: 'Software Developer',
    company: 'RealPage, Inc.',
    from: 'Dec 2020',
    to: 'Aug 2024',
    description: '',
    location: 'Remote',
    tags: ['Vue', 'Rails', 'Google Cloud', 'Postgres', 'PubSub', 'Hasura'],
  },
]

export default () => {
  const landingItems = computed((): ExperienceItem[] => experience.slice(0, 3))

  return {
    experience,
    landingItems,
  }
}
