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
      stringSearch: '',
      switchFacets: false,
      selectFacet: [],
      itemsFacet: []
    };
  },
  watch: {
    '$route.query.q' (q) {
      console.log(this.$store.state.stats.filters);
      if (
        q !== undefined &&
        q.length > 0
      ) {
        this.stringSearch = q;
        let stringToSearch = this.filterSearch(q);
        console.log(stringToSearch);
        if (
          typeof (this.$store.state.SClient.numericFilters) === 'undefined' ||
          this.$store.state.SClient.numericFilters.length === 0
        ) {
          this.$store.state.SClient.numericFilters = stringToSearch.facetFilters;
        } else {
          this.$store.state.SClient.numericFilters += ' AND' + stringToSearch.facetFilters;
        }
        this.$store.state.SClient.searchParameters.searchQuery += stringToSearch.stringSearch;
      }
    }
  },
  methods: {
    filterSearch(stringSearch) {
      // Analyze strings //
      // split by literals if exists, otherwise by space
      const parts = stringSearch.match(/("[^"]+"|[^"\s]+)/g);
      let literalFacetValue = false;
      let stringFacetFilters = [];
      let partialFacet = '';
      let stringToSearch = [];
      let store = this.$store;
      const aliasAllowed = Object.keys(store.state.SClient.allowedFilters).map(function(key){return store.state.SClient.allowedFilters[key].alias;});
      // map alias with real attribute name
      let realAttrs = {};
      for (const realAttribute in this.$store.state.SClient.allowedFilters) {
        realAttrs[this.$store.state.SClient.allowedFilters[realAttribute].alias] = realAttribute;
      }

      // Get all facetsValues available (we currently have it in stats store)
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
          stringFacetFilters.push(partialFacet + parts[p]);
          partialFacet = '';
          continue;
        }
        // Check if it is a search by facets
        if (parts[p].search(':') >= 0) {
          let facetAlias = parts[p].split(':');
          if(aliasAllowed.indexOf(facetAlias[0].toLowerCase())) {
            // {facet}:"{value_with_special_characters}", i.e: publisher:"University Queen's"
            if (facetAlias.length === 1) {
              // only attribute is available at this point
              literalFacetValue = true;
              partialFacet += realAttrs[facetAlias[0]] + ':';
              continue;
            } else {
              // if present some similar facet value
              let matches = fAvailable[realAttrs[facetAlias[0]]].filter(
                function(e) {
                  return e.toLowerCase().search(facetAlias[1].toLowerCase()) >= 0;
                }
              );
              if (matches.length > 0) {
                for(let i = 0; i < matches.length; i++) {
                  if (matches[i].search(' ') >= 0) {
                    matches[i] = '"' + matches[i] + '"';
                  }
                  stringFacetFilters.push(realAttrs[facetAlias[0]] + ':' + matches[i]);
                }
                continue;
              }
            }
          }
        }
        stringToSearch.push(parts[p]);
      }
      return {
        facetFilters: stringFacetFilters.join(' OR '),
        stringSearch: stringToSearch.join(' ')
      };
    },
    search(stringSearch) {
      if ((stringSearch.length > 3 && stringSearch.length < 513) || stringSearch.length === 0) {
        const searchObjFilter = this.filterSearch(stringSearch);

        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters.search.alias;
        query[attribute] = stringSearch;
        this.$router.replace({ query });
      }
    }
  }
};
</script>