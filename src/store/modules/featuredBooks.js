import helpers from '../helpers';

let featuredBooks = {
  books: [],
  field: 'featured'
};

export default {
  state: featuredBooks,
  mutations: {
    setBooks(state, books) {
      state.books = books;
    }
  },
  actions: {
    getBooks(context, index) {
      return index.search('', params).then(function (response) {
        context.commit('setTotalBooks', response.nbHits);
        if (typeof response.facets.networkName === 'undefined') {
          response.facets.networkName = [];
        }
        context.commit('setTotalNetworks', Object.keys(response.facets.networkName).length);
        context.commit('setFilters', response);
      });
    }
  }
};