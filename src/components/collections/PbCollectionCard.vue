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
        {{ truncatedTitle }}
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
  computed: {
    alias() {
      return this.$store.state.SClient.allowedFilters[this.card.facet].alias;
    },
    truncatedTitle() {
      let title = this.card.name;

      return title.length > this.truncateLimit
        ? `${title.substr(0, this.truncateLimit - 1)}...`
        : title;
    }
  },
  methods: {
    filter() {
      let query = {...this.$route.query};

      if (query[this.alias] === this.card.name) {
        return;
      }

      scrollTo('#books');

      this.$router.replace({
        query: {
          ...query,
          [this.alias]: this.card.name
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
