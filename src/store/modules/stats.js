import helpers from '../helpers';

let stats = {
  totalBooks: 0,
  totalNetworks: 0,
  numberOfBooksIndexed: 0,
  numberOfNetworksIndexed:0,
  numberOfRecommendedBooksIndexed: 0,
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
    'isRecommended',
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
    setNumberOfRecommendedBooksIndexed(state, numberOfRecommended) {
      state.numberOfRecommendedBooksIndexed = numberOfRecommended;
    },
    setFilters(state, response) {
      let filters = {};

      for(let facetName of Object.keys(response.facets)) {
        if (state.keepFacets.includes(facetName)) {
          filters[facetName] = [...state.filters[facetName]];

          continue;
        }

        const facetItems = response.facets[facetName];

        filters[facetName] = Object.keys(facetItems).map((item) => {
          return {
            count: facetItems[item],
            facet: item,
          };
        });
      }

      for (let facetName in state.filters) {
        if (typeof  filters[facetName] !== 'undefined' || !state.keepFacets.includes(facetName)) {
          continue;
        }

        filters[facetName] = [...state.filters[facetName]];
      }

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
        if (
          typeof response.facets.isRecommended !== 'undefined' &&
          context.state.numberOfNetworksIndexed === 0 &&
          response.facets.isRecommended['true'] > 0
        ) {
          context.commit('setNumberOfRecommendedBooksIndexed', response.facets.isRecommended['true']);
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
