<template>
  <div class="action flex justify-end space-x-1">
    <button
      class="include"
      :data-cy="`filter-${field}-${getAlphanumericFacet(item.facet)}-include-button`"
      :aria-pressed="wasFiltered(item.facet, false) ? 'true' : 'false'"
      @click="applyFilter(item, false)"
    >
      <span class="sr-only">{{ `Include ${item.facet}` }}</span>
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
      :data-cy="`filter-${field}-${getAlphanumericFacet(item.facet)}-exclude-button`"
      :aria-pressed="wasFiltered(item, true) ? 'true': 'false'"
      @click="applyFilter(item, true)"
    >
      <span class="sr-only">{{ `Exclude ${item.facet}` }}</span>
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
import helpers from '../../store/helpers';

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

        this.filterApplied = false;
      }
    },
  },
  methods: {
    wasFiltered(value, exclude) {
      let field = this.field.slice(0);
      if (value === 'empty') {
        value = false;
      }
      return typeof(this.$store.state.SClient.filtersExcluded[field]) !== 'undefined' &&
          this.$store.state.SClient.filtersExcluded[field].find(v => v.value === value && v.exclude === exclude) !== undefined;
    },
    clearFilters() {
      let query = {...this.$route.query};
      delete query[this.alias];
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
      let query = {...this.$route.query}, value;
      value = exclude ? '-' + itemFacet : itemFacet;

      this.sendClickInsight(itemValue, exclude);

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
    },
    sendClickInsight(item, exclude = false) {
      this.sendFilterAppliedInsight([
        `${exclude ? 'NOT ' : ''}${this.alias}:${item.facet}`,
      ]);
    },
    getAlphanumericFacet(facet) {
      return helpers.functions.getLowerCaseAlphanumericAndHyphen(facet);
    }
  }
};
</script>
