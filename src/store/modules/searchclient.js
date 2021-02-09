import algoliasearch from 'algoliasearch/lite';
import helpers from '../helpers';

let sClient = {
  searchClient: algoliasearch(
    process.env.VUE_APP_ALGOLIA_APP_ID,
    process.env.VUE_APP_ALGOLIA_API_READ_KEY,
    { _useRequestCache: true }
  ),
  indexName: process.env.VUE_APP_ALGOLIA_INDEX,
  filtersExcluded: [],
  notFilters: [],
  filtersParams: '',
  numericFilters: '',
  hasNumeric: false,
  allowedFilters: {
    license_code: {
      type: 'string',
      alias: 'license',
      empty: 'has_license',
      search: false
    },
    about: {
      type: 'string',
      alias: 'subj',
      empty: 'has_abouts',
      search: true
    },
    has_isBasedOn: {
      type: 'boolean',
      alias: 'based',
      search: false
    },
    wordCount: {
      type: 'numeric',
      alias: 'words',
      search: false
    },
    languageName: {
      type: 'string',
      alias: 'lang',
      empty: 'has_language_name',
      search: true
    },
    publisher_name: {
      type: 'string',
      alias: 'pub',
      empty: 'has_publisher',
      search: true
    },
    storageSize: {
      type: 'numeric',
      alias: 'storage',
      search: false
    },
    h5pActivities: {
      type: 'numeric',
      alias: 'h5p',
      search: false
    },
    search: {
      type: 'string',
      alias: 'q',
      search: false
    },
    networkName: {
      type: 'string',
      alias: 'net',
      empty: 'has_network_name',
      search: true
    },
    lastUpdated: {
      type: 'numeric',
      alias: 'updated',
      search: false
    },
    collections: {
      type: 'string',
      alias: 'collec',
      search: false,
      default: []
    }
  },
  mappedFilters: {},
  searchFilters: '',
  searchParameters: {
    hitsPerPage: 10,
    facetFilters: [],
    page: 0,
    searchQuery: ''
  }
};

export default {
  state: sClient,
  mutations: {
    setFiltersFromQueryParams(state, query) {
      let filters = {}, exclude = false, toInsert = {}, currentAttr = '';
      for (let attribute in query) {
        filters[attribute] = [];
        for (let i = 0; i < query[attribute].length; i++) {
          exclude = false;
          if (query[attribute][i][0] === '-') {
            exclude = true;
            query[attribute][i] = query[attribute][i].substr(1);
          }
          if (state.allowedFilters[attribute].type === 'boolean' && query[attribute][i] === 'false') {
            exclude = true;
          }
          currentAttr = attribute;
          if (
            query[attribute][i] === 'empty' &&
            Object.prototype.hasOwnProperty.call(state.allowedFilters[attribute], 'empty')
          ) {
            query[attribute][i] = false;
            currentAttr = state.allowedFilters[attribute].empty;
          }
          toInsert = {
            attribute: currentAttr,
            exclude,
            value: query[attribute][i]
          };
          if (state.allowedFilters[attribute].type === 'numeric') {
            toInsert.operator = (query[attribute][i].search('>=') >= 0) ? '>=' : '<=';
            toInsert.value = toInsert.value.substr(2);
          }
          filters[attribute].push(toInsert);
        }
      }
      state.filtersExcluded = { ...filters  };
      let nf = helpers.functions.setFilters(filters, state.allowedFilters);
      state.notFilters = nf[0];
      state.hasNumeric = (nf[1].length > 0);
      state.numericFilters = nf[1];
      state.filtersParams = helpers.functions.setParamsFilters(state.numericFilters, state.searchFilters);
    },
    setFiltersExcluded(state, filter) {
      let oldFilters = { ...state.filtersExcluded };
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      state.filtersExcluded = { ...oldFilters  };
      let nf = helpers.functions.setFilters(oldFilters, state.allowedFilters);
      state.notFilters = nf[0];
      state.hasNumeric = (nf[1].length > 0);
      state.numericFilters = nf[1];
      state.filtersParams = helpers.functions.setParamsFilters(state.numericFilters, state.searchFilters);
    },
    deleteExcluded(state, field) {
      let fe = { ...state.filtersExcluded };
      delete fe[field];
      let nf = helpers.functions.setFilters(fe, state.allowedFilters);
      state.notFilters = nf[0];
      state.filtersParams = nf[1];
      state.filtersExcluded = fe;
    },
    deleteItemExcluded(state, f) {
      let fe = { ...state.filtersExcluded };
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
        let nf = helpers.functions.setFilters(fe, state.allowedFilters);
        state.notFilters = nf[0];
        state.hasNumeric = (nf[1].length > 0);
        state.numericFilters = nf[1];
        state.filtersParams = helpers.functions.setParamsFilters(state.numericFilters, state.searchFilters);
      }
    },
    // get mapped object {realAttribute1: alias1, realAttribute2:alias2, ...}
    getRealAttributesMapped(state) {
      if (Object.keys(state.mappedFilters).length === 0) {
        for (const realAttribute in state.allowedFilters) {
          state.mappedFilters[state.allowedFilters[realAttribute].alias] = realAttribute;
        }
      }
    }
  }
};
