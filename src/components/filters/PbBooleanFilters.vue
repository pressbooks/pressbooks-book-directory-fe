<template>
  <pb-accordion
    :open="typeof($store.state.SClient.filtersExcluded[field]) !== 'undefined'"
    :data-cy-button="`${field}`"
  >
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
          {{ `${title} (${count})` }}
        </span>
        <div class="action flex justify-end space-x-1">
          <button
            class="include"
            data-cy="filter-include-button"
            :aria-pressed="wasFiltered('true', false) ? 'true' : 'false'"
            @click="applyFilter(true, false)"
          >
            <span class="sr-only">{{ `Include ${title}` }}</span>
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
            :aria-pressed="wasFiltered('false', true) ? 'true' : 'false'"
            @click="applyFilter(true, true)"
          >
            <span class="sr-only">{{ `Exclude ${title}` }}</span>
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
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import { CheckCircleIcon as CheckCircleIconSolid, XCircleIcon as XCircleIconSolid } from '@heroicons/vue/solid';

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
  computed: {
    count() {
      let filter = this.$store.state.stats.filters[this.field];

      if (!filter || filter.length <= 1) {
        return 0;
      }

      return filter[1].count;
    }
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
