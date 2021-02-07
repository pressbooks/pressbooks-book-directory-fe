let collections = {
  collections: [],
  collectionHeaderCardObjects: [],
  collectionsFacetName: 'collections',
  coverImageFacetName: 'coverImageCollections'
};

export default {
  state: collections,
  mutations: {
    setCollections(state, collections) {
      state.collections = collections;
    },
    setCollectionHeaderCards(state, cards) {
      state.collectionHeaderCardObjects = cards;
    }
  },
  actions: {
    getCollections(context, index) {
      return index.search('', {facets: context.state.collectionsFacetName}).then(function (responseCollectionsFacet) {
        if (
          responseCollectionsFacet.hasOwnProperty('facets') &&
          typeof responseCollectionsFacet.facets[context.state.collectionsFacetName] !== 'undefined'
        ) {
          const collections = Object.keys(responseCollectionsFacet.facets[context.state.collectionsFacetName]);
          if (collections.length > 0) {
            context.commit('setCollections', collections);
            const collectionFacetFiltersParameter = collections.map((collectionString) => {
              return context.state.coverImageFacetName + ':' + collectionString;
            });
            return index.search('', { facetFilters: [collectionFacetFiltersParameter] }).then(function (coverImagesResponse) {
              if (coverImagesResponse.hasOwnProperty('hits')) {
                context.commit(
                  'setCollectionHeaderCards',
                  coverImagesResponse.hits.map((book) => {
                    return {
                      image: book.image,
                      name: book[context.state.coverImageFacetName][0],
                      url: ''
                    };
                  })
                );
              }
            });
          }
        }
      });
    }
  }
};