<template>
  <div class="search-panel__filters">
    <div v-if="$store.state.config.canFilter">
      <v-card
        class="mx-auto"
        tile
      >
        <v-list dense>
            <v-list-item-group color="primary">
                <book-properties></book-properties>
                <language-subject></language-subject>
            </v-list-item-group>
        </v-list>
      </v-card>
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
