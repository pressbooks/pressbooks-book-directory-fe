<template>
  <div>
    <book-card v-for="book in 3" :key="book"/>
  </div>
</template>

<script>

import BookCard from "./BookCard.vue";
export default {
  name: "Books",
  components: {BookCard},
}
</script>