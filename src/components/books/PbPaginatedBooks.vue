<template>
  <section id="books" class="w-full flex-1" aria-labelledby="results">
    <div class="flex flex-col lg:flex-row lg:justify-between">
      <pb-stats />
      <pb-share-button />
    </div>
    <pb-active-filters />
    <pb-pagination
      aria-label="top pagination"
      data-cy-subfix="top"
    />
    <pb-books />
    <pb-pagination
      aria-label="bottom pagination"
      data-cy-subfix="bottom"
    />
  </section>
</template>

<script>
import PbStats from '../PbStats.vue';
import PbActiveFilters from '../filters/PbActiveFilters.vue';
import PbBooks from './PbBooks.vue';
import PbPagination from '../PbPagination.vue';
import PbShareButton from '../forms/PbShare.vue';
export default {
  name: 'PbPaginatedBooks',
  components: {PbBooks, PbShareButton, PbPagination, PbActiveFilters, PbStats},
};
</script>
