<template>
  <Pagination />
  <Items />
  <Pagination />
</template>

<script setup>
useHead({
  title: 'Home',
});

import { ref } from 'vue';

const page = ref(1);

provide('page', page);
</script>

<style lang="scss"></style>
