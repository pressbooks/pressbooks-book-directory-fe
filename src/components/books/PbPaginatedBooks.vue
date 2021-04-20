<template>
  <div class="md:flex-col w-full md:w-3/4">
    <pb-stats />
    <pb-active-filters />
    <books />
    <pb-pagination />
  </div>
</template>

<script>
import PbStats from '../PbStats.vue';
import PbActiveFilters from '../filters/PbActiveFilters.vue';
import Books from './Books.vue';
import PbPagination from '../PbPagination.vue';
export default {
  name: 'PbPaginatedBooks',
  components: {PbPagination, Books, PbActiveFilters, PbStats}
};
</script>