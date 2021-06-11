<template>
  <div
    id="books"
    class="w-full flex-1"
  >
    <div class="flex flex-col lg:flex-row lg:justify-between">
      <pb-stats />
      <pb-share-button />
    </div>
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
import PbShareButton from '../forms/PbShare.vue';
export default {
  name: 'PbPaginatedBooks',
  components: {PbShareButton, PbPagination, Books, PbActiveFilters, PbStats},
};
</script>
