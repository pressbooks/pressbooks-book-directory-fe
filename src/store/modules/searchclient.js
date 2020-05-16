import algoliasearch from "algoliasearch/lite";

let sClient = {
  searchClient: algoliasearch(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_API_READ_KEY,
      { _useRequestCache: true }
  ),
  indexName: process.env.VUE_APP_ALGOLIA_INDEX,
  facetAux: [],
  helper: {},
  filtersApplied: {},
  searchParameters: {
    hitsPerPage: 10,
    facetFilters: [],
    // filters: '',
    facets: [
      "isBasedOn",
      "has_isBasedOn",
      "license_name",
      "inLanguage",
      "publisher_name",
      "author",
      "editor",
      "wordCount"
    ],
    disjunctiveFacets: [
      "isBasedOn",
      "has_isBasedOn",
      "license_name",
      "inLanguage",
      "publisher_name",
      "author",
      "editor",
      "wordCount"
    ]
  },
  filtersAllowed: {
    license_name: {
      type: "string"
    },
    inLanguage: {
      type: "string"
    },
    has_isBasedOn: {
      type: "boolean"
    },
    publisher_name: {
      type: "string"
    },
    editor: {
      type: "string"
    },
    isBasedOn: {
      type: "boolean"
    },
    author: {
      type: "string"
    },
    wordCount: {
      type: "integer"
    },
    storageSize: {
      type: "integer"
    },
    h5pActivities: {
      type: "integer"
    }
  }
};

export default {
  state: sClient,
  mutations: {
    setFacetFilters: (state) => {
      let stringFilter = '';
      for (let attribute in state.filtersApplied) {
        if (state.filtersApplied[attribute].length === 1) {
          stringFilter += state.filtersApplied[attribute][0].stringFilter + ' AND ';
          state.searchParameters.facetFilters.push(state.filtersApplied[attribute][0].stringFilter);
        } else {
          let toPush = [];
          state.filtersApplied[attribute].forEach(f => {
            toPush.push(f.stringToFilter);
            stringFilter += ' OR ';
          });
          state.searchParameters.facetFilters.push(toPush)
        }
      }
      // stringFilter = stringFilter.split(" ");
      // state.searchParameters.filters = stringFilter.slice(0, -2).join(" ");
    },
    setHelper: (state, helper) => {
      state.helper = helper;
    },
    setFiltersApplied: (state, filter) => {
      if (Object.keys(filter).length === 0) {
        state.filtersApplied = {};
        return;
      }
      let condition = 'AND'
      if (filter.attribute in state.filtersApplied) {
        condition = 'OR';
      } else {
        state.filtersApplied[filter.attribute] = [];
      }

      let typeVar = state.filtersAllowed[filter.attribute].type;
      let stringFilter = ';'

      switch (typeVar) {
        case "boolean":
          stringFilter = filter.attribute + ':' + filter.value;
          break;
        case "integer":
          stringFilter = filter.attribute + filter.operator + filter.value;
        default:
          stringFilter = filter.attribute + ':"' + filter.value + '"';
          break;
      }
      state.filtersApplied[filter.attribute].push({value: filter.value, condition: condition, stringFilter: stringFilter});
    }
  },
  actions: {
    searchFunction(context, helper) {
      if (context.state.searchParameters.facetFilters.length > 0) {
        helper.clearRefinements();
        for (let attribute in context.state.filtersApplied) {
          if (context.state.filtersApplied[attribute].length === 1) {
            helper.addDisjunctiveFacetRefinement(attribute, context.state.filtersApplied[attribute][0].value);
          } else {
            context.state.filtersApplied[attribute].forEach(f => {
              helper.addFacetRefinement(attribute, f.value);
            });
          }
        }
        // context.commit('setHelper', helper);
        // context.commit('setFiltersApplied', {});
        // context.commit( 'setFilters', [] );
      } else {
        // context.state.filtersApplied = {};
      }
      helper.search();
    },
    applyFilters(context, params) {
      let filters = [];
      params.forEach(param => {
        let item = param.item, attribute = param.attribute;
        if (context.state.filtersAllowed[attribute] === undefined) {
          return;
        }
        let attr = attribute,
            value;
        value = item[attr].value;
        let newFilter = {attribute: attr, value: value};
        filters.push(newFilter);
      });
      context.commit('setFacetFilters');
    }
  }
};
