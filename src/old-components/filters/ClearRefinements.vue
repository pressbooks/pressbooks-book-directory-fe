<template>
  <button
    type="reset"
    :class="Object.keys($store.state.SClient.filtersExcluded).length > 0 ? 'ais-ClearRefinements-button ais-ClearRefinements-button' : 'ais-ClearRefinements-button ais-ClearRefinements-button--disabled'"
    :disabled="Object.keys($store.state.SClient.filtersExcluded).length === 0"
    @click.prevent="removeFilters()"
  >
    Clear Active Filters
  </button>
</template>

<script>
export default {
  name: 'ClearRefinements',
  methods: {
    removeFilters() {
      let query = {...this.$route.query};
      let cleanQuery = {};
      if (typeof query.q !== 'undefined') {
        cleanQuery.q = query.q;
      }
      this.$router.replace({ query: cleanQuery });
    },
  }
};
</script>