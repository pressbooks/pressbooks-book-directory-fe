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
export default {
  name: 'Searchbox',
  data() {
    return {
      stringSearch: ''
    };
  },
  watch: {
    '$route.query.q' (q) {
      this.stringSearch = '';
      if (q !== undefined && q.length > 0) {
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
      }
    }
  },
  methods: {
    // Given a facet and substring facet value, search and return all possible values //
    getSimilarFacetValues(facet, value) {
      value = value.replace(/"/g,'');
      // negative facet value
      if (value[0] === '-') {
        value = value.slice(1, value.length);
      }
      let filtersAvailable = this.$store.state.stats.filters;
      let fAvailable = {};
      let possibleValues = [];
      for (const rAttr in filtersAvailable) {
        fAvailable[rAttr] = [];
        for (let i = 0; i < filtersAvailable[rAttr].length; i++) {
          fAvailable[rAttr].push(filtersAvailable[rAttr][i].facet);
        }
      }
      let realAttrs = this.getRealAttributesMapped();
      let matches = fAvailable[realAttrs[facet]].filter(
        function(e) {
          return e.toLowerCase().search(value.toLowerCase()) >= 0;
        }
      );
      if (matches.length > 0) {
        for(let i = 0; i < matches.length; i++) {
          matches[i] = (matches[i].search(' ') >= 0) ? '"' + matches[i] + '"' : matches[i];
          possibleValues.push(matches[i]);
        }
      }
      return possibleValues;
    },
    // get mapped object {realAttribute1: alias1, ...}
    getRealAttributesMapped() {
      let realAttrs = {};
      for (const realAttribute in this.$store.state.SClient.allowedFilters) {
        realAttrs[this.$store.state.SClient.allowedFilters[realAttribute].alias] = realAttribute;
      }
      return realAttrs;
    },
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
      const aliasAllowed = Object.keys(store.state.SClient.allowedFilters).map(function(key){return store.state.SClient.allowedFilters[key].alias;});

      let realAttrs = this.getRealAttributesMapped();
      let possibleValues = [];

      let filtersAvailable = this.$store.state.stats.filters;
      let fAvailable = {};
      for (const rAttr in filtersAvailable) {
        fAvailable[rAttr] = [];
        for (let i = 0; i < filtersAvailable[rAttr].length; i++) {
          fAvailable[rAttr].push(filtersAvailable[rAttr][i].facet);
        }
      }

      for (let p = 0; p < parts.length; p++) {
        // Partial facetFilters
        if (literalFacetValue) {
          literalFacetValue = false;
          if (parts[p][0] === '-') {
            stringFacetFilters[realAttrs[partialFacet]].operator = 'AND NOT';
          }
          possibleValues = this.getSimilarFacetValues(partialFacet, parts[p]);
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
          if (typeof stringFacetFilters[realAttrs[realAttrs[facetAlias[0]]]] === 'undefined') {
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
              possibleValues = this.getSimilarFacetValues(facetAlias[0], facetAlias[1]);
              if (facetAlias[1][0] === '-') {
                stringFacetFilters[realAttrs[facetAlias[0]]].operator = 'AND NOT';
              }
              if (possibleValues.length > 0) {
                for (let j = 0; j < possibleValues.length; j++) {
                  stringFacetFilters[realAttrs[facetAlias[0]]].filters.push(realAttrs[facetAlias[0]] + ':' + possibleValues[j]);
                }
              }
              continue;
            }
          }
        }
        stringToSearch.push(parts[p]);
      }
      console.log(stringFacetFilters);
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
      console.log(stringFilters);
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