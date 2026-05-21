# Production smoke test

Run after every deploy to **https://aidanhibbard.dev** (spot-check **https://www.aidanhibbard.dev** resolves the same).

```bash
export URL="https://aidanhibbard.dev"
```

This checklist matches **this repo’s routes and config** — not generic Nuxt SEO defaults.

---

## Prod snapshot (last scan: 2026-05-20)

Re-run the curl checks below after deploy; update this table.

**Deploy:** `buildId: 1e89ecc9-e1a0-4c0c-848c-be15df57f1e5`

| Check | Expected | Prod now |
|-------|----------|----------|
| HTML `Content-Type` on `/` | `text/html` | ✅ |
| CSP `'wasm-unsafe-eval'` | present | ✅ |
| CSP `connect-src 'self'` | present | ✅ |
| All 7 post `_payload.json` | **200** JSON | ✅ |
| `/about/_payload.json` | **200** JSON | ✅ |
| `/_payload.json` (homepage SSR) | **404** | ✅ |
| `/posts/does-not-exist.md` | **404** | ✅ |
| `/posts/does-not-exist` HTML status | **404** | ❌ **200** (error UI shows “404 / Post not found”) |
| `/api/content/markdown?path=/posts/does-not-exist` | **404** | ✅ |
| `/posts/building-durable-chats` content | durable-chats article | ❌ still memory-leak duplicate (content not changed) |
| Discovery files (`sitemap`, `robots`, `llms*`) | **200** | ✅ (11 sitemap locs, llms-full ~52 KB) |
| OG PNG (`/_og/...`) | **200** `image/png` | ✅ |

---

## App surface area

| Route | Implementation | Prerender |
|-------|----------------|-----------|
| `/` | `app/pages/index.vue` → `useLandingContent()` | **no** (`routeRules['/'].prerender: false`, SSR) |
| `/about` | `PageShell` → Nuxt Content `/about` | yes |
| `/posts` | Blog index (`POSTS_PAGE_SIZE = 5`, debounced search) | yes |
| `/posts/[slug]` | `useContentPageAsyncData` + `ArticleShell` | yes (each `content/posts/*.md` via `listContentPostRoutes`) |
| `/resume` | `ResumeDocument` + `useContentPageAsyncData` | yes |

**Navigation** (`use-navigation.ts`): logo/sidebar header → `/`; primary links **About**, **Blog** (`/posts`), **Resume**. No “Home” nav item. Header also has GitHub + LinkedIn icons and theme toggle.

**Share / copy UI** (`PageLayout` = `ShareActions` + `CopyMarkdown`):

| Route | ShareActions (copy link, LinkedIn, GitHub source) | Copy markdown |
|-------|---------------------------------------------------|---------------|
| `/about`, `/posts/{slug}` | yes | yes → `GET /api/content/markdown?path=…` |
| `/posts` (index) | **no** | **no** |
| `/resume` | **no** | yes (`CopyMarkdown` in `ResumeDocument.vue` header) |

**Intentionally not maintained:** Twitter Card meta (`seo.automaticOgAndTwitterTags: false` in `nuxt.config.ts`). `twitter:*` tags may appear as side effects from `nuxt-og-image` — do **not** treat them as requirements.

**SEO that _is_ used:**

- `useSeoMeta`: `title`, `description`, `robots`, `ogImage` (content pages via `useContentSeo`)
- `defineSiteOgImage` → `SitePage.takumi` (`app/utils/define-site-og-image.ts`)
- `useSchemaOrg` + `resolveContentSchemaOrg` / `resolvePostsCollectionSchemaOrg` / resume `ProfilePage`
- `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-ai-ready` (`/llms.txt`, `/llms-full.txt`, IndexNow)

**Build / prerender** (`nuxt.config.ts`):

- `nitro.prerender.routes`: `['/sitemap.xml', …postRoutes]` + `crawlLinks: true`
- Prerendered static `.md` files are **deleted** after build (`deletePrerenderedMarkdownFiles`) — markdown is served at runtime by Nitro handlers, not as static files in `output/public`.

---

## 1. HTML pages render

Hard-refresh each route. Page must render as HTML in the browser (not raw source).

```bash
curl -sI "$URL/" | grep -i content-type
curl -sI "$URL/about" | grep -i content-type
curl -sI "$URL/posts/bullmq-retry-footgun" | grep -i content-type
```

