<template>
  <article
    data-cy="book-card"
    class="flex flex-row flex-wrap items-start border border-gray-300 px-8 py-8 shadow-md"
  >
    <div class="w-full md:w-2/3 md:pr-4">
      <recommended
        v-if="item.isRecommended"
        :enabled="isRecommendedFilterEnabled"
      />
      <collection-tag
        v-for="(tag,index) in item.collections"
        :key="index"
        :collection="tag"
      />
      <book-info :item="item" />
      <book-details :item="item" />
    </div>
    <book-media :item="item" />
  </article>
</template>
<script>
import BookInfo from './BookInfo.vue';
import BookDetails from './BookDetails.vue';
import BookMedia from './BookMedia.vue';
import Recommended from './Recommended.vue';
import CollectionTag from './CollectionTag.vue';

export default {
  name: 'BookCard',
  components: {
    CollectionTag,
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
  },
  computed: {
    isRecommendedFilterEnabled() {
      return !!this.$store.state.SClient.filtersExcluded.isRecommended;
    }
  }
};
</script>
