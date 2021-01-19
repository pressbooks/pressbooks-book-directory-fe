<template>
  <v-container
    v-if="$store.state.featuredBooks.books.length > 4"
    class="pa-0 featuredbook"
  >
    <h2>Featured Books</h2>
    <v-row
      v-if="$vuetify.breakpoint.width > 1264"
      no-gutters
      justify="center"
    >
      <v-col
        class="offset-1 ml-auto featuredbook--col"
        :lg="2"
      >
        <featured-book-card :featured-book="$store.state.featuredBooks.books[0]" />
      </v-col>
      <v-col
        v-for="(featuredBook, n) in $store.state.featuredBooks.books.slice(1, 5)"
        :key="n"
        :lg="2"
        class="ml-auto featuredbook--col"
      >
        <featured-book-card :featured-book="featuredBook" />
      </v-col>
    </v-row>
    <v-row
      v-else
      no-gutters
    >
      <v-col
        :lg="7"
        :md="12"
        :sm="12"
      >
        <v-container class="pa-0">
          <v-row
            no-gutters
          >
            <v-col
              v-for="(featuredBook, n) in $store.state.featuredBooks.books.slice(1, 4)"
              :key="n"
              :lg="4"
            >
              <featured-book-card :featured-book="featuredBook" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col
        :lg="5"
        :md="12"
        :sm="12"
      >
        <v-container class="pa-0">
          <v-row
            no-gutters
            justify="center"
          >
            <v-col
              v-for="(featuredBook, n) in $store.state.featuredBooks.books.slice(3, 5)"
              :key="n"
              :lg="6"
              :md="4"
              :sm="4"
            >
              <featured-book-card :featured-book="featuredBook" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FeaturedBookCard from './FeaturedBookCard';

export default {
  name: 'FeaturedBooks',
  components: {FeaturedBookCard},
  data() {
    return {
      truncateLimit: 35,
      imageSize: {
        height: 240
      }
    };
  },
  mounted() {
    let index = this.$store.state.SClient.searchClient.initIndex(this.$store.state.SClient.indexName);
    this.$store.dispatch('getFeaturedBooks', index);
  }
};
</script>