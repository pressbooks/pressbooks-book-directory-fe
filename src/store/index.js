import SClient from './modules/searchclient';
import config from './modules/config';
import stats from './modules/stats';
import featuredBooks from './modules/featuredBooks';
import collections from './modules/collections';
import componentsLoaded from './modules/componentsLoaded';

//store/index.js
import { createStore } from 'vuex';

export const store = createStore({
  modules:{
    SClient,
    config,
    stats,
    featuredBooks,
    collections,
    componentsLoaded
  }
});
