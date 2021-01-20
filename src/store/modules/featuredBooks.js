import helpers from '../helpers';

let featuredBooks = {
  books: []
};

export default {
  state: featuredBooks,
  mutations: {
    setFeaturedBooks(state, books) {
      state.books = books;
    }
  },
  actions: {
    getFeaturedBooks(context, index) {
      const params = {
        facetFilters: 'is_featured:true'
      };
      return index.search('', params).then(function (response) {
        if (response.hasOwnProperty('hits')) {
          context.commit('setFeaturedBooks', response.hits);
        }
      });
    }
  }
};