import Vue from "vue";
import Vuetify from "vuetify";
import { store } from "@/store/index";
import WelcomeHeader from "@/components/WelcomeHeader";
import Searchbox from "@/components/Searchbox";

Vue.use(Vuetify);

import {
    shallowMount
} from "@vue/test-utils";


describe("WelcomeHeader.vue", () => {
    let vuetify = new Vuetify();

    const wrapper = shallowMount(WelcomeHeader, {
        Vue,
        vuetify,
        store
    });

    it("should have the Searchbox component", () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.findComponent(Searchbox).exists()).toBe(true);
    });

    it("should have the \"Welcome to Pressbooks Directory title\"", () => {
        const title = wrapper.find(".welcome-header__content--bold-red");
        expect(wrapper.html()).toMatchSnapshot();
        expect(title.text()).toBe("Welcome to Pressbooks Directory");
    });
});