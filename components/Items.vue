<template>
  <div v-if="initialError" class="p-4 text-center text-error">
    Failed to load posts: {{ initialError.statusMessage || initialError.message }}
    <button class="ml-2 underline" @click="initialRefresh()">Retry</button>
  </div>

  <div v-else class="flex flex-col">
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex flex-row gap-4 border border-divider p-4"
    >
      <div class="flex min-w-12 flex-col items-center justify-center font-medium text-accent">
        {{ post.points || 0 }}
      </div>
      <div class="text-sm text-fg-muted">
        <div>
          <nuxt-link
            :to="`/item/${post.id}`"
            class="post-title text-base"
          >{{ post.title }}</nuxt-link>
          <a
            v-if="post.url"
            :href="post.url"
            target="_blank"
            rel="noopener"
            class="ml-1 text-xs text-fg-subtle hover:underline"
          >({{ post.domain }})</a>
        </div>
        <div class="ml-1">
          by
          <nuxt-link :to="`/user/${post.user}`" class="underline" v-if="post.user">{{ post.user }}</nuxt-link>
          <span v-else>Unknown</span> |
          <nuxt-link :to="`/item/${post.id}#comments`" class="underline">{{ post.comments_count }} comments</nuxt-link>
        </div>
      </div>
    </div>

    <div ref="sentinel" aria-hidden="true" class="h-1" />

    <div v-if="loadMoreError" class="p-4 text-center text-error">
      Failed to load more.
      <button class="ml-2 underline" @click="loadNext()">Retry</button>
    </div>
    <div v-else-if="loadingMore" class="p-4 text-center text-fg-subtle">Loading more...</div>
    <div v-else-if="done && posts.length" class="p-4 text-center text-sm text-fg-subtle">— end —</div>
  </div>
</template>

<script setup>
const { data: initial, error: initialError, refresh: initialRefresh } = await useFetch('/api/hn/news', {
  query: { page: 1 },
  default: () => [],
});

const posts = ref([...(initial.value ?? [])]);
const currentPage = ref(posts.value.length ? 1 : 0);
const done = ref(posts.value.length === 0);
const loadingMore = ref(false);
const loadMoreError = ref(null);
const sentinel = ref(null);

async function loadNext() {
  if (loadingMore.value || done.value) return;
  loadingMore.value = true;
  loadMoreError.value = null;
  try {
    const next = currentPage.value + 1;
    const data = await $fetch('/api/hn/news', { query: { page: next } });
    if (!data || !data.length) {
      done.value = true;
    } else {
      posts.value.push(...data);
      currentPage.value = next;
    }
  } catch (e) {
    loadMoreError.value = e;
  } finally {
    loadingMore.value = false;
  }
}

useIntersectionObserver(
  sentinel,
  ([entry]) => {
    if (entry.isIntersecting) loadNext();
  },
  { rootMargin: '400px' },
);
</script>

<style scoped>
.post-title {
  color: rgb(var(--color-fg));
}
.post-title:visited {
  color: rgb(var(--color-visited));
}
</style>
