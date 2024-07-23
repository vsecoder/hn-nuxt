<template>
  <div class="p-4">
    <div class="flex items-center gap-4 pb-2 justify-between">
      <div class="text-2xl">{{ username }}</div>
      <div>
        <div class="text-sm">
          <span>Created:</span> {{ new Date(user.created * 1000).toLocaleDateString() }}
        </div>
        <div class="text-sm">
          <span>Karma:</span> {{ user.karma }}
        </div>
      </div>
    </div>

    <div class="text-gray-700" v-html="user.about"></div>
  </div>
</template>

<script setup>
const route = useRoute();
const username = route.params.username;

const user = ref({});

import { onMounted } from 'vue';

useHead({
  title: `User ${username}`,
});

onMounted(() => {
  fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      user.value = data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
</script>
