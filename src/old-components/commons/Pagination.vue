<template>
  <div
    class="text-center"
    @click="scrollToBooksList"
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
