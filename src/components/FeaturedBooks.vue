<template>
  <v-container
    v-if="$store.state.featuredBooks.books.length > 0"
    class="pa-0 featuredbook"
  >
    <h2>Featured Books</h2>
    <v-row no-gutters>
      <v-col
        :lg="7"
        :md="12"
        :sm="12"
      >
        <v-container class="pa-0">
          <v-row
            no-gutters
            justify="center"
          >
            <v-col
              v-for="(featuredBook, n) in $store.state.featuredBooks.books.slice(0, 3)"
              :key="n"
              :lg="4"
            >
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
              <v-card
                class="welcome-header--featuredbook--card"
                :elevation="0"
              >
                <book-cover
                  :image="featuredBook.image"
                  :min-height="imageSize.height"
                  :max-height="imageSize.height"
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
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BookCover from './commons/BookCover';

export default {
  name: 'FeaturedBooks',
  components: {BookCover},
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
  },
  methods: {
    truncateTitle(title) {
      return title.length > this.truncateLimit ? title.substr(0, this.truncateLimit - 1) + '...' : title;
    }
  }
};
</script>