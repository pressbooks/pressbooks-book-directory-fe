<template>
  <v-card
    class="welcome-header--specialheader--card"
    :elevation="0"
  >
    <book-cover
      :image="card.image"
      :min-height="240"
      :max-height="240"
    />
    <v-card-title class="v-card__title--specialheader">
      <a
        v-if="card.url"
        :href="card.url"
        :title="card.name"
        target="_blank"
      >
        {{ truncateTitle(card.name) }}
      </a>
      <a
        v-if="!card.url"
        :title="card.name"
        target="_self"
        @click="filter(card)"
      >
        {{ truncateTitle(card.name) }}
      </a>
    </v-card-title>
  </v-card>
</template>

<script>
import BookCover from '../../commons/BookCover';
export default {
  name: 'SpecialsBookCard',
  components: {BookCover},
  props: {
    card: {
      type: Object,
      default () { return {}; }
    }
  },
  data() {
    return {
      truncateLimit: 50,
      imageSize: {
        height: 240
      }
    };
  },
  methods: {
    truncateTitle(title) {
      return title.length > this.truncateLimit ? title.substr(0, this.truncateLimit - 1) + '...' : title;
    },
    filter(card) {
      this.$vuetify.goTo('#current-filters');
      let query = {...this.$route.query};
      query[this.$store.state.SClient.allowedFilters[card.facet].alias] = card.name;
      this.$router.replace({ query });
    }
  }
};
</script>