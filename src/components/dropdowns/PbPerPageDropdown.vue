<template>
  <ais-hits-per-page
    :items="itemsOptions"
    class="w-full md:w-1/2"
  >
    <template #default="{ items }">
      <pb-dropdown
        placeholder="Books per page"
        :options="items"
        data-cy="books-per-page"
        @input="(data)=>{
          onInput(data)
        }"
      />
    </template>
  </ais-hits-per-page>
</template>
<script>
import PbDropdown from './PbDropdown.vue';

export default {
  name: 'PbPerPageDropdown',
  components: { PbDropdown },
  props: {
    options: {
      type: Array,
      default() { return []; }
    }
  },
  data() {
    return {
      itemsOptions: this.options,
      alias: this.$store.state.SClient.searchParameters.aliases.hitsPerPage
    };
  },
  watch: {
    options(opts) {
      this.itemsOptions = opts;
    }
  },
  methods: {
    onInput(data) {
      let routeQuery = {...this.$route.query};
      if (
        !routeQuery[this.alias] ||
        (
          routeQuery[this.alias] &&
          data != routeQuery[this.alias]
        )
      ) {
        routeQuery[this.alias] = data;
        this.$router.replace({query: routeQuery});
      }
    }
  }
};
</script>
