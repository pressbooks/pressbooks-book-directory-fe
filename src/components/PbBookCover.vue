<template>
  <img
    v-img-fallback="'/assets/images/default-book-cover.jpg'"
    class="w-full"
    :src="image"
  >
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
};
</script>
