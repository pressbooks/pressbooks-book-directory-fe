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
        facetFilters: 'featured:true'
      };
      return index.search('', params).then(function (response) {
        context.commit('setFeaturedBooks', response.hits);
      });
    }
  }
};