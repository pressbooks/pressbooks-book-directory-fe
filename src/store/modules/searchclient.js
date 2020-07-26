import algoliasearch from "algoliasearch/lite";
import helpers from "../helpers";

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
  numericFilters: [],
  searchParameters: {
    hitsPerPage: 10,
    facetFilters: [],
    page: 0
  }
};

export default {
  state: sClient,
  mutations: {
    setFiltersExcluded: (state, filter) => {
      let oldFilters = Object.assign({}, state.filtersExcluded);
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      let nf = helpers.functions.setFilters(oldFilters);
      state.notFilters = nf[0];
      state.numericFilters = nf[1];
      state.filtersExcluded = oldFilters;
    },
    deleteExcluded: (state, field) => {
      let fe = Object.assign({}, state.filtersExcluded);
      delete fe[field];
      let nf = helpers.functions.setFilters(fe)
      state.notFilters = nf[0];
      state.numericFilters = nf[1];
      state.filtersExcluded = fe;
    },
    deleteItemExcluded: (state, f) => {
      let fe = Object.assign({}, state.filtersExcluded);
      if (fe[f.attribute] !== undefined) {
        for (let i = 0; i < fe[f.attribute].length; i++) {
          if (fe[f.attribute][i].value === f.value) {
            fe[f.attribute].splice(i, 1);
            if (fe[f.attribute].length === 0) {
              delete fe[f.attribute];
              break;
            }
          }
        }
        state.filtersExcluded = fe;
        let nf = helpers.functions.setFilters(fe)
        state.notFilters = nf[0];
        state.numericFilters = nf[1];
      }
    }
  }
};
