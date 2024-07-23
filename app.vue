<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'HN',
  meta: [
    {
      name: 'description',
      content: 'Hacker News readers as Progressive Web Apps',
    },
  ],
});
</script>
