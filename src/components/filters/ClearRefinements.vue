<template>
  <button
    type="reset"
    @click.prevent="removeFilters()"
    :class="Object.keys($store.state.SClient.filtersExcluded).length > 0 ? 'ais-ClearRefinements-button ais-ClearRefinements-button' : 'ais-ClearRefinements-button ais-ClearRefinements-button--disabled'"
    :disabled="Object.keys($store.state.SClient.filtersExcluded).length === 0"
  >
    Clear refinements
  </button>
</template>

<script>
export default {
  name: 'clearRefinements',
  methods: {
    removeFilters() {
      this.$store.state.SClient.filtersExcluded = {};
      this.$store.state.SClient.notFilters = [];
      this.$store.state.SClient.numericFilters = [];
    },
  }
}
</script>