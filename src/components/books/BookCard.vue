<template>
  <article
    data-cy="book-card"
    class="flex flex-col md:flex-row gap-8 items-start border border-gray-300 px-8 py-8 shadow-md"
  >
    <book-media
      :item="item"
      @book-title-click="$emit('book-clicked')"
    />
    <div class="w-full md:w-2/3">
      <ul
        v-if="item.collections.length > 0"
        role="list"
        aria-label="Book tags"
        class="flex"
        data-cy="book-tags"
      >
        <collection-tag
          v-for="(tag,index) in item.collections"
          :key="index"
          :collection="tag"
        />
      </ul>
      <book-info
        :item="item"
        @book-title-click="$emit('book-clicked')"
      />
      <book-details :item="item" />
    </div>
  </article>
</template>
<script>
import BookInfo from './BookInfo.vue';
import BookDetails from './BookDetails.vue';
import BookMedia from './BookMedia.vue';
import CollectionTag from './CollectionTag.vue';

export default {
  name: 'BookCard',
  components: {
    CollectionTag,
    BookInfo,
    BookDetails,
    BookMedia,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  emits: ['book-clicked'],
};
</script>
