<template>
  <div class="space-y-10">
    <div class="section-title text-4xl font-bold text-center">
      Find a book
    </div>
    <div class="flex flex-col items-center space-y-10 md:flex-row md:space-y-0 md:space-x-10">
      <pb-search-box />

      <div
        class="right w-full flex flex-col space-y-4 md:w-2/5 md:flex-row md:space-y-0 md:space-x-4"
        data-cy="top-filters"
      >
        <pb-per-page-dropdown
          v-if="perPageOptions.length > 0"
          :options="perPageOptions"
        />
        <pb-sort-by-dropdown :options="sortByOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import PbPerPageDropdown from './dropdowns/PbPerPageDropdown.vue';
import PbSortByDropdown from './dropdowns/PbSortByDropdown.vue';
import PbSearchBox from './forms/PbSearchBox.vue';

export default {
  name: 'PbSearchAndSortBox',
  components: {
    PbPerPageDropdown,
    PbSortByDropdown,
    PbSearchBox
  },
  data() {
    return {
      defaultHitsPerPage: 10,
      perPageOptions: [],
      sortByOptions: this.$store.state.SClient.availableIndexes
    };
  },
  watch: {
    '$store.state.SClient.searchParameters.hitsPerPage'(hitsPerPage) {
      this.perPageOptions = this.perPageOptions.map((option) => {
        option.default = hitsPerPage == option.value;
        return option;
      });
    }
  },
  mounted() {
    let vm = this;
    this.perPageOptions = this.$store.state.SClient.searchParameters.hitsPerPageAllowed.map((allowed) => {
      return {
        label: `${allowed} books`,
        value: allowed,
        default: (allowed === vm.defaultHitsPerPage)
      };
    });
  }
};
</script>
