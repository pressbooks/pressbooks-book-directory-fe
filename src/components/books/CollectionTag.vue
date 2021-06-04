<template>
  <button
    type="button"
    data-cy="book-collection-tag"
    class="inline-block leading-none border border-pb-red text-pb-red py-2 px-3 uppercase text-sm tracking-widest font-bold rounded mb-5 mr-2"
    @click.prevent="filter(collection)"
  >
    {{ collection }}
  </button>
</template>

<script>
import {scrollTo} from "../../utils/helpers";

export default {
  name: 'CollectionTag',
  props: {
    collection: {
      type: String,
      default() { return ''; }
    }
  },
  methods: {
    filter(name) {
      scrollTo('#books');
      console.log(this.$store.state.SClient.allowedFilters);
      let query = {...this.$route.query};
      query[this.$store.state.SClient.allowedFilters.collections.alias] = name;
      this.$router.replace({ query });
    }
  }
};
</script>
