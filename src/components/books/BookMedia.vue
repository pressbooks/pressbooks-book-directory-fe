<template>
  <div class="w-full md:w-1/3 md:pl-8">
    <div class="image">
      <pb-book-cover
        :image="item.image"
        :alt="item.name"
      />
    </div>
    <ul class="tags pt-3 flex flex-row justify-around">
      <pb-book-icon
        :icon="item.licenseIcon"
        :alt="item.licenseAlt"
      />
      <pb-book-icon
        v-if="isBasedOn"
        icon="https://pressbooks.directory/assets/images/is-child.png"
        alt="Book based on another book"
      />
      <pb-book-icon
        v-if="!isBasedOn"
        icon="https://pressbooks.directory/assets/images/is-base.png"
        alt="This book is not based on another book"
      />
      <pb-book-icon
        v-if="hasH5PActivities"
        icon="https://pressbooks.directory/assets/images/h5p.png"
        :alt="`This book has ${item.h5pActivities} H5P Activities`"
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
    item: Object
  },
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