<template>
  <div class="book-box mt-4">
    <div class="flex flex-row flex-wrap items-start border border-gray-300 px-8 py-8 shadow-md">
      <div class="w-full md:w-2/3 md:pr-4">
        <div class="data">
          <recommended v-if="item.isRecommended" />

          <book-info :item="item" />

          <book-details :item="item" />
        </div>
      </div>
      <div class="w-full md:w-1/3 md:pl-8">
        <div class="image">
          <img
            :src="item.image"
            width="100%"
            :alt="item.name"
          >
        </div>
        <ul class="tags pt-3 flex flex-row justify-around">
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/licenses/allrights.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/is-base.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/licenses/by-nc-sa.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/h5p.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BookInfo from './BookInfo.vue';
import BookDetails from './BookDetails.vue';
import Recommended from './Recommended.vue';

export default {
  name: 'BookCard',
  components: {
    BookInfo,
    BookDetails,
    Recommended,
  },
  props: {
    item: Object
  },
  mounted() {
    console.log(this.item);
  }
};
</script>