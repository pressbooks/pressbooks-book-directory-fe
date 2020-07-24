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
  numericFilters: [],
  searchParameters: {
    hitsPerPage: 10,
    facetFilters: [],
    page: 0
  }
};

function setFilters(oldFilters) {
  let fs = [], ns = [], strQuery = '', f = {}, ti;
  let query = [], numerics = {};
  for (const attribute in oldFilters) {
    query = [];
    for (let i =0; i < oldFilters[attribute].length; i++) {
      f = oldFilters[attribute][i];
      strQuery = ':';
      if (f.exclude) {
        strQuery = ':-';
        fs.push(f.attribute + strQuery + f.value);
      } else {
        if (f.operator !== undefined && f.value > 0) {
          if (numerics[f.attribute] === undefined) {
            numerics[f.attribute] = [];
          }
          numerics[f.attribute].push(f);
        } else {
          ti = f.attribute + strQuery + f.value;
          query.push(ti);
        }
      }
    }
    fs.push(query);
  }
  for (let attr in numerics) {
    if (numerics[attr].length > 1) {
      // range
      let v1 = numerics[attr][0].value;
      let v2 = numerics[attr][1].value;
      if (attr === 'storageSize') {
        v1 = numerics[attr][0].value * 1024 * 1024;
        v2 = numerics[attr][1].value * 1024 * 1024;
      }
      ns.push(attr + ':' + v1 + ' TO ' + v2);
    } else {
      let v3 = numerics[attr][0].value;
      if (attr === 'storageSize') {
        v3 = numerics[attr][0].value * 1024*1024;
      }
      strQuery = numerics[attr][0].operator;
      ns.push(attr + strQuery + v3);
    }
  }
  return [fs, ns.join(' AND ')];
}

export default {
  state: sClient,
  mutations: {
    setFiltersExcluded: (state, filter) => {
      let oldFilters = Object.assign({}, state.filtersExcluded);
      if(typeof(oldFilters[filter.attribute]) === 'undefined') {
        oldFilters[filter.attribute] = [];
      }
      oldFilters[filter.attribute].push(filter);
      let nf = setFilters(oldFilters)
      state.notFilters = nf[0];
      state.numericFilters = nf[1];
      state.filtersExcluded = oldFilters;
    },
    deleteExcluded: (state, field) => {
      let fe = Object.assign({}, state.filtersExcluded);
      delete fe[field];
      state.filtersExcluded = fe;
      let nf = setFilters(fe)
      state.notFilters = nf[0];
      state.numericFilters = nf[1];
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
        let nf = setFilters(fe)
        state.notFilters = nf[0];
        state.numericFilters = nf[1];
      }
    }
  }
};
