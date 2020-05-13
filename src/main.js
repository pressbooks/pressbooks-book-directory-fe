import Vue from "vue";
import App from "./App.vue";
import InstantSearch from "vue-instantsearch";
import { store } from "./store/index";

Vue.use(InstantSearch);

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: h => h(App),
  store: store
});
