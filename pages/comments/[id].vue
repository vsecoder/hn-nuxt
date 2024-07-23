<template>
  <!-- не успел вынести в компонент отдельно -->
  <div class="text-gray-700">
    <div class="p-4 pb-1 text-lg" v-if="comments.length">Comments</div>
    <div class="p-4" v-if="comments.length === 0">Loading...</div>

    <div class="p-4 pt-1 text-2xl">
      <a :href="post.url" class="text-blue-900">{{ post.title }}</a>
    </div>
  </div>
  <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-100 p-4">
    <div>
      <a :href="`/user/${comment.user}`" class="underline">{{ comment.user }}</a> {{ comment.time_ago }}:
    </div>
    <div v-html="comment.content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const id = route.params.id;

const comments = ref([]);
const post = ref({});

onMounted(() => {
  fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      comments.value = data.comments;
      post.value = {
        title: data.title,
        url: data.url,
        comments_count: data.comments_count,
      };
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
</script>
