import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import InstantSearch from 'vue-instantsearch';
import { store } from './store/index';
import router from './router';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import VueMeta from 'vue-meta';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueMeta);
Vue.use(InstantSearch);
Vue.use(VueScrollTo);
Vue.config.productionTip = false;

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

if (typeof process.env.VUE_APP_SENTRY_DSN !== 'undefined') {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    environment: typeof process.env.VUE_APP_ENVIRONMENT !== 'undefined' ? process.env.VUE_APP_ENVIRONMENT : 'development',
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: typeof process.env.VUE_APP_SENTRY_TRACE_RATE !== 'undefined' ? parseFloat(process.env.VUE_APP_SENTRY_TRACE_RATE) : 0.5,
    tracingOptions: {
      trackComponents: true
    },
    logErrors: true
  });
}

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router
}).$mount('#app');
