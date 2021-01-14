import Vue from 'vue';
import Vuex from 'vuex';
import SClient from './modules/searchclient';
import config from './modules/config';
import stats from './modules/stats';
import featuredBooks from './modules/featuredBooks';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    SClient,
    config,
    stats,
    featuredBooks
  }
});
