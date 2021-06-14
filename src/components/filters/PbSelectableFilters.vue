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
          type="search"
          class="w-full border-0 text-sm py-2 px-3 focus:outline-none focus:ring-0"
          :placeholder="`Search ${title}`"
        >
      </div>
      <ul>
        <li
          v-for="(item, key) in displayItems"
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
        </li>
      </ul>
      <div
        v-if="showMoreVisible || showLessVisible"
        class="flex items-center justify-center py-2 px-4"
      >
        <button
          v-if="showMoreVisible"
          class="p-1 text-pb-dark-blue text-xs"
          :data-cy="`show-more-${field}`"
          @click="incrementDisplayAmount"
        >
          <span class="sr-only">{{ `Show more from ${title}. ${amountLeft} items left` }}</span>
          <span aria-hidden="true">Show more ({{ amountLeft }})</span>
        </button>
        <button
          v-if="showLessVisible"
          class="p-1 text-pb-dark-blue text-xs"
          :data-cy="`show-less-${field}`"
          @click="resetDisplayAmount"
        >
          <span class="sr-only">{{ `Show less from ${title}` }}</span>
          <span aria-hidden="true">Show less</span>
        </button>
      </div>
      <div class="flex items-center justify-center py-2 px-4">
        <button
          class="p-1 font-bold text-pb-red text-right text-xs uppercase"
          type="reset"
          :data-cy="`clear-filter-${field}`"
          @click.prevent="reset"
        >
          <span class="sr-only">{{ `Clear ${title} filter` }}</span>
          <span aria-hidden="true">Clear filter</span>
        </button>
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
      displayAmount: 10,
      minDisplayAmount: 10,
      maxDisplayAmount: 1000,
    };
  },
  computed: {
    alias() {
      return this.$store.state.SClient.allowedFilters[this.field].alias;
    },
    items() {
      const items = this.$store.state.stats.filters[this.field] || [];

      if (this.searchIsEmpty()) {
        return items.slice(0, this.maxDisplayAmount);
      }

      const term = this.search.toLowerCase();
      const search = (item) => item.facet.toLowerCase().search(term) !== -1;

      return items.filter(search).slice(0, this.maxDisplayAmount);
    },
    displayItems() {
      return this.items.slice(0, this.displayAmount);
    },
    showMoreVisible() {
      return this.displayAmount < this.items.length;
    },
    showLessVisible() {
      if (this.displayItems.length < this.minDisplayAmount) {
        return false;
      }

      return this.displayAmount > this.items.length || this.displayAmount >= this.maxDisplayAmount;
    },
    amountLeft() {
      return this.items.length - this.displayItems.length;
    }
  },
  methods: {
    incrementDisplayAmount() {
      if (this.displayAmount >= this.items.length) {
        return;
      }

      this.displayAmount += 10;
    },
    resetDisplayAmount() {
      this.displayAmount = this.minDisplayAmount;
    },
    reset() {
      const {[this.alias]: toBeRemoved, ...query} = this.$route.query;

      if (!toBeRemoved) {
        return;
      }

      this.search = '';

      this.$router.replace({ query });
    },
    searchIsEmpty() {
      return this.search === '';
    },
  }
};
</script>
