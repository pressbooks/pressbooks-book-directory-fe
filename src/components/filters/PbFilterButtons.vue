<template>
  <div class="action flex justify-end space-x-1">
    <button
      class="include"
      data-cy="filter-include-button"
      @click="applyFilter(item, false)"
    >
      <CheckCircleIconSolid
        v-if="wasFiltered(item.facet, false)"
        class="h-6 w-6"
      />
      <CheckCircleIcon
        v-else
        class="h-6 w-6"
      />
    </button>
    <button
      class="exclude"
      data-cy="filter-exclude-button"
      @click="applyFilter(item, true)"
    >
      <XCircleIconSolid
        v-if="wasFiltered(item.facet, true)"
        class="h-6 w-6"
      />
      <XCircleIcon
        v-else
        class="h-6 w-6"
      />
    </button>
  </div>
</template>

<script>
import { CheckCircleIcon, XCircleIcon } from '@vue-hero-icons/outline';
import { CheckCircleIcon as CheckCircleIconSolid, XCircleIcon as XCircleIconSolid } from '@vue-hero-icons/solid';

export default {
  name: 'PbFilterButtons',
  components: {
    CheckCircleIcon,
    CheckCircleIconSolid,
    XCircleIcon,
    XCircleIconSolid
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    field: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      includedChecked: true,
      excludedChecked: false,
      sExpanded: false,
      excluded: false,
      stringSearch: '',
      steps: 5,
      limited: 100,
      max: 5000,
      auxItems: [],
      alias: this.$store.state.SClient.allowedFilters[this.field].alias,
      empty: this.$store.state.SClient.allowedFilters[this.field].empty,
      emptyFieldCount: 0,
      textEmpty: 'No value / empty',
      itemsFiltered: false,
      filterApplied: false
    };
  },
  watch: {
    '$store.state.stats.filters': {
      deep: true,
      handler(filters) {
        if (typeof filters[this.empty] !== 'undefined') {
          for (let i = 0; i < filters[this.empty].length; i++) {
            if (filters[this.empty][i].facet === 'false') {
              this.emptyFieldCount = filters[this.empty][i].count;
            }
          }
          return true;
        }
        if (this.filterApplied && this.stringSearch.length > 0) {
          this.searchForItems();
        }
        this.filterApplied = false;
      }
    },
    '$store.state.SClient.filtersExcluded': {
      deep: true,
      handler() {
        this.itemsFiltered = typeof(this.$store.state.SClient.filtersExcluded[this.field]) !== 'undefined' && this.$store.state.SClient.filtersExcluded[this.field].length > 0;
        if (!this.itemsFiltered) {
          this.stringSearch = '';
        }
      }
    }
  },
  methods: {
    searchForItems() {
      if (this.auxItems.length === 0) {
        this.auxItems = [...this.$store.state.stats.filters[this.field]];
      }
      if (this.stringSearch.length > 0 && this.$store.state.stats.filters[this.field] !== undefined) {
        if (this.auxItems.length > 0) {
          this.$store.state.stats.filters[this.field] = [...this.auxItems];
        }
        let str = this.stringSearch;
        let find = this.$store.state.stats.filters[this.field].filter(
          v => v.facet.toLowerCase().search(str.toLowerCase()) >= 0
        );
        this.$store.state.stats.filters[this.field] = find;
      } else if (this.auxItems.length > 0 && this.stringSearch.length === 0) {
        this.$store.state.stats.filters[this.field] = [...this.auxItems];
      }
    },
    showMore() {
      this.max = this.$store.state.stats.filters[this.field].length;
      let l = this.limited + this.steps;
      this.limited = (l < this.max) ? l : this.max;
    },
    showLess() {
      let l = this.limited - this.steps;
      this.limited = (l > 0) ? l : 1;
    },
    wasFiltered(value, exclude) {
      let field = this.field.slice(0);
      if (value === true) {
        // Boolean
        return typeof(this.$store.state.SClient.filtersExcluded[field]) !== 'undefined' &&
            this.$store.state.SClient.filtersExcluded[field][0].value !== exclude.toString();
      }

      if (value === 'empty') {
        value = false;
      }
      return typeof(this.$store.state.SClient.filtersExcluded[field]) !== 'undefined' &&
          this.$store.state.SClient.filtersExcluded[field].find(v => v.value === value && v.exclude === exclude) !== undefined;
    },
    clearFilters() {
      let query = {...this.$route.query};
      delete query[this.alias];
      this.stringSearch = '';
      this.$router.replace({ query });
    },
    removeFilter(itemValue) {
      let queryString = {...this.$route.query};
      let filtersApplied = queryString[this.alias].split('&&'), filterItem;
      for (let i = 0; i < filtersApplied.length; i++) {
        filterItem = filtersApplied[i][0] === '-' ? filtersApplied[i].substring(1) : filtersApplied[i];
        if (filterItem === itemValue) {
          filtersApplied.splice(i, 1);
          if (filtersApplied.length === 0) {
            delete queryString[this.alias];
            this.filterApplied = false;
          } else {
            queryString[this.alias] = filtersApplied.join('&&');
          }
          this.$router.replace({ query: queryString });
          return;
        }
      }
    },
    applyFilter(itemValue, exclude) {
      const itemFacet = itemValue.facet;
      if (this.wasFiltered(itemFacet, exclude)) {
        return this.removeFilter(itemFacet);
      }
      this.filterApplied = true;
      let query = {...this.$route.query}, value = itemFacet;
      if (exclude) {
        if (
          typeof itemValue.type !== 'undefined' &&
          itemValue.type === 'boolean'
        ) {
          value = false;
        } else {
          value = '-' + itemFacet;
        }
      }
      if (typeof(query[this.alias]) === 'undefined') {
        query[this.alias] = value.toString();
      } else {
        let filters = query[this.alias].split('&&');
        for (let i = 0; i < filters.length; i++) {
          if (
            (exclude && filters[i][0] !== '-') ||
            (!exclude && filters[i][0] === '-')
          ) {
            query[this.alias] = value.toString();
            return this.$router.replace({ query });
          }
        }
        query[this.alias] += '&&' + value.toString();
      }
      this.$router.replace({ query });
    }
  }
};
</script>
