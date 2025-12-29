import type { ExperienceItem } from '~/types/experience-item'

const contact = {
  name: 'Aidan Hibbard',
  email: 'aidanchibbard@gmail.com',
  phone: '(458) 600-6584',
  links: {
    linkedin: 'https://www.linkedin.com/in/aidan-hibbard/',
    website: 'https://aidanhibbard.dev/',
    github: 'https://github.com/aidanHibbard',
  },
}

const professionalSummary = 'Senior engineer with a history of building robust and scalable services. Proven track record of working in cross-functional teams to deliver reliable, user-centered products. Ranging from data processing and internal tooling to client-facing platforms.'

const technicalSummary = [
  {
    category: 'Frontend',
    items: ['Vite', 'Webpack', 'JSX', 'Vue', 'Tailwind', 'Next', 'Nuxt', 'Vike'],
  },
  {
    category: 'Backend',
    items: ['Ruby on Rails', 'Spring Boot', 'Node.js (Express, NestJS, NitroJS)'],
  },
  {
    category: 'Job Queues',
    items: ['BullMQ', 'RabbitMQ', 'Sidekiq', 'Delayed Jobs'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Hasura'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Vercel', 'Digital Ocean'],
  },
  {
    category: 'Architecture',
    items: [
      'Microservices',
      'Serverless',
      'Real-time systems (WebSockets, SSE)',
      'Micro-frontends',
      'Pub/Sub',
      'REST',
      'GraphQL',
      'Soap',
    ],
  },
]

const experience: ExperienceItem[] = [
  {
    title: 'Senior Developer',
    company: 'Niche',
    from: 'Jul 2025',
    to: 'Present',
    bullets: [
      'Led projects for implementing usage based pricing, and self onboarding for users',
      'Researched vendor APIs, and designed implementations with partners',
      'Mentored developers on patterns, and performed product reviews',
      'Instrumented practices for observability, CI/CD, and testing',
      'Worked directly with customers to create business solutions',
    ],
    location: 'Remote',
    tags: ['Usage-based pricing', 'Onboarding', 'CI/CD', 'Observability', 'Testing'],
  },
  {
    title: 'Software Developer',
    company: 'Legal Nature',
    from: 'Aug 2024',
    to: 'Jul 2025',
    bullets: [
      'Developing features in an API-first architecture with Nuxt and Rails',
      'Instrumented TypeScript adoption, testing, and mentored developers on SSR best practices',
      'Migrated payment services from Recurly to Stripe',
      'Led migration from Nuxt 2 to 3 with micro-frontends',
    ],
    location: 'Remote',
    contract: true,
    tags: ['Nuxt', 'Rails', 'TypeScript', 'Stripe', 'Micro-frontends', 'SSR'],
  },
  {
    title: 'Software Developer',
    company: 'Central Oregon Community College',
    from: 'Mar 2025',
    to: 'Jun 2025',
    bullets: [
      'Used Vue, Tailwind and TypeScript to develop a dynamic program discovery service for incoming students',
      'Implemented design guidelines and tokens following the schools theme',
      'Built a custom Vite - Rollup plugin to output generated files that are deployable to the schools CMS',
      'Mentored technical faculty on Vue, and web APIs',
      'Implemented Cloudflare Turnstile to protect public facing forms and endpoints',
    ],
    location: 'Remote',
    contract: true,
    tags: ['Vue', 'Tailwind', 'TypeScript', 'Vite', 'Rollup', 'Cloudflare'],
  },
  {
    title: 'Lead Developer',
    company: 'Ability Hub',
    from: 'Sep 2024',
    to: 'Apr 2025',
    bullets: [
      'Built a learning platform for climate regulations, and sustainability resources using Nuxt, and Tailwind',
      'Implemented IAC, CI, built deployment pipelines, and handled FinOps',
      'Created a custom document search using OpenAI and Digital Ocean',
      'Implemented B2B SSO with Auth0',
      'Handled subscriptions and payments with Stripe',
      'Used Strapi to build an admin media server for videos, podcasts, and graphics',
      'Secured public facing forms and endpoints with Cloudflare',
    ],
    location: 'Remote',
    contract: true,
    tags: ['Nuxt', 'Tailwind', 'Digital Ocean', 'OpenAI', 'Auth0', 'Stripe', 'Strapi', 'Cloudflare'],
  },
  {
    title: 'Software Developer',
    company: 'RealPage',
    from: 'May 2022',
    to: 'Aug 2024',
    bullets: [
      'Worked across full stack Rails and Vue applications using Webpacker',
      'Developed real-time WebSocket services for lead forms and lease term fetching',
      'Maintained microservices deployed with Kubernetes using Cloud Pub/Sub and gRPC',
      'Created custom vite plugins to publish Vue apps as embeddable widgets in the company CMS',
      'Developed public facing GraphQL endpoints for client websites',
      'Implemented secure ID upload and verification for renters within existing lead forms',
      'Led a structured migration from Vue two to three, aligning stakeholders around milestones and minimizing disruption to production features',
    ],
    location: 'Remote',
    tags: ['Rails', 'Vue', 'Webpacker', 'WebSockets', 'Kubernetes', 'gRPC', 'GraphQL', 'Google Cloud'],
  },
  {
    title: 'Lead Developer',
    company: 'GreenT Climate',
    from: 'Jul 2023',
    to: 'May 2024',
    bullets: [
      'Developed data-processing services using NitroJS and BullMQ',
      'Created interactive data dashboards with Nuxt and D3.js for data visualization',
      'Researched integrations with Energy Star and utility providers',
      'Managed Google Cloud Infrastructure with Cloud Run and Cloud SQL',
      'Created private NPM modules to share API logic across apps',
    ],
    location: 'Remote',
    contract: true,
    tags: ['NitroJS', 'BullMQ', 'Nuxt', 'D3.js', 'Google Cloud', 'Cloud Run', 'Cloud SQL'],
  },
]

export default () => {
  const landingItems = computed((): ExperienceItem[] =>
    experience.slice(0, 3).map(item => ({
      ...item,
      bullets: item.bullets.slice(0, 2),
    })),
  )

  return {
    contact,
    professionalSummary,
    technicalSummary,
    experience,
    landingItems,
  }
}
