<template>
  <ais-refinement-list attribute="inLanguage" :searchable="false" operator="or">
    <div slot-scope="{ items }">
      <div class="form-group">
        <h6>Languages</h6>
        <a
          class="link-filter"
          v-for="item in items"
          :key="item.value"
          @click="setLanguageFilter(item)"
          :value="item.value"
        >
          {{ item.value }}
        </a>
      </div>
    </div>
  </ais-refinement-list>
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
