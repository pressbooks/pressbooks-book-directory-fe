<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-list-group
    id="filter-recommended"
    sub-group
    :value="false"
  >
    <template #activator>
      <v-list-item-title>RECOMMENDED</v-list-item-title>
    </template>
    <v-list-item>
      <v-list-item-content
        :class="(wasFiltered('false', false) || wasFiltered('true', false)) ? 'v-list-item__content--filtered' : ''"
      >
        Recommended books
      </v-list-item-content>
      <v-list-item-action id="recommended-filter-item">
        <div>
          <v-btn
            id="btn-included-recommended"
            icon
            :class="wasFiltered('true', false) ? 'selected include': 'include'"
            @click="applyFilter(true, false)"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn
            id="btn-excluded-recommended"
            icon
            :class="wasFiltered('false', true) ? 'selected exclude': 'exclude'"
            @click="applyFilter(true, true)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'Recommended',
  data() {
    return {
      excluded: false,
      field: 'isRecommended'
    };
  },
  methods: {
    applyFilter(itemValue, exclude) {
      if (this.wasFiltered((!exclude).toString(), exclude)) {
        return this.removeFilter();
      }
      let query = {...this.$route.query}, value;
      let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
      value = !exclude;
      query[attribute] = value;
      this.$router.replace({ query });
    },
    wasFiltered(value, is_excluded) {
      return typeof(this.$store.state.SClient.filtersExcluded[this.field]) !== 'undefined' &&
          this.$store.state.SClient.filtersExcluded[this.field][0].value === value &&
          this.$store.state.SClient.filtersExcluded[this.field][0].exclude === is_excluded;
    },
    removeFilter() {
      let queryString = {...this.$route.query};
      delete queryString[this.$store.state.SClient.allowedFilters[this.field].alias];
      this.$router.replace({ query: queryString });
    },
  }
};
</script>