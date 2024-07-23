<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'News',
  meta: [
    {
      name: 'description',
      content: 'Hacker News reader',
    },
  ],
});
</script>
