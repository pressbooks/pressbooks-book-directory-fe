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
    hitsPerPage: 10,
    facetFilters: [],
    page: 0
  }
};

export default {
  state: sClient,
  mutations: {
    setFiltersClosed: (state, filter) => {
      // array push function doesn't work for watching variable in components. We need to ASSIGN to dispatch the event.
      let oldFilters = Object.assign({}, state.filtersClosed);
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      state.filtersClosed = oldFilters;
    }
  }
};
