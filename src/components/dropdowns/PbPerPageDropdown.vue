<template>
  <ais-hits-per-page
    :items="options"
    class="w-full md:w-1/2"
  >
    <template #default="{ items, refine }">
      <pb-dropdown
        placeholder="Books per page"
        :options="items"
        data-cy="books-per-page"
        @input="refine"
      />
    </template>
  </ais-hits-per-page>
</template>
<script>
import PbDropdown from './PbDropdown.vue';

export default {
  name: 'PbPerPageDropdown',
  components: { PbDropdown },
  props: {
    options: {
      type: Array,
      default() { return []; }
    }
  }
};
</script>
