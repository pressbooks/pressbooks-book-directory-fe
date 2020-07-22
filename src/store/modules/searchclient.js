import algoliasearch from "algoliasearch/lite";

let sClient = {
  searchClient: algoliasearch(
    process.env.VUE_APP_ALGOLIA_APP_ID,
    process.env.VUE_APP_ALGOLIA_API_READ_KEY,
    { _useRequestCache: true }
  ),
  indexName: process.env.VUE_APP_ALGOLIA_INDEX,
  filtersClosed: {},
  filtersByExcluded: [],
  filtersExcluded: [],
  refineFunctions: {},
  notFilters: [],
  searchParameters: {
    hitsPerPage: 10,
    facetFilters: [],
    page: 0
  }
};

export default {
  state: sClient,
  mutations: {
    setRefineFunctions: (state, atref) => {
      state.refineFunctions[atref.attribute] = atref.refine;
    },
    setFiltersExcluded: (state, filter) => {
      let oldFilters = Object.assign({}, state.filtersExcluded);
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      state.filtersExcluded = oldFilters;
      state.notFilters.push(filter.attribute + ':-' + filter.value);
    }
  }
};
