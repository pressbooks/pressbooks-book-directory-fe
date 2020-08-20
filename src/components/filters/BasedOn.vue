<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-list-group
    id="filter-basedOn"
    sub-group
    value="true"
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
            :disabled="wasFiltered('true', false)"
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
            :disabled="wasFiltered('false', true)"
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
      field: 'has_isBasedOn'
    };
  },
  methods: {
    applyFilter(itemValue, exclude) {
      let query = {...this.$route.query}, value;
      let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
      value = !exclude;
      query[attribute] = value;
      this.$router.replace({ query });
    },
    wasFiltered(value, exc) {
      return typeof(this.$store.state.SClient.filtersExcluded['has_isBasedOn']) !== 'undefined' &&
                    this.$store.state.SClient.filtersExcluded['has_isBasedOn'][0].value === value &&
                    this.$store.state.SClient.filtersExcluded['has_isBasedOn'][0].exclude === exc;
    }
  }
};
</script>