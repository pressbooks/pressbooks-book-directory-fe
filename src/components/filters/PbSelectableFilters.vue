<template>
  <vsa-item
    v-if="typeof $store.state.stats.filters[field] !== 'undefined'"
    class="filters border"
  >
    <vsa-heading class="title font-pbRegular font-bold text-base py-3">
      {{ title }}
    </vsa-heading>
    <vsa-icon>
      <ChevronUpIcon
        class="open h-6 w-6 text-red-800"
      />
    </vsa-icon>
    <vsa-content>
      <div
        v-for="(item, k) in $store.state.stats.filters[field]"
        :key="k"
        class="body"
      >
        <div class="border-t border-gray-200">
          <a
            class="flex flex-row items-center justify-between p-3 "
          >
            <div
              class="'title text-sm text-black-600 w-full'"
            >
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
import { ChevronUpIcon } from '@vue-hero-icons/outline';
export default {
  name: 'PbSelectableFilters',
  components: { PbFilterButtons, ChevronUpIcon },
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
  computed: {

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