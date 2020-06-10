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
    hitsPerPage: 5,
    facetFilters: [],
    page: 0,
    facets: [
      "isBasedOn",
      "has_isBasedOn",
      "license_name",
      "languageName",
      "publisher_name",
      "author",
      "editor",
      "wordCount",
      "about"
    ],
    disjunctiveFacets: [
      "isBasedOn",
      "has_isBasedOn",
      "license_name",
      "languageName",
      "publisher_name",
      "author",
      "editor",
      "wordCount",
      "about"
    ]
  },
  filtersAllowed: {
    license_name: {
      type: "string"
    },
    languageName: {
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
    },
    about: {
      type: "string"
    }
  }
};

export default {
  state: sClient,
  mutations: {
    setFacetFilters: state => {
      state.searchParameters.facetFilters = [];
      for (let attribute in state.filtersApplied) {
        if (state.filtersApplied[attribute].length === 1) {
          state.filtersApplied[attribute][0].stringFilter + " AND ";
          state.searchParameters.facetFilters.push(
            state.filtersApplied[attribute][0].stringFilter
          );
        } else {
          let toPush = [];
          state.filtersApplied[attribute].forEach(f => {
            toPush.push(f.stringToFilter);
          });
          state.searchParameters.facetFilters.push(toPush);
        }
      }
    },
    setFiltersApplied: (state, filter) => {
      if (Object.keys(filter).length === 0) {
        state.filtersApplied = {};
        return;
      }
      let condition = "AND";
      if (filter.attribute in state.filtersApplied) {
        condition = "OR";
      } else {
        state.filtersApplied[filter.attribute] = [];
      }

      let typeVar = state.filtersAllowed[filter.attribute].type;
      let stringFilter = ";";

      switch (typeVar) {
        case "boolean":
          stringFilter = filter.attribute + ":" + filter.value;
          break;
        case "integer":
          stringFilter = filter.attribute + filter.operator + filter.value;
          break;
        default:
          stringFilter = filter.attribute + ':"' + filter.value + '"';
          break;
      }
      state.filtersApplied[filter.attribute].push({
        type: typeVar,
        value: filter.value,
        condition: condition,
        stringFilter: stringFilter,
        operator: filter.operator
      });
    }
  },
  actions: {
    searchFunction(context, helper) {
      helper.clearRefinements();
      if (context.state.searchParameters.facetFilters.length > 0) {
        for (let attribute in context.state.filtersApplied) {
          if (context.state.filtersApplied[attribute].length === 1) {
            if (context.state.filtersApplied[attribute][0].type === "integer") {
              helper.addNumericRefinement(
                attribute,
                context.state.filtersApplied[attribute][0].operator,
                context.state.filtersApplied[attribute][0].value
              );
            } else {
              helper.addDisjunctiveFacetRefinement(
                attribute,
                context.state.filtersApplied[attribute][0].value
              );
            }
          } else {
            context.state.filtersApplied[attribute].forEach(f => {
              if (f.type === "integer") {
                helper.addNumericRefinement(attribute, f.operator, f.value);
              } else {
                helper.addDisjunctiveFacetRefinement(attribute, f.value);
              }
            });
          }
        }
      }
      helper.setPage(context.state.searchParameters.page);
      helper.search();
    },
    applyFilters(context, params) {
      let filters = [];
      params.forEach(param => {
        let item = param.item,
          attribute = param.attribute;
        if (context.state.filtersAllowed[attribute] === undefined) {
          return;
        }
        let attr = attribute,
          value;
        value = item[attr].value;
        let newFilter = { attribute: attr, value: value };
        filters.push(newFilter);
      });
      context.commit("setFacetFilters");
    },
    refreshFilters(context) {
      let filters = [],
        item = {};
      for (let attribute in context.state.filtersApplied) {
        item = {};
        item[attribute] = context.state.filtersApplied[attribute];
        filters.push({
          attribute: attribute,
          item: item
        });
      }
      context.dispatch("applyFilters", filters);
    }
  }
};
