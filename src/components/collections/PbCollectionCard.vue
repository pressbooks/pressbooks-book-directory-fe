<template>
  <div class="item w-full mb-6 md:mb-0 md:w-1/5 px-3">
    <a
      class="flex flex-col items-center"
      @click="filter(card)"
    >
      <div class="image">
        <img
          :src="card.image"
          width="100%"
          :alt="card.name"
        >
      </div>
      <div class="text py-4 px-2 font-semibold">
        {{ truncateTitle(card.name) }}
      </div>
    </a>
  </div>
</template>

<script>
import {scrollTo} from '../../utils/helpers';

export default {
  name: 'PbCollectionCard',
  props: {
    card: {
      type: Object,
      default() { return {}; }
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
      scrollTo('#books');
      let query = {...this.$route.query};
      query[this.$store.state.SClient.allowedFilters[card.facet].alias] = card.name;
      this.$router.replace({ query });
    }
  }
};
</script>

<style scoped>

</style>