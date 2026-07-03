---
title: How I built my portfolio for LLMs
date: '2026-05-20'
tags: ['nuxt', 'seo', 'cloudflare', 'llms']
description: Markdown pages, Content Signals, link headers, and a lot of deliberate plumbing.
sitemap:
  lastmod: 2026-05-20
ogImage:
  props:
    title: How I built my portfolio for LLMs
    description: Markdown pages, Content Signals, link headers, and a lot of deliberate plumbing.
---

## Background

This site is a portfolio and blog. Humans read it in a browser. Increasingly, other things read it too: crawlers, agents, answer engines, whatever you want to call the thing that hit your `/posts/` route with an odd `Accept` header at 2am.

HTML is a bad wire format for that. Layout chrome, hydration markers, nested divs, and a sidebar nobody asked for. Markdown is the format agents actually want. So I built the site twice, once for people and once for machines, without maintaining two copies of every article by hand.

Most of the stack is [Nuxt](https://nuxt.com/) modules. A fair chunk of the behavior is custom Nitro code that serves markdown, sets the headers agents expect, and wires up discovery metadata.

## The module stack

These are the pieces that matter for discoverability and machine-readable output:

- [`@nuxtjs/seo`](https://nuxtseo.com/docs/nuxt-seo/getting-started/introduction) — sitemap, robots, canonical URLs, OG helpers, and the rest of the boring SEO baseline
- [`nuxt-ai-ready`](https://nuxtseo.com/docs/ai-ready/getting-started/introduction) — `llms.txt`, Content Signals in `robots.txt`, IndexNow hooks
- [`@nuxt/content`](https://content.nuxt.com/) — markdown source of truth under `content/`
- [`nuxt-schema-org`](https://nuxtseo.com/docs/schema-org/getting-started/introduction) (via the SEO module) — JSON-LD for Person, BlogPosting, AboutPage
- [`nuxt-og-image`](https://nuxtseo.com/docs/og-image/getting-started/installation) — generated social images from page metadata
- [`nuxt-security`](https://nuxt-security.vercel.app/) — CSP, SRI, security headers on prerendered output

Humans still get a normal Vue app. The modules mostly handle metadata and static artifacts. The interesting part is how markdown escapes the content layer.

## The tooling and specs

A lot of the agent-readiness landscape right now comes from [Cloudflare](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/). I do not use their edge conversion product. I use their *standards* and validate against their scanner.

**[Content Signals](https://blog.cloudflare.com/content-signals-policy/)** extend what `robots.txt` can express. Not just "can you crawl this," but what you are allowed to do after you fetch it: index it for search, feed it to an answer engine, train on it. Responses can also carry `Content-Signal: search=yes, ai-train=yes, ai-input=yes`.

**[Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)** defines how that should work on the wire: `Accept: text/markdown`, markdown responses, `x-markdown-tokens`, discovery `Link` headers, Content Signals on the way out. Cloudflare can do the conversion on their network. I implement the same contract in Nitro with source files from `@nuxt/content`.

That means YAML frontmatter stays intact, no HTML-to-markdown guesswork, and headers that match what the spec documents. Agents learn one shape. Your app either speaks it or it does not.

## Markdown routes and content negotiation

Every supported page has a markdown alternate.

- `/about` → `/about.md`
- `/posts/building-durable-chats` → `/posts/building-durable-chats.md`

Two ways in:

1. **Explicit `.md` URL** — what you see in "View on GitHub" links and what I put in `llms.txt` notes
2. **`Accept: text/markdown`** on the HTML path — same body, negotiated response

A Nitro handler runs early in the stack and checks whether the request wants markdown. If yes, it resolves the page path, queries `@nuxt/content`'s raw endpoint, and returns `text/markdown` with the right headers. The `/raw/:slug.md` route handles title, description, and link injection automatically.

```typescript [server/api/content/markdown.get.ts]
const { path } = await getValidatedQuery(event, query => contentMarkdownQuerySchema.parse(query))
const rawPath = path === '/' ? '/index.md' : `${path}.md`
const markdown = await $fetch(`/raw${rawPath}`, { signal: event.request.signal })
setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
return markdown
```

Route rules no longer serve `*.md` paths dynamically — `@nuxt/content` handles `/raw/:slug.md` natively.

## Link headers and agent discovery

HTML responses advertise the markdown alternate with HTTP `Link` headers. That is what the [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) docs describe and what [Is Your Site Agent-Ready?](https://isitagentready.com/) checks for.

On the homepage:

```http
Link: </llms.txt>; rel="service-desc", </llms-full.txt>; rel="describedby", </index.md>; rel="alternate"; type="text/markdown"
```

On every other supported page, a `beforeResponse` hook adds something like:

```http
Link: </about>; rel="alternate"; type="text/html", </about.md>; rel="alternate"; type="text/markdown"
```

`rel="service-desc"` points at `llms.txt`. `rel="describedby"` points at the full-text aggregate. `rel="alternate"; type="text/markdown"` is the per-page source. Humans never see these headers. Agents do.

Markdown responses also set `Vary: Accept, Sec-Fetch-Dest` and `x-markdown-tokens` with a rough token estimate so clients can budget context windows without parsing the body first.

## @nuxt/content raw markdown endpoints

Starting with v3.12, `@nuxt/content` serves raw markdown natively at `/raw/:slug.md`. The module queries the content collection, prepends a title `h1` and description `blockquote` when the source lacks one, and appends a `<ul>` of the page's links. Hand-rolled markdown handlers, HTML-to-markdown conversion, and frontmatter generation are no longer needed for the primary path.

## llms.txt and llms-full.txt

[`nuxt-ai-ready`](https://nuxtseo.com/docs/ai-ready/guides/llms-txt) generates `/llms.txt` and `/llms-full.txt` at build time from site metadata and page inventory. I customize the overview with notes and a Profiles section for GitHub and LinkedIn:

```typescript [nuxt.config.ts]
aiReady: {
  llmsTxt: {
    notes: [
      'Personal site and blog of Aidan Hibbard…',
      'Markdown sources are available as .md routes for AI agents.',
    ],
    sections: [{ title: 'Profiles', links: [/* GitHub, LinkedIn */] }],
  },
},
hooks: {
  'ai-ready:llms-txt': (payload) => {
    payload.notes.push('Raw markdown: /page.md')
  },
},
```

`llms.txt` is the table of contents. `llms-full.txt` is the heavy export when something wants the whole site in one pull. Both are prerendered alongside `sitemap.xml` and `robots.txt`.

## Content Signals in robots.txt

The same module writes [Content Signal directives](https://nuxtseo.com/docs/ai-ready/guides/content-signals) into `robots.txt`:

```typescript [nuxt.config.ts]
aiReady: {
  contentSignal: {
    aiTrain: true,
    search: true,
    aiInput: true,
  },
  indexNow: true,
},
```

That matches my defaults: index the site, use it in answers, train on it. If that ever changes, I flip config instead of hand-editing policy files. IndexNow is enabled so new posts ping search engines after deploy.

## Checking the work with Is Your Site Agent-Ready?

Building all of this is one thing. Proving it works is another. I use [Is Your Site Agent-Ready?](https://isitagentready.com/), Cloudflare's public scanner, after deploys and whenever I touch markdown negotiation or `robots.txt`.

Paste your URL, pick **Content Site** if you are not running an API surface, and let it run. It checks a bunch of emerging standards in one pass instead of you manually curling headers and guessing.

For a portfolio like mine, the categories that matter are:

- **Discoverability** — valid `robots.txt`, sitemap, `Link` response headers on HTML pages
- **Content Accessibility** — whether `Accept: text/markdown` actually returns markdown
- **Bot Access Control** — AI bot rules in `robots.txt`, Content Signals, Web Bot Auth if you use it

It also scans protocol and commerce stuff (MCP Server Card, OAuth discovery, x402, and so on) that I do not need on a static blog. The UI lets you customize which checks run so you are not chasing MCP discovery on a site that will never expose a tool server.

The first time I ran it against an early draft of this site, the failures were embarrassingly literal. Missing or incomplete discovery headers. Markdown negotiation that worked on `.md` URLs but not on `Accept` for the HTML path. `robots.txt` that was fine for Google but said nothing useful to AI crawlers. That is the value: it turns "I think agents can read this" into a checklist with names attached to each spec.

When something fails, the site generates fix instructions you can paste into a coding agent. Treat those as a starting point, not gospel. They pointed me at the same easy wins Cloudflare advertises elsewhere: tighten `robots.txt`, expose sitemap and discovery metadata, get markdown negotiation right on the homepage first. Sound familiar? That is most of what this article describes.

It is not a substitute for reading your own response headers or hitting `/about.md` with curl. It is a fast regression test. Ship a post, run the scanner, make sure discoverability and content accessibility still pass.

## SEO and structured data for everyone

LLM readiness does not replace normal SEO. It stacks on top.

**Meta and robots.** Frontmatter can set `robots`, `description`, and sitemap `lastmod`. A shared `useContentSeo` composable applies `useSeoMeta`, defaults robots to `index, follow`, and wires OG image props from content.

**Schema.org.** Site-wide `Person` identity in config. Posts automatically get `BlogPosting` JSON-LD (headline, date, author, tags, OG image). About gets `AboutPage`. Resume exposes a `ProfilePage` schema on its route.

**Sitemap and canonical URLs.** `@nuxtjs/seo` generates the sitemap from the content collection, respects draft/noindex entries, and bumps post priority. Prerender crawls post routes from the content directory at build time.

**OG images.** Each page can set `ogImage.props` in frontmatter. A shared `SitePage` template renders title and description into a 1200×630 image so shares and crawlers get a consistent card.

The goal is one source of truth in markdown frontmatter that fans out to HTML meta, JSON-LD, OG images, and llms inventory without copy-paste.

## Copy markdown on every content page

Every article and content page (about, posts, resume) shares the same header row in `PageLayout`: share actions on the left, **Copy markdown** on the right.

The button is for humans. It is also how I sanity-check the agent path without curling headers.

Clicking it calls `/api/content/markdown?path=/posts/…` from the browser. That route now proxies to `/raw/:slug.md` from `@nuxt/content`. Whatever lands on the clipboard is what an agent should get from `/posts/foo.md` or from `Accept: text/markdown` on the HTML URL.

```typescript [app/composables/use-content-page.ts]
const markdown = await $fetch<string>('/api/content/markdown', { query: { path } })
await navigator.clipboard.writeText(markdown)
```

That keeps one code path. I am not maintaining a separate "export for copy" format. If Copy markdown paste looks wrong, negotiation is wrong too.

The GitHub icon in the share row points at the raw file in the repo (`content/about.md`, `content/posts/….md`). Copy markdown is the live site version with the same resolver the server uses at runtime. GitHub is the authoring source. Both should agree; when they do not, something is broken before any crawler finds it.

None of this shows up on [Is Your Site Agent-Ready?](https://isitagentready.com/) as a scored check. It is still worth having. Agents do not click buttons, but you do, and it is the fastest way to verify that the markdown layer is real on the page you just published.

## What I would do again

1. **Source markdown first.** Store everything in `@nuxt/content`, serve it directly, use HTML conversion only as fallback.
2. **Advertise alternates.** `Link` headers on HTML, `.md` routes, homepage discovery links. Do not make agents scrape the sidebar.
3. **Use the Nuxt SEO modules.** `llms.txt`, Content Signals, sitemap, schema, OG images are mostly config once content frontmatter is disciplined.
4. **Match the wire format.** Implement what Cloudflare documents: `Accept` negotiation, `Link` discovery, Content Signals, token counts. Source markdown beats HTML conversion when you control the app.
5. **Scan after deploy.** Run [Is Your Site Agent-Ready?](https://isitagentready.com/) on content-site checks and fix discoverability and markdown negotiation first.
6. **Add Copy markdown in the UI.** One button, same resolver as negotiation, instant QA before you run the scanner.

Agents are not going away. Neither is HTML for humans. The trick is making them share one content layer and being explicit in headers and policy files about what fetchers are allowed to do with it.

## References

- [Nuxt AI Ready introduction](https://nuxtseo.com/docs/ai-ready/getting-started/introduction)
- [llms.txt generation](https://nuxtseo.com/docs/ai-ready/guides/llms-txt)
- [AI Content Signals](https://nuxtseo.com/docs/ai-ready/guides/content-signals)
- [Nuxt SEO module](https://nuxtseo.com/docs/nuxt-seo/getting-started/introduction)
- [Cloudflare Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
- [Cloudflare Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/)
- [Is Your Site Agent-Ready?](https://isitagentready.com/)
- [llms.txt proposed standard](https://llmstxt.org/)
