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
        @input="(data)=>{
          onInput(data,refine)
        }"
      />
    </template>
  </ais-sort-by>
</template>
<script>
import PbDropdown from './PbDropdown.vue';

export default {
  name: 'PbSortByDropdown',
  components: { PbDropdown },
  props: {
    options: {
      type: Array,
      default() { return []; }
    }
  },
  data() {
    return {
      alias: this.$store.state.SClient.searchParameters.aliases.sortedBy,
      itemsOptions: this.options
    };
  },
  methods: {
    onInput(data, refine) {
      refine(data);
      let routeQuery = {...this.$route.query};
      const indexesOrderedByMap = this.$store.state.SClient.availableIndexes.reduce((index, item) => {
        return {
          ...index,
          [item.value]: item.orderedBy
        };
      }, {});
      this.$store.commit('setSortedBy', indexesOrderedByMap[data]);
      if (
        !routeQuery[this.alias] ||
        (
          routeQuery[this.alias] &&
          routeQuery[this.alias] != indexesOrderedByMap[data]
        )
      ) {
        routeQuery[this.alias] = indexesOrderedByMap[data];
        this.$router.replace({ query: routeQuery });
      }
    }
  }
};
</script>