- [ ] `/`, `/about`, `/posts`, `/resume` → **200** `text/html`
- [ ] All 7 post slugs → **200** `text/html`:
  - `bullmq-retry-footgun`, `oauth-token-refresh-races`, `webhooks-at-least-once`
  - `nuxt-hydration-gotcha`, `shipping-nuxt-processor`
  - `building-durable-chats`, `debugging-a-memory-leak`

---

## 2. Client navigation (homepage → elsewhere)

Start on `/` (SSR). Click header/nav links — do not paste URLs.

- [ ] Navigate to a post, `/about`, `/posts`, `/resume` without full reload
- [ ] No console CSP errors for `/_nuxt/*.wasm` (needs `'wasm-unsafe-eval'`)
- [ ] No 404 on `/posts/{slug}/_payload.json` during nav to a post

```bash
# Homepage is SSR — no root payload expected
curl -sI "$URL/_payload.json" | grep HTTP

curl -sI "$URL/posts/bullmq-retry-footgun/_payload.json" | grep -E 'HTTP|content-type'
curl -sI "$URL/about/_payload.json" | grep -E 'HTTP|content-type'
```

- [ ] Prerendered routes (`/about`, `/posts`, `/resume`, each `/posts/{slug}`) return **200** JSON payloads
- [ ] `/` has **no** `_payload.json` (SSR only)

---

## 3. Markdown system

Served by `server/plugins/00-markdown-prepend.ts` → `handle-markdown-request.ts` (`.md` URLs and `Accept: text/markdown` on HTML paths). Copy button uses `GET /api/content/markdown?path=…` (`server/api/content/markdown.get.ts`).

| Page | `.md` URL | Source (runtime) |
|------|-----------|------------------|
| `/` | `/index.md` | `buildHomepageMarkdown` (aggregated; not raw `content/index.md`) |
| `/about` | `/about.md` | `readContentMarkdown` (`content/about.md`) |
| `/posts` | `/posts.md` | `buildPostsIndexMarkdown` |
| `/resume` | `/resume.md` | `readResumeMarkdown` (structured CV from content frontmatter) |
| `/posts/{slug}` | `/posts/{slug}.md` | `readContentMarkdown` (`content/posts/{slug}.md`) |

**Use GET for body checks.** `HEAD` on `.md` returns **204** No Content (still sets `content-type` and `x-markdown-tokens`).

```bash
curl -sI "$URL/index.md" | grep -iE 'HTTP|content-type|x-markdown'
curl -s "$URL/index.md" | head -8
curl -s "$URL/posts/bullmq-retry-footgun.md" | head -8
curl -sI "$URL/posts/bullmq-retry-footgun.md" | grep -i x-markdown-tokens
curl -sI "$URL/about" -H 'Accept: text/markdown' | grep -i content-type
curl -s "$URL/api/content/markdown?path=/about" | head -8
curl -sS -o /dev/null -w '%{http_code}\n' "$URL/posts/does-not-exist.md"
curl -sS -o /dev/null -w '%{http_code}\n' "$URL/posts/does-not-exist"
```

- [ ] `.md` routes for valid pages → **200** `text/markdown; charset=utf-8`
- [ ] `x-markdown-tokens` on `.md` responses (especially long posts)
- [ ] `Accept: text/markdown` on HTML paths returns markdown
- [ ] `/api/content/markdown?path=/about` → **200** markdown (powers **Copy markdown**)
- [ ] `/posts/does-not-exist.md` → **404**
- [ ] `/posts/does-not-exist` HTML → **404** (not 200 with error UI)
- [ ] `/api/content/markdown?path=/posts/does-not-exist` → **404** (no HTML-converted garbage)

### Agent discovery (`Link` headers on HTML)

`server/plugins/agent-discovery.ts` adds markdown alternates on supported HTML pages. **`llms.txt` / `llms-full.txt` service links only on `/`** (also in `routeRules['/'].headers.link`).

```bash
curl -sI "$URL/" | grep -i '^link:'
curl -sI "$URL/posts" | grep -i '^link:'
curl -sI "$URL/posts/bullmq-retry-footgun" | grep -i '^link:'
```

- [ ] `/` → `</index.md>; rel="alternate"; type="text/markdown"`, plus `</llms.txt>; rel="service-desc"`, `</llms-full.txt>; rel="describedby"`
- [ ] `/posts` → `</posts.md>; rel="alternate"; type="text/markdown"` only (no llms service links)
- [ ] Other content pages → `</{path}.md>; rel="alternate"; type="text/markdown"` only

---

## 4. Discovery files (`@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-ai-ready`)

