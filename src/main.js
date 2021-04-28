import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import VueMeta from 'vue-meta';
import VueSelect from 'vue-select';
import router from './router';

import 'vue-select/dist/vue-select.css';
import './index.css';
import {store} from './store';

Vue.use(VueMeta);
Vue.component('VueSelect', VueSelect);
Vue.use(InstantSearch);

router.beforeEach((to, from, next) => {
  let indexName = store.state.SClient.availableIndexes.filter((index) => {
    return ! index.isReplica;
  });
  let index = store.state.SClient.searchClient.initIndex(indexName[0].value);
  store.dispatch('getStats', index).then(() => {
    let query = {};
    let containsQ = false;
    let aliasAllowed = Object.keys(store.state.SClient.allowedFilters)
      .map(function(key){return store.state.SClient.allowedFilters[key].alias;});
    for (let attr in to.query) {
      if (aliasAllowed.indexOf(attr) >= 0) {
        if (attr === store.state.SClient.allowedFilters.search.alias) {
          // query search is handled in SearchBox component
          containsQ = true;
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
    if (Object.keys(query).length === 0 && !containsQ) {
      store.state.SClient.filtersExcluded = {};
      store.state.SClient.notFilters = [];
      store.state.SClient.numericFilters = [];
    }
    store.commit('setFiltersFromQueryParams', query);
    store.commit('setFacetFilters', store.state.SClient.notFilters);
    store.commit('setNumericFilters', store.state.SClient.numericFilters);
    store.commit('setKeepFacets', Object.keys(store.state.SClient.filtersExcluded));
    store.dispatch('getStats', index);
    next();
  });
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
