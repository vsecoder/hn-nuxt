<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-4 border border-gray-100 p-4" v-for="post in posts" :key="post.id">
      <div class="flex min-w-12 flex-col items-center justify-center font-medium text-blue-950">
        {{ post.points || 0 }}
      </div>
      <div class="text-sm text-gray-700">
        <div>
          <nuxt-link :to="post.url" class="text-base text-gray-900">{{ post.title }}</nuxt-link>
        </div>
        <div class="ml-1">
          by <nuxt-link :to="`/user/${post.user}`" class="underline">{{ post.user }}</nuxt-link> |
          <nuxt-link :to="`/comments/${post.id}`" class="underline">{{ post.comments_count }} comments</nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="posts.length === 0" class="flex justify-center p-4">Loading...</div>
</template>

<script setup>
const page = inject('page');

import { ref, onMounted, watch } from 'vue';

const posts = ref([]);

const parseHN = (page) => {
  return fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      posts.value = data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

watch(page, async (newPage) => {
  posts.value = [];
  await parseHN(newPage);
});

onMounted(async () => {
  await parseHN(page.value);
});
</script>
