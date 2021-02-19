let componentsLoaded = {
  welcomeHeader: false
};

export default {
  state: componentsLoaded,
  mutations: {
    setComponentAsLoaded(state, component) {
      state[component] = true;
    }
  },
};