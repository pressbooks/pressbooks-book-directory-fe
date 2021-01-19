<template>
  <v-card
    class="welcome-header--featuredbook--card"
    :elevation="0"
  >
    <book-cover
      :image="featuredBook.image"
      :min-height="240"
      :max-height="240"
    />
    <v-card-title class="v-card__title--featuredbook">
      <a
        :href="featuredBook.url"
        target="_blank"
      >
        {{ truncateTitle(featuredBook.name) }}
      </a>
    </v-card-title>
  </v-card>
</template>

<script>
import BookCover from '../commons/BookCover';
export default {
  name: 'FeaturedBookCard',
  components: {BookCover},
  props: {
    featuredBook: {
      type: Object,
      default () { return {}; }
    }
  },
  data() {
    return {
      truncateLimit: 35,
      imageSize: {
        height: 240
      }
    };
  },
  methods: {
    truncateTitle(title) {
      return title.length > this.truncateLimit ? title.substr(0, this.truncateLimit - 1) + '...' : title;
    }
  }
};
</script>