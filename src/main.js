import Vue from "vue";
import App from "./App.vue";
import InstantSearch from "vue-instantsearch";
import Vuetify from "vuetify";

import { store } from "./store/index";
import "vuetify/dist/vuetify.min.css";

Vue.use(InstantSearch);
Vue.use(Vuetify);

const vuetifyOptions = {};

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: h => h(App),
  store: store,
  vuetify: new Vuetify(vuetifyOptions)
});
