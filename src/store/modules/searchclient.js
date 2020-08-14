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
    numericFilters: [],
    allowedFilters: {
        license_code: {
            type: 'string',
            alias: 'license'
        },
        about: {
            type: 'string',
            alias: 'subj'
        },
        has_isBasedOn: {
            type: 'boolean',
            alias: 'based'
        },
        wordCount: {
            type: 'numeric',
            alias: 'words'
        },
        languageName: {
            type: 'string',
            alias: 'lang'
        },
        publisher_name: {
            type: 'string',
            alias: 'pub'
        },
        storageSize: {
            type: 'numeric',
            alias: 'storage'
        },
        h5pActivities: {
            type: 'numeric',
            alias: 'h5p'
        },
        search: {
            type: 'string',
            alias: 'q'
        },
        networkName: {
            type: 'string',
            alias: 'net'
        },
        lastUpdated: {
            type: 'numeric',
            alias: 'updated'
        },
    },
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
            let filters = {}, exclude = false, toInsert = {};
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
                    toInsert = {
                        attribute,
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
            state.numericFilters = nf[1];
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
            state.numericFilters = nf[1];
        },
        deleteExcluded(state, field) {
            let fe = { ...state.filtersExcluded };
            delete fe[field];
            let nf = helpers.functions.setFilters(fe, state.allowedFilters);
            state.notFilters = nf[0];
            state.numericFilters = nf[1];
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
                state.numericFilters = nf[1];
            }
        }
    }
};
