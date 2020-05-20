<template>
  <div>
    <v-subheader>LANGUAGES</v-subheader>
    <ais-refinement-list
      attribute="inLanguage"
      :searchable="false"
      operator="or"
    >
      <div slot-scope="{ items }">
        <v-list-item
          v-for="item in items"
          :key="item.value"
          @click="setLanguageFilter(item)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.value"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </ais-refinement-list>
  </div>
</template>

<script>
export default {
  name: "language-subject",
  methods: {
    setLanguageFilter(item) {
      delete this.$store.state.SClient.filtersApplied.inLanguage;
      this.$store.commit("setFiltersApplied", {
        value: item.value,
        attribute: "inLanguage",
        operator: ":"
      });
      this.$store.dispatch("refreshFilters");
    }
  },
  data() {
    return {
      languages: []
    };
  }
};
</script>
