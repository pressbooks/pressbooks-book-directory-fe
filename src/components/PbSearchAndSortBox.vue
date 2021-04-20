<template>
  <form>
    <div class="section-title text-4xl font-headings font-bold text-center mb-10">
      Find a book
    </div>
    <div class="flex flex-row flex-wrap items-end">
      <pb-search-box />
      <div class="topFilters right w-full md:w-2/5 flex flex-row flex-wrap space-y-4 md:space-y-0 md:pl-10 md:mb-4">
        <pb-dropdown
          class="w-full md:w-1/2 md:mb-4"
          :options="perPageOptions"
          placeholder="Books per page"
        />
        <pb-dropdown
          class="w-full md:w-1/2 md:mb-4"
          :options="sortByOptions"
          placeholder="Sort cards by"
        />
      </div>
    </div>
  </form>
</template>

<script>
import PbDropdown from './PbDropdown.vue';
import PbSearchBox from './forms/PbSearchBox.vue';
export default {
  name: 'PbSearchAndSortBox',
  components: {PbSearchBox, PbDropdown},
  data() {
    return {
      assetsPath: '../src/assets',
      perPageOptions: [
        {label: '10 books', code: 10},
        {label: '20 books', code: 20},
        {label: '50 books', code: 50},
      ],
      sortByOptions: [
        {label: 'Recently updated', code: 1},
        {label: 'Word count', code: 2},
        {label: 'Title (A-Z)', code: 3},
      ]
    };
  }
};
</script>