import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App
    }
  ],
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  },
});
