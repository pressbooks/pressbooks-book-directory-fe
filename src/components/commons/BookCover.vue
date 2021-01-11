<template>
  <v-img
      class="book-cover"
      :src="image"
  />
</template>

<script>
export default {
  name: 'BookCover',
  props: {
    image: {type: String}
  }
};
</script>