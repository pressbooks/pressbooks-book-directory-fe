import {createApp} from 'vue';
import App from './App.vue';
import {store} from './store/index.js';
import InstantSearch from 'vue-instantsearch/vue3/es/index.js';
import VueSelect from 'vue-select';
import VueLazyload from 'vue-lazyload';
import dayjs from 'dayjs';
import {router} from './router/index.js';
import AlgoliaMixin from './mixins/AlgoliaMixin.js';
import utc from 'dayjs/plugin/utc';
import './index.css';

const app = createApp(App);

app.use(store);
app.component('VueSelect', VueSelect);
app.use(InstantSearch);
app.use(router);
app.use(VueLazyload);
app.mixin(AlgoliaMixin);

app.config.globalProperties.$filters = {
  numberFormat(value) {
    return value.toLocaleString();
  }
};

dayjs.extend(utc);

router.beforeEach((to, from, next) => {
  if (to.query[store.state.SClient.searchParameters.aliases.sortedBy] && store.state.SClient.resetMainIndex) {
    // Sort By feature using URL
    const indexesOrderedByMap = store.state.SClient.availableIndexes.reduce((index, item) => {
      return {
        ...index,
        [item.orderedBy]: item.value
      };
    }, {});
    store.commit('setSortedBy', to.query[store.state.SClient.searchParameters.aliases.sortedBy]);
    store.commit('setMainIndex', indexesOrderedByMap[to.query[store.state.SClient.searchParameters.aliases.sortedBy]]);
  } else {
    store.commit('setIndexFromQuery', to.query);
  }
  if (Object.keys(to.query).length === 1 && to.query[store.state.SClient.searchParameters.aliases.sortedBy]) {
    delete to.query[store.state.SClient.searchParameters.aliases.sortedBy];
  }

  let index = store.state.SClient.searchClient.initIndex(store.state.SClient.indexName);
  store.dispatch('getStats', index).then(() => {
    let query = {};
    let containsQ = false;
    const aliasAllowed =  Object.keys(store.state.SClient.allowedFilters)
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

app.mount('#app');
