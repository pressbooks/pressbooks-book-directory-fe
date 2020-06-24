import Vue from 'vue';
import Vuetify from 'vuetify';
import InstantSearch from "vue-instantsearch";
import Searchbox from '@/components/Searchbox';

Vue.use(Vuetify);
Vue.use(InstantSearch);

import {
    mount,
    createLocalVue
} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(InstantSearch);

describe('Searchbox.vue', () => {
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const wrapper = mount(Searchbox, {
        localVue,
        vuetify,
        stubs: {
            AisInstantSearch: true,
            AisSearchBox: true
        }
    });

    it('should have ais-search-box component', () => {
        expect(wrapper.findComponent({ name: "AisSearchBox" }).exists()).toBe(true);
    });

    // it('should have the input text', done => {
    //     const boxComponent = wrapper.findComponent({ name: "AisSearchBox" });
    //
    //     console.log(boxComponent.get('input'))
    //     done()
    // });
});