<template>
  <div v-if="itemError" class="p-4 text-red-700">
    Failed to load: {{ itemError.statusMessage || itemError.message }}
    <button class="ml-2 underline" @click="refreshItem()">Retry</button>
  </div>

  <template v-else-if="item">
    <header class="border-b border-gray-100 p-4">
      <h1 class="text-2xl text-blue-950">{{ item.title }}</h1>
      <div class="mt-2 text-sm text-gray-600">
        {{ item.points }} points by
        <nuxt-link v-if="item.user" :to="`/user/${item.user}`" class="underline">{{ item.user }}</nuxt-link>
        <span v-else>Unknown</span>
        · {{ item.time_ago }} ·
        <a href="#comments" class="underline">{{ item.comments_count }} comments</a>
        <span v-if="item.url"> · </span>
        <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="underline">
          {{ item.domain }} ↗
        </a>
      </div>
    </header>

    <div v-if="articleError" class="p-4 text-red-700">
      Failed to load article: {{ articleError.statusMessage || articleError.message }}
      <button class="ml-2 underline" @click="refreshArticle()">Retry</button>
      <a
        v-if="item.url"
        :href="item.url"
        target="_blank"
        rel="noopener"
        class="ml-2 underline"
      >Open original ↗</a>
    </div>
    <div v-else-if="!article" class="p-4 text-sm text-gray-500">Loading article...</div>
    <article v-else-if="article.article" class="article-content p-4">
      <div v-if="article.article.byline || article.article.siteName" class="mb-4 text-sm text-gray-500">
        <span v-if="article.article.byline">{{ article.article.byline }}</span>
        <span v-if="article.article.byline && article.article.siteName"> · </span>
        <span v-if="article.article.siteName">{{ article.article.siteName }}</span>
      </div>
      <div v-html="article.article.html" />
    </article>
    <article v-else-if="article.text" class="article-content p-4">
      <div v-html="article.text" />
    </article>
    <div v-else class="p-4 text-sm text-gray-500">
      <span v-if="!item.url">No external link.</span>
      <span v-else>
        Couldn't extract a readable article.
        <a :href="item.url" target="_blank" rel="noopener" class="ml-1 underline">Open original ↗</a>
      </span>
    </div>

    <section id="comments" class="border-t border-gray-200">
      <h2 class="p-4 pb-1 text-lg text-gray-700">
        Comments<span v-if="item.comments_count"> ({{ item.comments_count }})</span>
      </h2>
      <div v-if="!item.comments.length" class="p-4 text-gray-500">No comments yet.</div>
      <Comments v-else :comments="item.comments" />
    </section>
  </template>

  <div v-else-if="itemPending" class="p-4 text-gray-500">Loading...</div>
</template>

<script setup>
const route = useRoute();

const { data: item, pending: itemPending, error: itemError, refresh: refreshItem } = await useFetch(
  () => `/api/hn/item/${route.params.id}`,
);

const { data: article, error: articleError, refresh: refreshArticle } = useFetch(
  () => `/api/hn/article/${route.params.id}`,
  { server: false },
);

useHead({
  title: () => (item.value?.title ? `${item.value.title} — News` : 'Item'),
});
</script>

<style lang="scss" scoped>
.article-content :deep() {
  h1, h2, h3, h4 {
    @apply mt-6 mb-2 font-semibold;
  }
  h1 { @apply text-2xl; }
  h2 { @apply text-xl; }
  h3 { @apply text-lg; }
  p {
    @apply my-3 leading-relaxed;
  }
  ul, ol {
    @apply my-3 pl-6;
  }
  ul { list-style: disc; }
  ol { list-style: decimal; }
  li { @apply my-1; }
  a {
    @apply text-blue-700 underline;
  }
  pre {
    @apply my-3 overflow-x-auto rounded bg-gray-50 p-3 text-sm;
  }
  code {
    @apply rounded bg-gray-100 px-1 text-sm;
  }
  pre code {
    @apply bg-transparent p-0;
  }
  blockquote {
    @apply my-3 border-l-4 border-gray-300 pl-4 text-gray-700;
  }
  img {
    @apply my-3 max-w-full;
  }
  iframe {
    @apply my-4 block w-full max-w-full;
    aspect-ratio: 16 / 9;
    height: auto;
    border: 0;
  }
  video {
    @apply my-4 block max-w-full;
    width: 100%;
    height: auto;
  }
  hr {
    @apply my-4 border-gray-200;
  }
  figure {
    @apply my-4;
  }
  figcaption {
    @apply mt-1 text-sm text-gray-500;
  }
}
</style>
