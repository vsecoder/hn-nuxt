<template>
  <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-100 p-4 pb-0 break-words" :class="embeddedClass">
    <div>
      <a :href="`/user/${comment.user}`" class="underline font-medium">{{ comment.user }}</a> <span class="text-xs text-gray-700">{{ comment.time_ago }}</span>:
    </div>
    <div class="comment-content" v-html="comment.content"></div>

    <div v-if="comment.comments.length">
      <Comments :comments="comment.comments" :embedded="true" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comments: Array,
  embedded: {
    type: Boolean,
    default: false,
  },
});

const embeddedClass = props.embedded ? 'pl-6 border-b-0' : '';
</script>

<style lang="scss">
.comment-content a {
  color: #044997;
  text-decoration: underline;
}
</style>