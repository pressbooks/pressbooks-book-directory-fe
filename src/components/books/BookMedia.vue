<template>
  <div class="w-full md:w-1/3">
    <div
      class="image max-w-[350px]"
      data-cy="book-cover"
    >
      <pb-book-cover
        :image="item.image"
        :url="item.url"
        :alt="`${item.name} cover`"
        @book-cover-click="$emit('book-title-click')"
      />
    </div>
  </div>
</template>

<script>
import PbBookCover from '../PbBookCover.vue';
export default {
  name: 'BookMedia',
  components: {
    PbBookCover
  },
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  emits: ['book-title-click']
};
</script>
