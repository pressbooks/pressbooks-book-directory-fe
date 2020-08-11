import Vue from "vue";
import Vuetify from "vuetify";
import InstantSearch from "vue-instantsearch";
import App from "@/App";
import { store } from "@/store/index";

Vue.use(Vuetify);
Vue.use(InstantSearch);

import {
    mount
} from "@vue/test-utils";

describe("Check main structure for App.vue", () => {
    let vuetify;

    vuetify = new Vuetify({
        theme: { dark: true },
        rtl: false
    });

    const wrapper = mount(App, {
        Vue,
        vuetify,
        store
    });

    it("should have AisInstantSearch component", () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.findComponent({ name: "AisInstantSearch" }).exists()).toBe(true);
    });

    it("should have WelcomeHeader component", () => {
        const welcomeHeader = wrapper.findComponent({ name: "WelcomeHeader" });
        expect(welcomeHeader.exists()).toBe(true);
    });

    it("should have CurrentFilters component", () => {
        const currentFilters = wrapper.findComponent({ name: "CurrentFilters" });
        expect(currentFilters.exists()).toBe(true);
    });

    it("should have Filters component", () => {
        const Filters = wrapper.findComponent({ name: "Filters" });
        expect(Filters.exists()).toBe(true);
    });

    it("should have Books component", () => {
        const Books = wrapper.findComponent({ name: "Books" });
        expect(Books.exists()).toBe(true);
    });

    it("should have Pagination component", () => {
        const Pagination = wrapper.findComponent({ name: "Pagination" });
        expect(Pagination.exists()).toBe(true);
    });
});