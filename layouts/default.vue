<template>
  <div class="flex h-screen w-full flex-col">
    <!-- header -->
    <div class="flex bg-gray-500 text-white">
      <div class="m-auto flex w-full max-w-[800px] flex-row items-center justify-between p-2">
        <nuxt-link to="/" class="text-2xl">HN</nuxt-link>
        <div class="flex gap-4">
          <nuxt-link to="/about">About</nuxt-link>
        </div>
      </div>
    </div>

    <!-- main -->
    <div class="w-full flex-1 bg-gray-200">
      <div class="mx-auto mt-1 max-w-[800px] bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>
