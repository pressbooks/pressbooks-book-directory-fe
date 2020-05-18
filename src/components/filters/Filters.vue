<template>
  <div class="search-panel__filters">
    <div v-if="$store.state.config.canFilter">
      <div class="card filter-card">
        <div class="card-body">
          <form>
            <div class="tab-content" id="myTabContent">
              <book-properties></book-properties>
              <language-subject></language-subject>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookProperties from "./BookProperties";
import LanguageSubject from "./LanguageSubject";

export default {
  components: {
    BookProperties,
    LanguageSubject
  },
  methods: {
    applyFilters() {
      this.$store.dispatch("refreshFilters");
    }
  },
  name: "filters"
};
</script>
