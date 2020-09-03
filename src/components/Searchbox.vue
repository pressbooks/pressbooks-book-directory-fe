<template>
  <v-form @submit.prevent="search(stringSearch)">
    <v-row
      justify="space-between"
    >
      <v-col
        cols="12"
        md="2"
      >
        <h2 class="ais-SearchBox__text">
          Find a book:
        </h2>
      </v-col>
      <v-col
        md="9"
        cols="12"
      >
        <v-text-field
          id="search-book"
          v-model="stringSearch"
          type="search"
          label="Search all book metadata"
        >
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <v-icon slot="append">
            mdi-magnify
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col
        md="1"
        cols="12"
        align="center"
      >
        <v-btn
          id="search-button"
          type="submit"
          :disabled="(stringSearch.length < 3 && stringSearch > 0) || stringSearch.length > 512"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import helpers from '@/store/helpers';
export default {
  name: 'Searchbox',
  data() {
    return {
      stringSearch: ''
    };
  },
  watch: {
    '$route.query.q' (q) {
      if (typeof q === 'undefined') {
        return true;
      }
      this.stringSearch = '';
      if (q.length > 0) {
        this.stringSearch = q;
        let stringToSearch = this.filterSearch(q);
        if (
          typeof (this.$store.state.SClient.numericFilters) === 'undefined' ||
          this.$store.state.SClient.numericFilters.length === 0
        ) {
          this.$store.state.SClient.numericFilters = stringToSearch.facetFilters;
        } else {
          this.$store.state.SClient.numericFilters += ' AND' + stringToSearch.facetFilters;
        }
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
      if ((stringSearch.length > 3 && stringSearch.length < 513) || stringSearch.length === 0) {
        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters.search.alias;
        query[attribute] = stringSearch;
        this.$router.replace({ query });
      }
    }
  }
};
</script>