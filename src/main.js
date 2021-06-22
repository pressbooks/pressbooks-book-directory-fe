import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import VueSelect from 'vue-select';
import VueTailwind from 'vue-tailwind';
import router from './router';
import VueTailwindConfig from './vuetailwind.config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import './index.css';
import {store} from './store';

Vue.component('VueSelect', VueSelect);
Vue.use(InstantSearch);
Vue.use(VueTailwind, VueTailwindConfig);

dayjs.extend(utc);
// init router
router.beforeEach((to, from, next) => {
  if (to.query[store.state.SClient.searchParameters.aliases.sortedBy] && store.state.SClient.resetMainIndex) {
    const indexesOrderedByMap = store.state.SClient.availableIndexes.reduce((index, item) => {
      return {
        ...index,
        [item.orderedBy]: item.value
      };
    }, {});
    store.commit('setSortedBy', to.query[store.state.SClient.searchParameters.aliases.sortedBy]);
    store.commit('setMainIndex', indexesOrderedByMap[to.query[store.state.SClient.searchParameters.aliases.sortedBy]]);
  }
  let index = store.state.SClient.searchClient.initIndex(store.state.SClient.indexName);
  store.dispatch('getStats', index).then(() => {
    let query = {};
    let containsQ = false;
    let aliasAllowed = Object.keys(store.state.SClient.allowedFilters)
      .map(function(key){return store.state.SClient.allowedFilters[key].alias;});

    if (to.query[store.state.SClient.searchParameters.aliases.page]) {
      store.commit('setPage', to.query[store.state.SClient.searchParameters.aliases.page]);
    }
    if (to.query[store.state.SClient.searchParameters.aliases.hitsPerPage]) {
      store.commit('setHitsPerPage', to.query[store.state.SClient.searchParameters.aliases.hitsPerPage]);
    }
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
