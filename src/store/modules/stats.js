import helpers from '../helpers';

let stats = {
  totalBooks: 0,
  totalNetworks: 0,
  numberOfBooksIndexed: 0,
  numberOfNetworksIndexed:0,
  facets: [
    'networkName',
    'licenseCode',
    'about',
    'languageName',
    'publisherName',
    'hasIsBasedOn',
    'hasLicense',
    'hasAbout',
    'hasLanguageName',
    'hasPublisher',
    'hasNetworkName',
    'hasInstitutions',
    'institutions',
    'collections'
  ],
  filters: {},
  facetFilters: [],
  numericFilters: '',
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
    setNumberOfBooksIndexed(state, books) {
      state.numberOfBooksIndexed = books;
    },
    setNumberOfNetworksIndexed(state, networks) {
      state.numberOfNetworksIndexed = networks;
    },
    setFacetFilters(state, ff) {
      state.facetFilters = ff;
    },
    setNumericFilters(state, numericFilters) {
      state.numericFilters = numericFilters;
    },
    setKeepFacets(state, fs) {
      state.keepFacets = fs;
    },
    setFilters(state, response) {
      let filters = Object.keys(response.facets).reduce((filters, facetName) => {
        if (state.keepFacets.includes(facetName)) {
          filters[facetName] = [...state.filters[facetName] || []];

          return filters;
        }

        let facetItems = response.facets[facetName];

        filters[facetName] = Object.keys(facetItems).map((item) => ({
          count: facetItems[item],
          facet: item,
        }));

        return filters;
      }, {});

      Object.keys(state.filters).forEach((facetName) => {
        if (typeof filters[facetName] !== 'undefined' || !state.keepFacets.includes(facetName)) {
          return;
        }

        filters[facetName] = [...state.filters[facetName]];
      });

      state.filters = {...filters};
    },
    // Given a facet and substring facet value, search and return all possible values //
    getSimilarFacetValues(state, facetValue) {
      return helpers.functions.getSimilarFacetValues(facetValue.facet, facetValue.value, state.filters);
    }
  },
  actions: {
    getStats(context, index) {
      let params = {
        facets: context.state.facets,
        facetFilters: context.state.facetFilters
      };
      if (context.state.numericFilters.length > 0) {
        params.filters = context.state.numericFilters;
      }
      return index.search('', params).then(function (response) {
        context.commit('setTotalBooks', response.nbHits);
        if (typeof response.facets.networkName === 'undefined') {
          response.facets.networkName = [];
        }

        context.commit('setTotalNetworks', Object.keys(response.facets.networkName).length);
        context.commit('setFilters', response);
        if (context.state.numberOfBooksIndexed === 0) {
          context.commit('setNumberOfBooksIndexed', response.nbHits);
        }
        if (context.state.numberOfNetworksIndexed === 0) {
          context.commit('setNumberOfNetworksIndexed', Object.keys(response.facets.networkName).length);
        }
      });
    }
  }
};
