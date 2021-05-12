<template>
  <pb-accordion
    v-if="typeof $store.state.stats.filters[field] !== 'undefined'"
    :open="typeof $store.state.SClient.filtersExcluded[field] !== 'undefined'"
    :data-cy-button="`${field}`"
  >
    <template #title>
      <span class="title font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <div
        v-if="searchable"
        class="px-4 flex items-center w-full"
        data-cy="filter-search"
      >
        <search-icon class="h-5 w-5 text-gray-400" />
        <input
          :id="`search-filter-${field}`"
          v-model="search"
          :data-cy="`search-filter-${field}`"
          type="text"
          class="w-full border-0 text-sm py-2 px-3 focus:outline-none focus:ring-0"
          :placeholder="`Search ${title}`"
        >
      </div>
      <div
        v-for="(item, key) in items"
        :key="key"
        :data-cy="`filter-${field}-option`"
        class="body py-2 px-4 flex items-center justify-between space-x-1"
      >
        <span class="title text-sm text-gray-900 w-full">
          {{ `${item.facet} (${item.count})` }}
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
import {SearchIcon} from '@vue-hero-icons/outline';
import PbAccordion from '../PbAccordion.vue';
import PbFilterButtons from './PbFilterButtons.vue';

export default {
  name: 'PbSelectableFilters',
  components: {
    PbAccordion,
    PbFilterButtons,
    SearchIcon,
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 10,
    },
    searchable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    items() {
      const items = this.$store.state.stats.filters[this.field] || [];

      if (this.searchIsEmpty()) {
        return items.slice(0, this.limit);
      }

      const term = this.search.toLowerCase();
      const search = (item) => item.facet.toLowerCase().search(term) !== -1;

      return items.filter(search).slice(0, this.limit);
    }
  },
  methods: {
    searchIsEmpty() {
      return this.search === '';
    },
  }
};
</script>
