<template>
  <ais-sort-by
    :items="options"
    class="w-ful md:w-1/2"
  >
    <template #default="{ items, refine }">
      <pb-dropdown
        placeholder="Sort books by"
        :options="items"
        data-cy="sort-books-by"
        @input="refine"
      />
    </template>
  </ais-sort-by>
</template>
<script>
import PbDropdown from './PbDropdown.vue';

export default {
  name: 'PbSortByDropdown',
  components: { PbDropdown },
  props: {
    options: {
      type: Array,
      default() { return []; }
    }
  }
};
</script>
