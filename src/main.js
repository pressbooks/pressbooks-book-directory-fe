import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import InstantSearch from "vue-instantsearch";
import { store } from "./store/index";
import router from './router';

Vue.use(InstantSearch);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  let index = store.state.SClient.searchClient.initIndex(store.state.SClient.indexName);
  store.dispatch('getStats', index).then(() => {
    let query = {};
    let aliasAllowed = Object.keys(store.state.SClient.allowedFilters)
                          .map(function(key){return store.state.SClient.allowedFilters[key].alias});
    for (let attr in to.query) {
      if (aliasAllowed.indexOf(attr) >= 0) {
        if (attr === store.state.SClient.allowedFilters.search.alias) {
          store.state.SClient.searchParameters.searchQuery = to.query[attr];
          continue;
        }
        for (let realAttribute in store.state.SClient.allowedFilters) {
          if (store.state.SClient.allowedFilters[realAttribute].alias === attr) {
            if (typeof(to.query[attr]) !== 'string') {
              to.query[attr] = to.query[attr].toString();
            }
            query[realAttribute] = to.query[attr].split('&&');
            break;
          }
        }
      }
    }
    if (Object.keys(query).length === 0) {
      store.state.SClient.filtersExcluded = {};
      store.state.SClient.notFilters = [];
      store.state.SClient.numericFilters = [];
      store.commit("setFacetFilters", store.state.SClient.notFilters);
      store.commit("setKeepFacets", Object.keys(store.state.SClient.filtersExcluded));
      store.dispatch('getStats', index);
    } else {
      store.commit('setFiltersFromQueryParams', query);
      store.commit("setFacetFilters", store.state.SClient.notFilters);
      store.commit("setKeepFacets", Object.keys(store.state.SClient.filtersExcluded));
      store.dispatch('getStats', index);
    }
    next();
  });
});

new Vue({
  vuetify,
  render: h => h(App),
  store: store,
  router
}).$mount('#app')
