<template>
  <v-form @submit.prevent="search(refine, stringSearch)">
    <v-row
      justify="space-between"
    >
      <v-col
        cols="12"
        md="2"
      >
        <h2 class="ais-SearchBox__text">
          Find a book:
        </h2>
      </v-col>
      <v-col
        md="9"
        cols="12"
      >
        <v-text-field
          id="search-book"
          v-model="stringSearch"
          type="search"
          label="Search all book metadata"
        >
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <v-icon slot="append">
            mdi-magnify
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col
        md="1"
        cols="12"
        align="center"
      >
        <v-btn
          id="search-button"
          type="submit"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
    name: 'Searchbox',
    data() {
        return {
            stringSearch: ''
        };
    },
    watch: {
        '$route.query.q' (q) {
            this.stringSearch = q;
        }
    },
    methods: {
        search(refine, stringSearch) {
            if (stringSearch.length > 3 || stringSearch.length === 0) {
                let query = {...this.$route.query};
                let attribute = this.$store.state.SClient.allowedFilters.search.alias;
                query[attribute] = stringSearch;
                this.$router.replace({ query });
            }
        }
    }
};
</script>