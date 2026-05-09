<template>
  <div class="flex h-screen w-full flex-col">
    <!-- header -->
    <div class="flex bg-bg-header text-header-fg">
      <div class="m-auto flex w-full max-w-[800px] flex-row items-center justify-between p-2">
        <nuxt-link to="/" class="text-2xl">HN</nuxt-link>
        <div class="flex gap-4">
          <nuxt-link to="/about">About</nuxt-link>
        </div>
      </div>
    </div>

    <!-- main -->
    <div class="w-full flex-1 bg-bg-soft">
      <div class="mx-auto mt-1 max-w-[800px] bg-bg">
        <slot />
      </div>
    </div>
  </div>
</template>
