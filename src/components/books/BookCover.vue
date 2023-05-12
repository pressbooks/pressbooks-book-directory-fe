<template>
  <div class="w-full md:w-1/3">
    <div
      class="book-cover image max-w-[350px]"
      data-cy="book-cover"
    >
      <a
        v-lazy-container="{ selector: 'img', error: defaultImg, loading: defaultImg }"
        :href="item.url"
        target="_blank"
        rel="noopener"
        data-cy="book-cover"
        @click="$emit('book-cover-click')"
      >
        <img
          v-if="item.hasThumbnailUrl"
          class="w-full"
          :src="item.thumbnailUrl"
          :data-src="item.thumbnailUrl"
          :alt="`${item.name} cover`"
        >
        <img
          v-else
          class="w-full"
          :src="item.image"
          :data-src="item.image"
          :alt="`${item.name} cover`"
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCover',
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  emits: ['book-title-click'],
  data() {
    return {
      defaultImg: '/assets/images/default-book-cover.jpg'
    };
  }
};
</script>
