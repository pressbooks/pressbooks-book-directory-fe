<template>
  <button
    type="reset"
    :class="Object.keys($store.state.SClient.filtersExcluded).length > 0 ? 'ais-ClearRefinements-button ais-ClearRefinements-button' : 'ais-ClearRefinements-button ais-ClearRefinements-button--disabled'"
    :disabled="Object.keys($store.state.SClient.filtersExcluded).length === 0"
    @click.prevent="removeFilters()"
  >
    Clear refinements
  </button>
</template>

<script>
export default {
    name: 'ClearRefinements',
    methods: {
        removeFilters() {
            this.$router.replace({ query: {} });
        },
    }
};
</script>