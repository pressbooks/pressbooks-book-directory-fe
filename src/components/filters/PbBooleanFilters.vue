<template>
  <pb-accordion :open="typeof(this.$store.state.SClient.filtersExcluded[field]) !== 'undefined'">
    <template #title>
      <span class="title font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <div
        data-cy="filter-option"
        class="body py-2 px-4 flex items-center justify-between space-x-1"
      >
        <span class="title text-sm text-gray-900 w-full">
          {{ title }}
        </span>
        <pb-filter-buttons
          :item="item"
          :field="field"
        />
      </div>
    </template>
  </pb-accordion>
</template>

<script>
import PbAccordion from '../PbAccordion.vue';
import PbFilterButtons from './PbFilterButtons.vue';

export default {
  name: 'PbBooleanFilters',
  components: {
    PbAccordion,
    PbFilterButtons
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      item: {
        facet: true,
        type: 'boolean'
      }
    };
  }
};
</script>