<template>
  <pb-accordion v-if="typeof $store.state.stats.filters[field] !== 'undefined'">
    <template #title>
      <span class="title font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <div
        v-if="searchable"
        class="px-4 flex items-center w-full"
      >
        <search-icon class="h-5 w-5 text-gray-400" />
        <input
          :id="`search-filter-${field}`"
          v-model="search"
          type="text"
          class="w-full border-0 text-sm py-2 px-3 focus:outline-none focus:ring-0"
          :placeholder="`Search ${title}`"
          @input="searchForItems"
        >
      </div>
      <div
        v-for="(item, key) in items"
        :key="key"
        data-cy="filter-option"
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
      cache: [],
      search: '',
    };
  },
  computed: {
    items() {
      if (this.field === 'about') {
        console.log(this.storeItems());
      }
      const items = this.storeItems() || [];

      return items.slice(0, this.limit);
    }
  },
  methods: {
    cacheIsEmpty() {
      return this.cache.length === 0;
    },
    searchIsEmpty() {
      return this.search === '';
    },
    storeItems() {
      return this.$store.getters.filters(this.field);
    },
    updateStore(items) {
      this.$store.commit('updateFacetFilter', {
        field: this.field,
        value: items
      });
    },
    searchForItems() {
      if (this.cacheIsEmpty()) {
        this.cache = [...this.storeItems()];
      }

      if (!this.searchIsEmpty() && this.storeItems() !== undefined) {
        const term = this.search.toLowerCase();
        const items = this.cacheIsEmpty() ? this.storeItems() : this.cache;

        const filtered = items.filter(
          item => item.facet.toLowerCase().search(term) >= 0
        );

        return this.updateStore(filtered);
      }

      if (!this.cacheIsEmpty() && this.searchIsEmpty()) {
        this.updateStore(this.cache);
      }
    },
  }
};
</script>
