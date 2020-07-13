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
    },
    setFiltersByExcluded: (state, filter) => {
      let oldFilters = [...state.filtersByExcluded];
      oldFilters.push(filter);
      state.filtersByExcluded = oldFilters;
    },
    setFiltersExcluded: (state, filter) => {
      let oldFilters = Object.assign({}, state.filtersExcluded);
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      state.filtersExcluded = oldFilters;
    },
    deleteFiltersByExcluded: (state, filter) => {
      let oldFilters = [...state.filtersByExcluded];
      const index = oldFilters.indexOf(filter);
      if (index > -1) {
        oldFilters.splice(index, 1);
      }
      state.filtersByExcluded = oldFilters;
    },
    deleteFiltersExcluded: (state, filter) => {
      let oldFilters = Object.assign({}, state.filtersExcluded);
      delete oldFilters[filter];
      state.filtersExcluded = oldFilters;
    },
  }
};
