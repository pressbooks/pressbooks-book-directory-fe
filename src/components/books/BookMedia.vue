<template>
  <div class="w-full md:w-1/3 md:pl-8">
    <div
      class="image"
      data-cy="book-cover"
    >
      <pb-book-cover
        :image="item.image"
        :url="item.url"
        :alt="`${item.name} cover`"
        @book-cover-click="$emit('book-title-click')"
      />
    </div>
    <ul
      class="tags pt-3 flex space-x-3"
      data-cy="book-icons"
    >
      <pb-book-icon
        data-cy="book-license"
        :icon="item.licenseIcon"
        :alt="item.licenseAlt"
      />
      <pb-book-icon
        v-if="hasH5PActivities"
        data-cy="book-h5p"
        icon="/assets/images/h5p.png"
        :alt="`This book has ${item.h5pActivities} H5P Activities`"
      />
      <pb-book-icon
        v-if="isBasedOn"
        data-cy="book-not-original"
        icon="/assets/images/is-child.png"
        alt="Book based on another book"
      />
      <pb-book-icon
        v-if="!isBasedOn"
        data-cy="book-original"
        icon="/assets/images/is-base.png"
        alt="This book is not based on another book"
      />
    </ul>
  </div>
</template>

<script>
import PbBookCover from '../PbBookCover.vue';
import PbBookIcon from './PbBookIcon.vue';
export default {
  name: 'BookMedia',
  components: {
    PbBookCover,
    PbBookIcon
  },
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  emits: ['book-title-click'],
  computed: {
    hasH5PActivities() {
      return this.item.hasH5pActivities && this.item.h5pActivities > 0;
    },
    isBasedOn() {
      return this.item.hasIsBasedOn;
    },
  }
};
</script>
