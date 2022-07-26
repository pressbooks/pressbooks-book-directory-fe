<template>
  <ais-sort-by
    :items="itemsOptions"
    class="w-ful md:w-1/2"
  >
    <template #default="{ items, refine }">
      <pb-dropdown
        placeholder="Sort books by"
        :options="items"
        data-cy="sort-books-by"
        :disabled="disabled"
        @update:modelValue="(itemSelected) => onInput(itemSelected,refine)"
      />
    </template>
  </ais-sort-by>
</template>
<script>
import PbDropdown from './PbDropdown.vue';

export default {
  name: 'PbSortByDropdown',
  components: {PbDropdown},
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      alias: this.$store.state.SClient.searchParameters.aliases.sortedBy,
      itemsOptions: this.options,
      disabled: true
    };
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(query) {
        Object.keys(query).forEach(key => {
          if (query[key] === undefined) {
            delete query[key];
          }
        });
        if (query === undefined || Object.keys(query).length === 0) {
          this.disabled = true;
          return;
        }
        let queryKeys = Object.keys(query);
        let allowedFilters = this.$store.state.SClient.allowedFilters;
        const filtersKeys = Object.keys(allowedFilters).map(function (key) {
          return allowedFilters[key].alias;
        });
        const keysDiff = filtersKeys.filter(key => queryKeys.includes(key));
        this.disabled = keysDiff.length === 0;
      }
    }
  },
  methods: {
    onInput(data, refine) {
      this.$store.commit('setResetMainIndex', false);
      let routeQuery = {...this.$route.query};
      const indexesOrderedByMap = this.$store.state.SClient.availableIndexes.reduce((index, item) => {
        return {
          ...index,
          [item.value]: item.orderedBy
        };
      }, {});
      if (
        !routeQuery[this.alias] ||
          (
            routeQuery[this.alias] &&
              routeQuery[this.alias] != indexesOrderedByMap[data]
          )
      ) {
        this.sendFilterAppliedInsight(
          [`value:${data}`],
          'Sort By Changed'
        );
        routeQuery[this.alias] = indexesOrderedByMap[data];
        this.$router.replace({query: routeQuery});
        refine(data);
      }
    }
  }
};
</script>
