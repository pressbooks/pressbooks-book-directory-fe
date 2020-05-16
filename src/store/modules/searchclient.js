import algoliasearch from "algoliasearch/lite";

let sClient = {
  searchClient: algoliasearch(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_API_READ_KEY,
      { _useRequestCache: true }
  ),
  indexName: process.env.VUE_APP_ALGOLIA_INDEX,
  filters: [],
  stringFilters: '',
  helper: {},
  filtersApplied: {},
  searchParameters: {
    hitsPerPage: 10,
    filters: "",
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
    setFilters: (state, filters) => {
      state.filters = filters;
    },
    setHelper: (state, helper) => {
      state.helper = helper;
    },
    setFiltersApplied: (state, filter) => {
      if (Object.keys(filter).length === 0) {
        state.searchParameters.filters = '';
        state.stringFilters = '';
        state.filtersApplied = {};
        return;
      }
      let condition = 'AND'
      if (filter.attribute in state.filtersApplied) {
        condition = 'OR';
      } else {
        state.filtersApplied[filter.attribute] = [];
      }
      state.filtersApplied[filter.attribute].push({value: filter.value, condition: condition});
      let typeVar = state.filtersAllowed[filter.attribute].type;
      let value = '';
      switch (typeVar) {
        case "boolean":
          value = filter.value;
          break;
        case "integer":
          value = filter.value;
        default:
          value = '"' + filter.value + '"';
          break;
      }
      if (state.stringFilters.length > 0) {
        state.stringFilters += condition + ' ' + filter.attribute + filter.comparator + value + ' ';
      } else {
        state.stringFilters = filter.attribute + filter.comparator + value + ' ';
      }
    },
    setSearchParametersFilters: (state) => {
      state.searchParameters.filters = state.stringFilters;
      console.log(state.searchParameters.filters)
    }
  },
  actions: {
    searchFunction(context, helper) {
      if (context.state.filters.length > 0) {
        helper.clearRefinements();
        console.log(context.state.filtersApplied)
        for (let attribute in context.state.filtersApplied) {
          context.state.filtersApplied[attribute].forEach(f => {
            helper.addDisjunctiveFacetRefinement(attribute, f.value);
          });
        }
        context.commit('setHelper', helper);
        context.commit('setFiltersApplied', {});
        context.commit( 'setFilters', [] );
      } else {
        context.state.filtersApplied = {};
      }
      helper.search();
    },
    applyBulkFilters(context) {
      let filters = [], item = {};
      for (let attribute in context.state.filtersApplied) {
        context.state.filtersApplied[attribute].forEach(f => {
          item = {};
          item[attribute] = f.value;
          filters.push({
            attribute: attribute,
            item: item
          });
        });
      }
      context.dispatch('applyFilters', filters);
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
      context.state.filters = context.state.filters.concat(filters)
      context.commit('setSearchParametersFilters');
    }
  }
};
