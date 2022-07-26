import {createRouter, createWebHistory} from 'vue-router';
// there is also createWebHashHistory and createMemoryHistory

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component : () => import('../App.vue')
    }
  ],
});
