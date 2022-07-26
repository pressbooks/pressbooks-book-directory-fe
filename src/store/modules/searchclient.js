import algoliasearch from 'algoliasearch/lite';
import helpers from '../helpers';

let sClient = {
  searchClient: algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_API_READ_KEY,
  ),
  indexName: import.meta.env.VITE_ALGOLIA_INDEX_LAST_UPDATED_REPLICA,
  availableIndexes: [
    {
      value: import.meta.env.VITE_ALGOLIA_INDEX,
      default: false,
      orderedBy: 'relevance',
      isReplica: false,
      label: 'Relevance'
    },
    {
      value: import.meta.env.VITE_ALGOLIA_INDEX_LAST_UPDATED_REPLICA,
      default: true,
      orderedBy: 'updated',
      isReplica: true,
      label: 'Recently updated'
    },
    {
      value: import.meta.env.VITE_ALGOLIA_INDEX_ALPHABETICAL_REPLICA,
      default: false,
      orderedBy: 'name',
      isReplica: true,
      label: 'Title (A-Z)'
    }
  ],
  filtersExcluded: [],
  notFilters: [],
  filtersParams: '',
  numericFilters: '',
  hasNumeric: false,
  allowedFilters: {
    licenseCode: {
      type: 'string',
      alias: 'license',
      search: false
    },
    about: {
      type: 'string',
      alias: 'subj',
      empty: 'hasAbout',
      search: true
    },
    hasIsBasedOn: {
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
      empty: 'hasLanguageName',
      search: true
    },
    publisherName: {
      type: 'string',
      alias: 'pub',
      empty: 'hasPublisher',
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
    sortedBy: '',
    facetFilters: [],
    page: 1,
    searchQuery: '',
    hitsPerPageAllowed: [10, 20, 50],
    aliases: {
      hitsPerPage: 'per_page',
      page: 'p',
      sortedBy: 'sort'
    }
  },
  resetMainIndex: true
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
            toInsert.value = toInsert.value.substr  (2);
          }
          filters[attribute].push(toInsert);
        }
      }
      state.filtersExcluded = { ...filters  };
      helpers.functions.setNumericFilters(filters,state);
    },
    getRealAttributesMapped(state) {
      if (Object.keys(state.mappedFilters).length === 0) {
        for (const realAttribute in state.allowedFilters) {
          state.mappedFilters[state.allowedFilters[realAttribute].alias] = realAttribute;
        }
      }
    },
    setPage(state, page) {
      if (parseInt(page) > 0) {
        state.searchParameters.page = page;
      }
    },
    setHitsPerPage(state, hitsPerPage) {
      if (state.searchParameters.hitsPerPageAllowed.includes(parseInt(hitsPerPage))) {
        state.searchParameters.hitsPerPage = hitsPerPage;
      }
    },
    setSortedBy(state, sortedBy) {
      const allowedSorts = state.availableIndexes.map((index) => {
        return index.orderedBy;
      });
      if (allowedSorts.includes(sortedBy)) {
        state.searchParameters.sortedBy = sortedBy;
      }
    },
    setMainIndex(state, index) {
      const allowedIndexes = state.availableIndexes.map((index) => {
        return index.value;
      });
      if (allowedIndexes.includes(index)) {
        state.indexName = index;
        state.availableIndexes = state.availableIndexes.map((indexObj) => {
          indexObj.default = indexObj.value === index;
          return indexObj;
        });
      }
    },
    setResetMainIndex(state, reset) {
      state.resetMainIndex = reset;
    },
    setIndexFromQuery(state, query) {
      Object.keys(query).forEach(key => {
        if (query[key] === undefined) {
          delete query[key];
        }
      });
      const queryKeys = Object.keys(query);
      let setDefaultIndex = false;
      const aliasAllowed =  Object.keys(state.allowedFilters)
        .map(function(key){return state.allowedFilters[key].alias;});
      const keysDiff = aliasAllowed.filter(key => queryKeys.includes(key));
      if ( keysDiff.length === 0) {
        state.searchParameters.sortedBy = 'updated';
        state.availableIndexes[0].default = false;
        state.availableIndexes[1].default = true;
        state.indexName = import.meta.env.VITE_ALGOLIA_INDEX_LAST_UPDATED_REPLICA;
        setDefaultIndex = true;
      }
      if (!setDefaultIndex) {
        state.searchParameters.sortedBy = 'relevance';
        state.availableIndexes[1].default = false;
        state.availableIndexes[0].default = true;
        state.indexName = import.meta.env.VITE_ALGOLIA_INDEX;
      }
    }
  }
};