```bash
curl -sI "$URL/sitemap.xml" | grep HTTP
curl -sI "$URL/robots.txt" | grep HTTP
curl -sI "$URL/llms.txt" | grep HTTP
curl -sI "$URL/llms-full.txt" | grep HTTP
curl -s "$URL/sitemap.xml" | grep -c '<loc>'   # expect 11: 4 pages + 7 posts
curl -s "$URL/llms.txt" | rg 'Raw markdown|Notes' -A1
curl -s "$URL/llms-full.txt" | wc -c           # expect non-trivial size (not empty stub)
```

- [ ] All **200**
- [ ] `sitemap.xml`: `/`, `/about`, `/posts`, `/resume`, all 7 posts; locs use `https://aidanhibbard.dev`
- [ ] `robots.txt`: `Disallow: /api/**`, sitemap URL, `Content-Signal` lines from `aiReady.contentSignal`
- [ ] `llms.txt`: site summary, Profiles (GitHub, LinkedIn), page/post index; Notes include hook line **`Raw markdown: /page.md`** (`ai-ready:llms-txt` hook in `nuxt.config.ts`)
- [ ] `llms-full.txt`: expanded markdown content (not empty stub)

---

## 5. Security (`nuxt-security`)

```bash
curl -sI "$URL/" | grep -iE '^(content-security-policy|x-frame-options|x-content-type-options|referrer-policy|strict-transport-security|cross-origin-resource-policy):'
```

- [ ] Headers present on `/`
- [ ] CSP `connect-src` includes `'self'` (payload JSON, build meta, `/_scripts/*` when GA enabled)
- [ ] CSP `script-src` includes `'wasm-unsafe-eval'`
- [ ] With `GOOGLE_ANALYTICS_ID`: GTM in `script-src`; GA hosts in `connect-src` / `img-src` (`server/plugins/google-analytics-csp.ts`)

Browser after hard refresh + nav:

- [ ] No blocked WASM / same-origin fetch errors
- [ ] GA: `POST /_scripts/p/www.google-analytics.com/...` → **204** (when enabled)

---

## 6. Titles, descriptions & OG images

Title template: `%s %separator Aidan Hibbard` (`nuxt.config.ts` → `app.head.titleTemplate`).

```bash
curl -s "$URL/" | grep -E '<title>|name="description"|property="og:image"'
curl -s "$URL/posts/bullmq-retry-footgun" | grep -E '<title>|name="description"|property="og:image"'
curl -sI "$(curl -s "$URL/" | grep -o 'property="og:image" content="[^"]*"' | cut -d'"' -f4)" | grep HTTP
```

- [ ] `/` title: `Home | Aidan Hibbard` (from `content/index.md` via `useLandingContent`)
- [ ] Post title: `{post title} | Aidan Hibbard`
- [ ] `/posts` title: `Blog | Aidan Hibbard`
- [ ] `/resume` title: `Resume | Aidan Hibbard`
- [ ] `<meta name="description">` matches page/content frontmatter (or site default on homepage)
- [ ] `property="og:image"` points at `/_og/...` PNG (`defineSiteOgImage` / `SitePage.takumi`)
- [ ] OG PNG loads **200** and shows site layout with real title (not literal word `"title"` or stock NuxtSEO template)

**Not in scope:** Twitter Card meta tags.

---

## 7. Schema.org (`nuxt-schema-org`)

View source → `application/ld+json` (`data-nuxt-schema-org`).

- [ ] `/`: `WebSite` + identity `Person` + page `WebPage` (via `useContentSeo` / defaults)
- [ ] `/about`: `WebPage` + `AboutPage` (`resolveContentSchemaOrg`)
- [ ] `/posts`: `CollectionPage` + `BlogPosting` entries for listed posts (`resolvePostsCollectionSchemaOrg`)
- [ ] `/posts/{slug}`: `WebPage` + auto `BlogPosting` when `date` + `title` present (`resolveContentSchemaOrg`)
- [ ] `/resume`: `WebPage` + `ProfilePage` (`app/pages/resume.vue`)

---

## 8. Page-specific UI

### `/` (homepage)

- [ ] Featured post = most recent by date; two smaller cards beside/below it
- [ ] About + resume teaser sections from `content/index.md` `landing` + resume preview roles
- [ ] CTAs: View all posts, Read the full story, View full resume

### `/posts`

- [ ] Lists posts newest first, **5 per page**, pagination when >5 posts
- [ ] Search filters by title/description (300ms debounce)
- [ ] Empty state when no matches
- [ ] **No** share/copy toolbar (not wrapped in `PageLayout`)

### `/posts/{slug}` (`ArticleShell` + `PageLayout`)

