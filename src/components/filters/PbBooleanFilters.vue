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
        <div class="action flex justify-end space-x-1">
          <button
            class="include"
            data-cy="filter-include-button"
            @click="applyFilter(true, false)"
          >
            <CheckCircleIconSolid
              v-if="wasFiltered('true', false)"
              class="h-6 w-6"
            />
            <CheckCircleIcon
              v-else
              class="h-6 w-6"
            />
          </button>
          <button
            class="exclude"
            data-cy="filter-exclude-button"
            @click="applyFilter(true, true)"
          >
            <XCircleIconSolid
              v-if="wasFiltered('false', true)"
              class="h-6 w-6"
            />
            <XCircleIcon
              v-else
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </template>
  </pb-accordion>
</template>

<script>
import PbAccordion from '../PbAccordion.vue';
import { CheckCircleIcon, XCircleIcon } from '@vue-hero-icons/outline';
import { CheckCircleIcon as CheckCircleIconSolid, XCircleIcon as XCircleIconSolid } from '@vue-hero-icons/solid';

export default {
  name: 'PbBooleanFilters',
  components: {
    PbAccordion,
    CheckCircleIcon,
    CheckCircleIconSolid,
    XCircleIcon,
    XCircleIconSolid
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
      excluded: false
    };
  },
  methods: {
    applyFilter(itemValue, exclude) {
      if (this.wasFiltered((!exclude).toString(), exclude)) {
        return this.removeFilter();
      }
      let query = {...this.$route.query}, value;
      let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
      value = !exclude;
      query[attribute] = value;
      this.$router.replace({ query });
    },
    wasFiltered(value, is_excluded) {
      return typeof(this.$store.state.SClient.filtersExcluded[this.field]) !== 'undefined' &&
          this.$store.state.SClient.filtersExcluded[this.field][0].value === value &&
          this.$store.state.SClient.filtersExcluded[this.field][0].exclude === is_excluded;
    },
    removeFilter() {
      let queryString = {...this.$route.query};
      delete queryString[this.$store.state.SClient.allowedFilters[this.field].alias];
      this.$router.replace({ query: queryString });
    },
  }
};
</script>