<template>
  <v-sheet
      v-if="state && state.searchMetadata.isSearchStalled"
      color="grey lighten-4"
      class="px-3 pt-3 pb-3"
  >
    <v-skeleton-loader
        class="mx-auto"
        type="table-heading, card, actions"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch';

const connectSearchMetaData = (renderFn, unmountFn) => () => ({
  init() {
    renderFn({ searchMetadata: {} }, true);
  },

  render({ searchMetadata }) {
    renderFn({ searchMetadata }, false);
  },

  dispose() {
    unmountFn();
  },
});

export default {
  name: 'Loading',
  mixins: [createWidgetMixin({ connector: connectSearchMetaData })],
};
</script>

