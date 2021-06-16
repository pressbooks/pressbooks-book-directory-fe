<template>
  <li class="mb-2 mr-2">
    <button
      type="button"
      data-cy="book-recommended"
      class="inline-block leading-none border border-red-900 py-2 px-3 text-sm font-bold rounded"
      :class="enabled ? 'bg-red-700 text-white': 'text-pb-red border-pb-red'"
      :aria-pressed="enabled ? 'true' : 'false'"
      @click.prevent="toggle('recommended')"
    >
      Recommended
    </button>
  </li>
</template>

<script>
import {scrollTo} from '../../utils/helpers';

export default {
  name: 'Recommended',
  props: {
    enabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
  methods: {
    toggle(facet) {
      scrollTo('#books');
      let query = {...this.$route.query};
      if (query[facet]) {
        delete query[facet];
      } else {
        query[facet] = 'true';
      }
      this.$router.replace({ query });
    }
  }
};
</script>
