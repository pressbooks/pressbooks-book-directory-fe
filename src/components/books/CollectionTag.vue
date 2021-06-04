<template>
  <button
    type="button"
    data-cy="book-collection-tag"
    class="inline-block leading-none border border-pb-red py-2 px-3 uppercase text-sm tracking-widest font-bold rounded mb-5 mr-2"
    :class="enabled ? 'bg-red-700 text-white': 'text-pb-red border-pb-red'"
    @click.prevent="toggle(collection)"
  >
    {{ collection }}
  </button>
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
    toggle(selectedFacet) {
      scrollTo('#books');
      let query = {...this.$route.query};
      let currentCollections = query.collec? query.collec.split('&&') : [];
      if (currentCollections.includes(selectedFacet)) {
        currentCollections = currentCollections.filter(added => {
          return selectedFacet !== added;
        });
      } else {
        currentCollections.push(selectedFacet);
      }
      query.collec = currentCollections.join('&&');
      if (currentCollections.length === 0) {
        delete query['collec'];
      }
      this.$router.replace({ query });
    }
  }
};
</script>
