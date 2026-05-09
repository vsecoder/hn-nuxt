<template>
  <NuxtLayout>
    <div class="flex flex-col items-center gap-4 p-8 text-center">
      <div class="text-4xl font-medium text-blue-950">{{ error.statusCode }}</div>
      <div class="text-gray-700">{{ message }}</div>
      <button class="text-blue-700 underline" @click="handleError">Go home</button>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const message = computed(() => {
  if (props.error.statusCode === 404) return 'Page not found';
  return props.error.statusMessage || props.error.message || 'Something went wrong';
});

useHead({
  title: () => `${props.error.statusCode} — News`,
});

const handleError = () => clearError({ redirect: '/' });
</script>
