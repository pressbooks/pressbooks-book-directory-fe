<template>
  <div class="w-full h-full">
    <a
      href="#"
      class="p-1 cursor-pointer h-full flex flex-col"
      @click.prevent="filter(card)"
    >
      <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded">
        <img
          :src="card.image"
          :alt="card.name"
          class="h-full w-full object-cover"
        >
      </div>
      <div class="text mt-4 px-2 font-semibold">
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
