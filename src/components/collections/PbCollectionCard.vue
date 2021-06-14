<template>
  <li class="w-full h-full">
    <a
      href="#"
      class="p-1 cursor-pointer h-full flex flex-col"
      @click.prevent="filter"
    >
      <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded">
        <img
          :src="card.image"
          alt=""
          class="h-full w-full object-cover"
          role="presentation"
        >
      </div>
      <div class="text mt-4 px-2 font-semibold">
        {{ truncateTitle(card.name) }}
      </div>
    </a>
  </li>
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
    filter() {
      scrollTo('#books');
      let query = {...this.$route.query};
      query[this.$store.state.SClient.allowedFilters[card.facet].alias] = this.card.name;
      this.$router.replace({ query });
    }
  }
};
</script>

<style scoped>

</style>
