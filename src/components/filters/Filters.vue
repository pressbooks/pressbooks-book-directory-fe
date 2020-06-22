<template>
  <div class="search-panel__filters" v-if="$store.state.config.canFilter">
    <v-list dense>
      <licenses></licenses>
      <subjects></subjects>
      <based-on></based-on>
      <word-count></word-count>
      <h5-p-activities></h5-p-activities>
      <networks></networks>
      <languages></languages>
      <publishers></publishers>
      <storage-size></storage-size>
    </v-list>
  </div>
</template>

<script>
import Languages from "./Languages";
import Licenses from "./Licenses";
import Subjects from "./Subjects";
import BasedOn from "./BasedOn";
import WordCount from "./WordCount";
import H5PActivities from "./H5PActivities";
import Publishers from "./Publishers";
import StorageSize from "./StorageSize";
import Networks from "./Networks";

export default {
  components: {
    Networks,
    StorageSize,
    Publishers,
    H5PActivities,
    WordCount,
    BasedOn,
    Subjects,
    Licenses,
    Languages
  },
  methods: {
    applyFilters() {
      this.$store.dispatch("refreshFilters");
    }
  },
  name: "filters"
};
</script>
