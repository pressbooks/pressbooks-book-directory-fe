import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import InstantSearch from "vue-instantsearch";
import { store } from "./store/index";

Vue.use(InstantSearch);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  store: store
}).$mount('#app')
