<template>
  <div data-cy="book-card">
    <div class="flex flex-row flex-wrap items-start border border-gray-300 px-8 py-8 shadow-md">
      <div class="w-full md:w-2/3 md:pr-4">
        <div class="data">
          <recommended v-if="item.isRecommended" />
          <book-info :item="item" />
          <book-details :item="item" />
        </div>
      </div>
      <book-media :item="item" />
    </div>
  </div>
</template>
<script>
import BookInfo from './BookInfo.vue';
import BookDetails from './BookDetails.vue';
import BookMedia from './BookMedia.vue';
import Recommended from './Recommended.vue';

export default {
  name: 'BookCard',
  components: {
    BookInfo,
    BookDetails,
    BookMedia,
    Recommended,
  },
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  }
};
</script>
