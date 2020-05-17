<template>
  <ais-refinement-list attribute="inLanguage" :searchable="false" operator="or">
    <div slot-scope="{ items }">
      <div class="form-group">
        <h6>Languages</h6>
        <select multiple class="form-control" v-model="languages">
          <option
            v-for="item in items"
            :key="item.value"
            @click="setLanguages()"
            :value="item.value"
          >
            {{ item.value }}
          </option>
        </select>
      </div>
    </div>
  </ais-refinement-list>
</template>

<script>
export default {
  name: "language-subject",
  methods: {
    setLanguages() {
      delete this.$store.state.SClient.filtersApplied.inLanguage;
      this.languages.forEach(l => {
        this.$store.commit("setFiltersApplied", {
          value: l,
          attribute: "inLanguage",
          operator: ":"
        });
      });
    }
  },
  data() {
    return {
      languages: []
    };
  }
};
</script>
