<template>
  <div class="flex justify-between p-4">
    <div class="cursor-pointer" @click="page--"><Icon name="uil:arrow-left" size="24" /></div>
    <div class="mx-4">{{ page }}</div>
    <div class="cursor-pointer" @click="page++"><Icon name="uil:arrow-right" size="24" /></div>
  </div>
</template>

<script setup>
const page = inject('page');
</script>
