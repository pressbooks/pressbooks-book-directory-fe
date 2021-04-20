<template>
  <div class="w-full md:w-1/4 md:pr-10 mb-12">
    <div class="font-semibold text-xl mb-8 md:mb-4">
      Filters:
    </div>
    <div class="filters border border-gray-300">
      <div class="filter-group border-b border-gray-300">
        <div class="heading px-5 py-3 bg-gray-200">
          <div class="flex flex-row items-center justify-between">
            <div class="title font-pbRegular font-bold">
              {{ title }}
            </div>
            <div
              class="action"
              @click="expandFilter"
              :aria-expanded="isExpanded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div class="body" v-if="isExpanded">
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-black-600 w-full">
                Education (20)
              </div>
              <pb-filter-buttons />
            </a>
          </div>
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-black-600 w-full">
                Open learning, distance education (144)
              </div>
              <pb-filter-buttons />
            </a>
          </div>
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-black-600 w-full">
                Chemistry (22)
              </div>
              <div class="action w-6 flex flex-row justify-end" />
            </a>
          </div>
          <div class="flex flex-row items-center justify-between px-5 py-3 border-t border-gray-200">
            <div class="action w-full text-sm text-red-800">
              <a
                href="#!"
                class=" uppercase py-2 block text-center"
              >
                view more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PbFilterButtons from './PbFilterButtons.vue';
export default {
  name: 'PbSelectableFilters',
  components: {PbFilterButtons},
  props: {
    title: {
      type: String,
      default: ''
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    expandFilter() {
      this.isExpanded = !this.isExpanded;
    }
  },
  data() {
    return {
      assetsPath: '../src/assets',
      isExpanded: false
    };
  }
};
</script>