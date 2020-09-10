import helpers from '../helpers';

let stats = {
  totalBooks: 0,
  totalNetworks: 0,
  facets: [
    'networkName',
    'license_code',
    'about',
    'languageName',
    'publisher_name',
    'has_isBasedOn'
  ],
  filters: {},
  facetFilters: [],
  keepFacets: []
};

export default {
  state: stats,
  mutations: {
    setTotalBooks(state, totalBooks) {
      state.totalBooks = totalBooks;
    },
    setTotalNetworks(state, totalNetworks) {
      state.totalNetworks = totalNetworks;
    },
    setFacetFilters(state, ff) {
      state.facetFilters = ff;
    },
    setKeepFacets(state, fs) {
      state.keepFacets = fs;
    },
    setFilters(state, response) {
      let fs = {};
      for (let facet in response.facets) {
        if (state.keepFacets.indexOf(facet) < 0) {
          fs[facet] = [];
          for (const f in response.facets[facet]) {
            fs[facet].push({
              count: response.facets[facet][f],
              facet: f
            });
          }
        } else {
          fs[facet] = [...state.filters[facet]];
        }
      }
      state.filters = fs;
    },
    // Given a facet and substring facet value, search and return all possible values //
    getSimilarFacetValues(state, facetValue) {
      return helpers.functions.getSimilarFacetValues(facetValue.facet, facetValue.value, state.filters);
    }
  },
  actions: {
    getStats(context, index) {
      return index.search('', {
        facets: context.state.facets,
        facetFilters: context.state.facetFilters
      }).then(function (response) {
        context.commit('setTotalBooks', response.nbHits);
        context.commit('setTotalNetworks', Object.keys(response.facets.networkName).length);
        context.commit('setFilters', response);
      });
    }
  }
};