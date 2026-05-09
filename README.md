# hn-nuxt

A minimal Hacker News reader built with Nuxt 3 — front-page feed, item pages
with article previews and a recursive comment tree, server-side extraction of
the linked article via Readability, and infinite scroll on the feed.

## Stack

- **Nuxt 3.21** (Vite, Nitro 2.13, Vue 3.5) — file-based routing, SSR, layouts, `error.vue`
- **TypeScript** on the server side (`server/`)
- **Tailwind CSS 3** + SCSS, scoped `:deep()` typography for extracted articles
- **VueUse** — `useIntersectionObserver` for the infinite-scroll sentinel
- **@mozilla/readability + jsdom + sanitize-html + turndown** — server-side
  article extraction pipeline
- **`@nuxt/icon` v1**, `@nuxtjs/google-fonts`, `@nuxtjs/tailwindcss`,
  `@vueuse/nuxt`

## Features

- **`/` — front page.** Top stories from the official HN Firebase API,
  paginated server-side, joined together with **infinite scroll** via
  `useIntersectionObserver` on a sentinel `<div>`. Visited posts dim to gray
  via the browser's native `:visited` (SPA navigations register through
  `history.pushState`). The page is `keepalive`'d, so navigating to an item
  and back preserves the loaded list and scroll position.
- **`/item/:id` — item page.** A single page that combines:
  - **Header** (title, points, user, time, domain) — SSR.
  - **Article preview** — extracted from the linked URL on the server,
    rendered via sanitized HTML. Loaded **client-only** (`useFetch` with
    `server: false`) so a slow or failing extract doesn't block the rest of
    the page or its initial paint.
  - **Comments thread** — recursive `<Comments>` component, SSR. Each comment
    has `id="comment-N"`; the timestamp is a self-permalink, and `:target`
    highlights the linked comment.
- **`/user/:username` — user profile** (karma, creation date, bio).
- **`error.vue`** — single global error page with `clearError`.

## Article extraction pipeline

For each item with an external URL:

```
HN item ─→ fetch HTML ─→ JSDOM ─→ Readability ─→ sanitize-html ─→ Turndown
                                                                    │
                                                                    ▼
                                                       { html, markdown, … }
```

- Iframe whitelist for YouTube / Vimeo / Twitch / Dailymotion / Archive.org /
  CodePen, plus an HTTPS-only requirement for any iframe `src`.
- `<script>` and `on*` handlers stripped; `id` preserved on every tag so
  in-article anchor links keep working.
- `target="_blank"` is added only to absolute outbound links — fragment links
  (`href="#section"`) stay same-page.

Two-layer caching:

- `defineCachedFunction` over `extractArticle(url)` — 7-day TTL, keyed by
  URL. Two HN posts pointing at the same article extract once.
- `defineCachedEventHandler` over `/api/hn/article/[id]` — 24-hour TTL,
  keyed by id. Wraps the call.

## Run locally

```sh
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`. Other useful scripts:

```sh
npm run build       # production build
npm run preview     # serve the production build
npm run lint        # ESLint
npm run format      # Prettier
npm run typecheck   # vue-tsc
```

## Project layout

```
server/
  api/hn/
    news.get.ts                 # paginated front page
    item/[id].get.ts            # post + recursive comments tree
    article/[id].get.ts         # extracted article (client-fetched)
    user/[username].get.ts      # user profile
  utils/
    hn.ts                       # HN Firebase client, types, helpers
    extractArticle.ts           # readability / sanitize / turndown

pages/
  index.vue                     # feed (infinite scroll, keepalive)
  item/[id].vue                 # preview + comments
  user/[username].vue
  about.vue

components/
  Items.vue                     # feed list + IntersectionObserver sentinel
  Comments.vue                  # recursive comments + anchor permalinks

layouts/default.vue
app.vue
error.vue
```

## Why these choices

- **No state library.** Local refs and composables are enough at this scale;
  pagination state moved from `provide/inject` to the URL via a writable
  `computed` on `useRoute().query`. When that was replaced with infinite
  scroll, the composable was deleted rather than carried.
- **Article SSR vs client.** Header + comments are SSR (small payload, fast
  Firebase calls). Article extraction is the slow, fail-prone step — it goes
  client-only so the rest of the page is never blocked on it.
- **Visited-link tracking via the browser.** `:visited` already does what's
  needed; no localStorage store, no client-side denormalization.
- **Server utils auto-import.** `server/utils/*` is auto-imported by Nitro,
  so the same `fetchHnItem`, `buildCommentTree`, `timeAgo`, etc. are reused
  across every API route without explicit imports.
