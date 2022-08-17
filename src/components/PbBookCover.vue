<template>
  <a
    v-lazy-container="{ selector: 'img', error: defaultImg, loading: defaultImg }"
    :href="url"
    target="_blank"
    rel="noopener"
    data-cy="book-cover"
    @click="$emit('book-cover-click')"
  >
    <img
      class="w-full"
      :data-src="image"
    >
  </a>
</template>

<script>

export default {
  name: 'PbBookCover',
  props: {
    image: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  emits: ['book-cover-click'],
  data() {
    return {
      defaultImg: '/assets/images/default-book-cover.jpg'
    };
  }
};
</script>
