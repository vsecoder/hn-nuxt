<template>
  <div class="p-4 text-fg-muted">
    <h1 class="mb-4 text-2xl font-semibold text-accent">About</h1>

    <p class="mb-4">
      A minimal
      <a href="https://news.ycombinator.com/news" target="_blank" rel="noopener" class="underline">Hacker News</a>
      reader built with
      <a href="https://nuxt.com" target="_blank" rel="noopener" class="underline">Nuxt 3</a>.
      Front-page feed, item pages with comments, and on-the-fly previews of
      linked articles extracted server-side.
    </p>

    <h2 class="mt-6 mb-2 text-lg font-semibold text-accent">Stack</h2>
    <ul class="list-disc pl-5">
      <li>Nuxt 3 (Vite, Nitro), Vue 3, TypeScript on the server</li>
      <li>Tailwind 3 + SCSS</li>
      <li>VueUse for IntersectionObserver-driven infinite scroll</li>
      <li>
        <a href="https://github.com/mozilla/readability" target="_blank" rel="noopener" class="underline">@mozilla/readability</a>
        + linkedom + sanitize-html + Turndown for the article-extraction pipeline
      </li>
    </ul>

    <h2 class="mt-6 mb-2 text-lg font-semibold text-accent">What it shows</h2>
    <ul class="list-disc pl-5">
      <li>SSR-friendly data fetching with <code>useFetch</code> and reactive route params</li>
      <li>Nitro server routes under <code>server/api/hn/*</code> with shared auto-imported utils</li>
      <li>Layered caching via <code>defineCachedEventHandler</code> and <code>defineCachedFunction</code></li>
      <li>Mixed SSR + client-only fetches on a single page (header SSR, slow article fetch client-side)</li>
      <li>Infinite scroll with <code>useIntersectionObserver</code> + <code>keepalive</code> page meta</li>
      <li>Native <code>:visited</code> styling, anchor permalinks for comments</li>
      <li>CSS-token-based theming with system dark mode (<code>prefers-color-scheme</code>)</li>
      <li>Custom <code>error.vue</code> with <code>clearError</code></li>
    </ul>

    <h2 class="mt-6 mb-2 text-lg font-semibold text-accent">Source</h2>
    <p>
      Code on
      <a href="https://github.com/" target="_blank" rel="noopener" class="underline">GitHub</a>.
      See the
      <nuxt-link to="/" class="underline">front page</nuxt-link>
      for the live feed.
    </p>
  </div>
</template>

<script setup>
useHead({
  title: 'About',
});
</script>
