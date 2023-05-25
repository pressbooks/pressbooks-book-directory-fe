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

      scrollTo('#books');

      const keysAmount = ('per_page' in query) ? 2 : 1;

      if (query[this.alias] === this.card.name && Object.entries(query).length ===keysAmount) {
        return;
      }
      
      const {per_page} = query;

      this.sendClickInsight();

      this.$router.replace({
        query: {
          [this.alias]: this.card.name,
          per_page,
        }
      });
    },
    sendClickInsight() {
      this.sendFilterAppliedInsight(
        [`${this.alias}:${this.card.name}`],
        'Collection visited'
      );
    },
  }
};
</script>
