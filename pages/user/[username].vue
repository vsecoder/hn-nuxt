<template>
  <div class="p-4">
    <div v-if="error" class="text-red-700">
      Failed to load user: {{ error.statusMessage || error.message }}
      <button class="ml-2 underline" @click="refresh()">Retry</button>
    </div>
    <template v-else>
      <div class="flex items-center gap-4 pb-2 justify-between">
        <div class="text-2xl">{{ route.params.username }}</div>
        <div v-if="user">
          <div class="text-sm">
            <span>Created:</span> {{ new Date(user.created * 1000).toLocaleDateString() }}
          </div>
          <div class="text-sm">
            <span>Karma:</span> {{ user.karma }}
          </div>
        </div>
        <div v-else-if="pending">Loading...</div>
      </div>

      <div class="text-gray-700 overflow-x-auto max-w-full" v-html="user?.about"></div>
    </template>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: user, pending, error, refresh } = await useFetch(() => `/api/hn/user/${route.params.username}`);

useHead({
  title: () => `User ${route.params.username}`,
});
</script>
