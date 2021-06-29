<template>
  <li class="mb-2 mr-2">
    <button
      type="button"
      data-cy="book-collection-tag"
      class="inline-block leading-none border border-pb-red py-2 px-3 text-sm font-bold rounded"
      :class="enabled ? 'bg-red-700 text-white': 'text-pb-red border-pb-red'"
      :aria-pressed="enabled ? 'true' : 'false'"
      @click.prevent="toggle"
    >
      {{ collection }}
    </button>
  </li>
</template>

<script>
import {scrollTo} from '../../utils/helpers';

export default {
  name: 'CollectionTag',
  props: {
    collection: {
      type: String,
      default() { return ''; }
    }
  },
  computed: {
    enabled() {
      if(this.$store.state.SClient.filtersExcluded.collections)
        return Object.values(this.$store.state.SClient.filtersExcluded.collections).map(item=>{
          return item.value;
        }).includes(this.collection);
      return false;
    }
  },
  methods: {
    toggle() {
      scrollTo('#books');
      let query = {...this.$route.query};
      let currentCollections = query.collec? query.collec.split('&&') : [];
      if (currentCollections.includes(this.collection)) {
        currentCollections = currentCollections.filter(added => {
          return this.collection !== added;
        });
      } else {
        this.sendClickInsight();
        currentCollections.push(this.collection);
      }
      query.collec = currentCollections.join('&&');
      if (currentCollections.length === 0) {
        delete query['collec'];
      }
      this.$router.replace({ query });
    },
    sendClickInsight() {
      this.sendFilterAppliedInsight(
        [`collec:${this.collection}`],
        'Card Collection Activated'
      );
    },
  }
};
</script>
