<template>
  <img class="w-full" :src="image" />
</template>

<script>
export default {
  name: 'PbBookCover',
  props: {
    image: String,
  }
};
</script>