<template>
  <div
    @click="scrollToBooksList"
    class="text-center"
  >
    <ais-pagination />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  methods: {
    scrollToBooksList() {
      setTimeout(() => {
        this.$vuetify.goTo('#current-filters');
      }, 500);
    }
  }
};
</script>
