let stats = {
    totalBooks: 0,
    totalNetworks: 0
};

export default {
    state: stats,
    mutations: {
        setTotalBooks: (state, totalBooks) => {
            state.totalBooks = totalBooks;
        },
        setTotalNetworks: (state, totalNetworks) => {
            state.totalNetworks = totalNetworks;
        }
    },
    actions: {
        getStats(context, index) {
            index.search('', {facets: 'networkName'}).then(function (response) {
                context.commit("setTotalBooks", response.nbHits);
                context.commit('setTotalNetworks', Object.keys(response.facets.networkName).length)
            })
        }
    }
};