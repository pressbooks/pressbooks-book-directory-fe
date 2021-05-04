<template>
  <form
    class="left w-full flex-1 flex-shrink-0"
    @submit.prevent="search(stringSearch)"
  >
    <div class="flex flex-row items-end">
      <div class="w-2/3 md:w-4/5 pr-6 flex flex-row items-end">
        <div class="border-b border-gray-300 flex flex-row w-full items-center">
          <div class="icon">
            <img
              src="/assets/icons/icon-search.svg"
              width="22"
              alt="Search"
            >
          </div>
          <div class="input w-full pr-30">
            <input
              v-model="stringSearch"
              class="w-full text-sm py-3 px-4 focus:outline-none"
              type="search"
              placeholder="Find a book"
              data-cy="book-input-search"
            >
          </div>
        </div>
      </div>
      <div class="w-1/3 md:w-1/5">
        <button
          type="submit"
          class="w-full py-3 text-sm rounded-full text-white bg-red-700"
          :disabled="stringSearch.length > 0 && (stringSearch.length < searchCharsLimit.min || stringSearch.length > searchCharsLimit.max)"
          data-cy="book-button-search"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import helpers from '../../store/helpers';
import {scrollTo} from '../../utils/helpers';
export default {
  name: 'PbSearchBox',
  data() {
    return {
      stringSearch: '',
      searchCharsLimit: {
        min: 3,
        max: 512
      }
    };
  },
  watch: {
    '$route.query.q' (q) {
      if (typeof q === 'undefined') {
        this.$store.state.SClient.searchFilters = '';
        this.$store.state.SClient.searchParameters.searchQuery = '';
        this.$store.state.SClient.filtersParams = (this.$store.state.SClient.hasNumeric) ?
          this.$store.state.SClient.numericFilters : '';
        return true;
      }
      this.stringSearch = '';
      if (q.length > 0) {
        this.stringSearch = q;
        let stringToSearch = this.filterSearch(q);

        if (
          this.$store.state.SClient.hasNumeric &&
            stringToSearch.facetFilters.length > 0
        ) {
          this.$store.state.SClient.filtersParams =
              '(' + this.$store.state.SClient.numericFilters + ') AND (' + stringToSearch.facetFilters + ')';
        }
        if (
          !this.$store.state.SClient.hasNumeric &&
            stringToSearch.facetFilters.length > 0
        ) {
          this.$store.state.SClient.filtersParams = stringToSearch.facetFilters;
        }

        this.$store.state.SClient.searchFilters = stringToSearch.facetFilters;
        this.$store.state.SClient.searchParameters.searchQuery = stringToSearch.stringSearch;
        return true;
      }
      if (q.length === 0) {
        let query = {...this.$route.query};
        delete query.q;
        this.$router.replace({ query });
      }
    }
  },
  mounted() {
    this.$store.commit('setComponentAsLoaded', 'searchbox');
  },
  methods: {
    // Analyze strings  for literal and faceting searching //
    filterSearch(stringSearch) {
      if (stringSearch.length === 0) {
        return {
          facetFilters: '',
          stringSearch: ''
        };
      }
      // split by literals if exists, otherwise by space
      const parts = stringSearch.match(/("[^"]+"|[^"\s]+)/g);
      let literalFacetValue = false;
      let stringFacetFilters = {};
      let partialFacet = '';
      let stringToSearch = [];
      let store = this.$store;
      const aliasAllowed = Object.keys(store.state.SClient.allowedFilters)
        .map(function(key) {
          if (store.state.SClient.allowedFilters[key].search) {
            return store.state.SClient.allowedFilters[key].alias;
          }
        });
      store.commit('getRealAttributesMapped');
      let realAttrs = store.state.SClient.mappedFilters;
      let possibleValues = [];

      for (let p = 0; p < parts.length; p++) {
        // Partial facetFilters
        if (literalFacetValue) {
          literalFacetValue = false;
          if (parts[p][0] === '-') {
            stringFacetFilters[realAttrs[partialFacet]].operator = 'AND NOT';
          }
          possibleValues = helpers.functions.getSimilarFacetValues(partialFacet, parts[p], store.state.stats.filters, realAttrs);
          if (possibleValues.length > 0) {
            for (let j = 0; j < possibleValues.length; j++) {
              stringFacetFilters[realAttrs[partialFacet]].filters.push(realAttrs[partialFacet] + ':' + possibleValues[j]);
            }
          }
          partialFacet = '';
          continue;
        }

        // Check if it is a search by facets
        if (parts[p].search(':') >= 0) {
          let facetAlias = parts[p].split(':');
          if (typeof stringFacetFilters[realAttrs[facetAlias[0]]] === 'undefined') {
            stringFacetFilters[realAttrs[facetAlias[0]]] = {
              operator: 'OR',
              filters: []
            };
          }
          if(aliasAllowed.indexOf(facetAlias[0].toLowerCase()) >= 0 && facetAlias.length === 2) {
            // {facet}:"{value_with_special_characters}", i.e: publisher:"University Queen's"
            if (facetAlias[1].length === 0) {
              // only attribute is available at this point
              literalFacetValue = true;
              partialFacet += facetAlias[0];
              continue;
            } else {
              possibleValues = helpers.functions.getSimilarFacetValues(facetAlias[0], facetAlias[1], store.state.stats.filters, realAttrs);
              if (facetAlias[1][0] === '-') {
                stringFacetFilters[realAttrs[facetAlias[0]]].operator = 'AND NOT';
              }
              if (possibleValues.length > 0) {
                for (let j = 0; j < possibleValues.length; j++) {
                  stringFacetFilters[realAttrs[facetAlias[0]]].filters.push(realAttrs[facetAlias[0]] + ':' + possibleValues[j]);
                }
              } else {
                // empty search //
                stringFacetFilters[realAttrs[facetAlias[0]]].filters.push(realAttrs[facetAlias[0]] + ':' + facetAlias[1]);
              }
              continue;
            }
          }
        }
        stringToSearch.push(parts[p]);
      }
      let stringFilters = '';
      let keysFacets = Object.keys(stringFacetFilters);
      let prefixOperator = '';
      for (const attr in stringFacetFilters) {
        if (stringFacetFilters[attr].filters.length > 0) {
          prefixOperator = (stringFacetFilters[attr].operator === 'AND NOT') ? 'NOT ' : '';
          if (keysFacets.length > 1) {
            stringFilters += '(' + prefixOperator + stringFacetFilters[attr].filters.join(' ' + stringFacetFilters[attr].operator + ' ') + ') AND ';
          } else {
            stringFilters += prefixOperator + stringFacetFilters[attr].filters.join(' ' + stringFacetFilters[attr].operator + ' ');
          }
        }
      }
      stringFilters = (keysFacets.length > 1) ? stringFilters.slice(0, -5) : stringFilters;
      if (stringToSearch.length > 1) {
        for (let i = 1; i < stringToSearch.length; i++) {
          if (stringToSearch[i-1] === '-' && stringToSearch[i][0] === '"') {
            stringToSearch[i] = stringToSearch[i-1] + stringToSearch[i];
            stringToSearch.splice(i-1, 1);
          }
        }
      }
      return {
        facetFilters: stringFilters,
        stringSearch: stringToSearch.join(' ')
      };
    },
    search(stringSearch) {
      if (
        (stringSearch.length >= this.searchCharsLimit.min && stringSearch.length <= this.searchCharsLimit.max) ||
          stringSearch.length === 0 // Remove search case
      ) {
        scrollTo('#books');
        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters.search.alias;
        query[attribute] = stringSearch;
        if(this.$router.history.current.query.q !== query.q){
          this.$router.replace({ query });
        }
      }
    }
  }
};
</script>
