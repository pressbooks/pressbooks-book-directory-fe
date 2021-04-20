import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import VueMeta from 'vue-meta';
import VueSelect from 'vue-select';
import VueSimpleAccordion from 'vue-simple-accordion';

import 'vue-select/dist/vue-select.css';
import './index.css';
import {store} from './store';

Vue.use(VueMeta);
Vue.component('vue-select', VueSelect);
Vue.use(VueSimpleAccordion);
Vue.use(InstantSearch);

// Fix this later
/*
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
*/

new Vue({
  render: h => h(App),
  store
}).$mount('#app');