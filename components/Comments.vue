<template>
  <div
    v-for="comment in comments"
    :id="`comment-${comment.id}`"
    :key="comment.id"
    class="comment flex flex-col gap-4 break-words border-b border-divider"
    :class="embeddedClass"
  >
    <div>
      <div class="text-sm">
        <nuxt-link :to="`/user/${comment.user}`" class="font-medium underline">{{ comment.user }}</nuxt-link>
        <a :href="`#comment-${comment.id}`" class="ml-1 text-xs text-fg-subtle hover:underline">
          {{ comment.time_ago }}
        </a>
      </div>
      <div class="comment-content" v-html="comment.content"></div>
    </div>

    <div v-if="comment.comments.length" class="flex flex-col gap-4">
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

const embeddedClass = props.embedded ? 'pl-6 border-b-0' : 'p-4';
</script>

<style lang="scss">
.comment {
  scroll-margin-top: 16px;
  transition: background-color 600ms ease;
}

.comment:target {
  background-color: rgb(var(--color-target));
}

.comment-content a {
  color: rgb(var(--color-link));
  text-decoration: underline;
}

.comment-content pre {
  overflow-x: auto;
  max-width: 100%;
}
</style>
