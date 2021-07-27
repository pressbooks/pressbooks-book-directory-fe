<template>
  <div
    v-lazy-container="{ selector: 'img', error: defaulImg, loading: defaulImg }"
  >
    <img
      class="w-full"
      :data-src="image"
    >
  </div>
</template>

<script>
import { ImgFallback } from 'v-img-fallback';

export default {
  name: 'PbBookCover',
  directives: {
    ImgFallback
  },
  props: {
    image: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      defaulImg: '/assets/images/default-book-cover.jpg'
    };
  }
};
</script>