- [ ] `// BLOG` label, formatted date, title, description in header
- [ ] Body via `<ContentRenderer>`; duplicate markdown `# title` hidden (`[&_h1:first-of-type]:hidden`)
- [ ] **Share** toolbar order: copy link → LinkedIn → GitHub source (`content/posts/{slug}.md`)
- [ ] **Copy markdown** → `/api/content/markdown?path=/posts/{slug}`
- [ ] TOC in right rail on `lg+` when headings exist

### `/about` (`PageShell` + `PageLayout`)

- [ ] Same share/copy toolbar + TOC pattern as posts
- [ ] Header shows `// ABOUT` and description as headline

### `/resume` (`ResumeDocument`)

- [ ] Structured CV: summary, skills grid, experience entries
- [ ] Contact icons (email, LinkedIn, GitHub) + **Copy markdown** only — **no** `ShareActions`

---

## 9. Content checks

- [ ] `/posts/building-durable-chats` shows the **durable chats** article (known bad state: file duplicates `debugging-a-memory-leak.md`; also wrong title in `llms.txt` index until fixed)
- [ ] Code blocks: copy button works (`ProsePre`, `CodeGroup`)
- [ ] Heading anchor copy works (`ProseH2` etc.)

---

## 10. Regression watchlist

| Bug | Verify |
|-----|--------|
| HTML served as `text/markdown` | `curl -sI /` → `text/html`; browser renders page (`agent-discovery.ts` must not treat HTML as markdown) |
| `connect-src` missing `'self'` | Console blocks `/_payload.json`, build meta |
| Missing `'wasm-unsafe-eval'` | Console blocks `/_nuxt/*.wasm` |
| Post `_payload.json` 404 on nav | Network tab during SPA nav from `/` to a post; curl post payload → **200** after deploy |
| Invalid post slug returns 200 | `curl -sS -o /dev/null -w '%{http_code}\n' /posts/does-not-exist` → **404** |
| Invalid post API returns garbage markdown | `curl /api/content/markdown?path=/posts/does-not-exist` → **404**, not converted error HTML |
| OG image shows `"title"` placeholder | Open `og:image` URL in browser |
| CF `email-decode.min.js` CSP on `/about` | Optional: `cdn-cgi/scripts/.../email-decode.min.js` blocked |

---

## 11. Quick curl sweep

```bash
URL="https://aidanhibbard.dev"
for route in / /about /posts /resume \
  /posts/bullmq-retry-footgun /posts/oauth-token-refresh-races \
  /posts/webhooks-at-least-once /posts/nuxt-hydration-gotcha \
  /posts/shipping-nuxt-processor /posts/building-durable-chats \
  /posts/debugging-a-memory-leak; do
  md="${route}.md"; [ "$route" = "/" ] && md="/index.md"
  printf "%s  html=%s  md=%s\n" "$route" \
    "$(curl -sS -o /dev/null -w '%{http_code}|%{content_type}' "$URL$route")" \
    "$(curl -sS -o /dev/null -w '%{http_code}|%{content_type}' "$URL$md")"
done
```

Expected: all valid routes `html=200|text/html…`, all valid `md=200|text/markdown…`.

Extra checks after deploy:

```bash
curl -sS -o /dev/null -w 'post-payload=%{http_code} invalid-html=%{http_code} invalid-md=%{http_code}\n' \
  "$URL/posts/bullmq-retry-footgun/_payload.json" \
  "$URL/posts/does-not-exist" \
  "$URL/posts/does-not-exist.md"
# expect: post-payload=200 invalid-html=404 invalid-md=404
```

---

## Sign-off

| Area | Pass | Notes |
|------|------|-------|
| HTML pages | ✅ | All routes 200 `text/html` |
| Client nav / payloads | ✅ | All 7 post payloads 200; root `_payload.json` 404 (SSR) |
| Markdown + `/api/content/markdown` | ⚠️ | Valid routes OK; invalid slug API **404** ✅; invalid slug HTML still **200** |
| Discovery files | ✅ | sitemap 11 locs, robots, llms.txt, llms-full ~52 KB |
| Security / CSP | ✅ | wasm-unsafe-eval, connect-src self, security headers present |
| Titles / descriptions / OG PNG | ✅ | OG PNG 200; building-durable-chats title wrong (content bug, untouched) |
| Schema.org | ✅ | Not re-verified this scan (unchanged from prior) |
| Page UI (per route) | — | Browser-only (not curl-verified) |
| GA (if enabled) | — | GTM in CSP; browser POST not verified |

**Tested by:** _______________  
**Date:** _______________  
**Deploy / commit:** _______________
