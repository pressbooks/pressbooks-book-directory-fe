<template>
  <img
    class="w-full"
    :src="image"
  >
</template>

<script>
export default {
  name: 'PbBookCover',
  props: {
    image: {
      type: String,
      default: ''
    },
  }
};
</script>