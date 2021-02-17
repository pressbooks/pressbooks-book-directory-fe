let componentsLoaded = {
  welcomeHeader: false,
  searchbox: false
};

export default {
  state: componentsLoaded,
  mutations: {
    setComponentAsLoaded(state, component) {
      state[component] = true;
    }
  },
};