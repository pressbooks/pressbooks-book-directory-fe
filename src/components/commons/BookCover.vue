<template>
  <v-img
      class="book-cover"
      :src="image"
      :max-height="maxHeight"
      :min-height="minHeight"
  />
</template>

<script>
export default {
  name: 'BookCover',
  props: {
    image: {type: String},
    minHeight: {type: Number, default: null},
    maxHeight: {type: Number, default: null}
  }
};
</script>