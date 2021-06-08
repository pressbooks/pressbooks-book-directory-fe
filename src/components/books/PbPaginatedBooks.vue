<template>
  <div
    id="books"
    class="w-full flex-1"
  >
    <pb-stats />
    <pb-active-filters />
    <pb-pagination data-cy-subfix="top" />
    <books />
    <pb-pagination data-cy-subfix="bottom" />
  </div>
</template>

<script>
import PbStats from '../PbStats.vue';
import PbActiveFilters from '../filters/PbActiveFilters.vue';
import Books from './Books.vue';
import PbPagination from '../PbPagination.vue';
export default {
  name: 'PbPaginatedBooks',
  components: {PbPagination, Books, PbActiveFilters, PbStats},
};
</script>
