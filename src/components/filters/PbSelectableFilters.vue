<template>
  <vsa-item class="filters border" v-if="typeof $store.state.stats.filters[field] !== 'undefined'">
    <vsa-heading class="title font-pbRegular font-bold text-base">
      {{ title }}
    </vsa-heading>
    <vsa-icon>
      <ChevronUpIcon
        class="open h-6 w-6 text-red-800"
      ></ChevronUpIcon>
      <ChevronDownIcon class="close h-6 w-6 text-red-800"></ChevronDownIcon>
    </vsa-icon>
    <vsa-content>
      <div
        v-for="(item, k) in $store.state.stats.filters[field]"
        :key="k"
        class="body"
      >
        <div class="border-t border-gray-200">
          <a
            href="#!"
            class="flex flex-row items-center justify-between px-5 py-3"
          >
            <div class="title text-sm text-black-600 w-full">
              {{ showItem(item) }}
            </div>
            <pb-filter-buttons
              :item="item"
              :field="field"
            />
          </a>
        </div>
      </div>
    </vsa-content>
  </vsa-item>
</template>

<script>
import PbFilterButtons from './PbFilterButtons.vue';
import { ChevronUpIcon, ChevronDownIcon } from '@vue-hero-icons/outline';
export default {
  name: 'PbSelectableFilters',
  components: { PbFilterButtons, ChevronUpIcon, ChevronDownIcon },
  props: {
    title: {
      type: String,
      default: ''
    },
    searchable: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: ''
    }
  },
  methods: {
    expandFilter() {
      this.isExpanded = !this.isExpanded;
    },
    showItem(item) {
      return item.facet + ' (' + item.count + ')';
    }
  }
};
</script>