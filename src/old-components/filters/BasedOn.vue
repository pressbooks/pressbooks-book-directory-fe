<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-list-group
    id="filter-basedOn"
    sub-group
    :value="false"
  >
    <template #activator>
      <v-list-item-title>BASED ON</v-list-item-title>
    </template>
    <v-list-item>
      <v-list-item-content
        :class="(wasFiltered('false', false) || wasFiltered('true', false)) ? 'v-list-item__content--filtered' : ''"
      >
        Based on another book
      </v-list-item-content>
      <v-list-item-action id="isBasedOn-another">
        <div>
          <v-btn
            :id="'btn-include-based-another'"
            icon
            :class="wasFiltered('true', false) ? 'selected include': 'include'"
            @click="applyFilter(true, false)"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn
            :id="'btn-exclude-based-another'"
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
  name: 'BasedOn',
  data() {
    return {
      excluded: false,
      field: 'hasIsBasedOn'
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
    removeFilter() {
      let queryString = {...this.$route.query};
      delete queryString[this.$store.state.SClient.allowedFilters[this.field].alias];
      this.$router.replace({ query: queryString });
    },
    wasFiltered(value, exc) {
      return typeof(this.$store.state.SClient.filtersExcluded['hasIsBasedOn']) !== 'undefined' &&
                    this.$store.state.SClient.filtersExcluded['hasIsBasedOn'][0].value === value &&
                    this.$store.state.SClient.filtersExcluded['hasIsBasedOn'][0].exclude === exc;
    }
  }
};
</script>