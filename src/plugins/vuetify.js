import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import '@/scss/vuetify/overrides.scss';

Vue.use(Vuetify);

export default new Vuetify({
  theme: { disable: true },
  rtl: false, // If you want to set rtl theme then rtl:true else set to false
});
