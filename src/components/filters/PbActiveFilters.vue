<template>
  <div>
    <div class="font-semibold text-lg mb-3">
      Active Filters
    </div>
    <div class="active-filters flex flex-row flex-wrap">
      <pb-selected-filter name="Education" />
    </div>
  </div>
</template>

<script>
import PbSelectedFilter from './PbSelectedFilter.vue';
export default {
  name: 'PbActiveFilters',
  components: {
    PbSelectedFilter
  },
  data() {
    return {
      assetsPath: '../src/assets'
    };
  }
};
</script>