import Vuetify from 'vuetify';
import InstantSearch from "vue-instantsearch";

import { store } from "@/store/index";

import WelcomeHeader from '@/components/WelcomeHeader';

import {
  mount,
  createLocalVue
} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(InstantSearch);

describe('WelcomeHeader.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const wrapper = mount(WelcomeHeader, {
    localVue,
    vuetify,
    store: store
  });

  expect(wrapper.html()).toMatchSnapshot();
  const title = wrapper.find('.headerwelcome__red-font--pressbooks--header');

  expect(title.text()).toBe('Welcome to Pressbooks');
});