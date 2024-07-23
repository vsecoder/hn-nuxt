<template>
  <div class="p-4">
    <div class="text-2xl">{{ username }}</div>
    <div class="text-gray-700">This is the user page</div>
  </div>
</template>

<script setup>
const route = useRoute();
const username = route.params.username;

import { onMounted } from 'vue';

useHead({
  title: `User ${username}`,
});

// https://api.hnpwa.com/v0/users/davideast.json
onMounted(() => {
  fetch(`https://api.hnpwa.com/v0/users/${username}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
</script>
