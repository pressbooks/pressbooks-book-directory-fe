import algoliasearch from "algoliasearch/lite";

let sClient = {
  searchClient: algoliasearch(
    process.env.VUE_APP_ALGOLIA_APP_ID,
    process.env.VUE_APP_ALGOLIA_API_READ_KEY,
    { _useRequestCache: true }
  ),
  indexName: process.env.VUE_APP_ALGOLIA_INDEX,
  filtersClosed: {},
  searchParameters: {
    hitsPerPage: 6,
    facetFilters: [],
    page: 0
  }
};

export default {
  state: sClient,
  mutations: {
    setFiltersClosed: (state, filter) => {
      if(typeof(state.filtersClosed[filter.attribute]) === 'undefined') {
        state.filtersClosed[filter.attribute] = [];
      }
      state.filtersClosed[filter.attribute].push(filter);
    }
  }
};
