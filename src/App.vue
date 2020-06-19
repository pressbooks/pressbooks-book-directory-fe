<template>
  <v-app class="mx-auto">
    <header-bar></header-bar>
    <v-container class="v-application__main_content" fluid>
      <ais-instant-search
        :search-client="$store.state.SClient.searchClient"
        :index-name="$store.state.SClient.indexName"
      >
        <ais-configure :hits-per-page.camel="$store.state.SClient.searchParameters.hitsPerPage"></ais-configure>
        <welcome-header></welcome-header>
        <current-filters></current-filters>
        <v-row no-gutters>
          <v-col cols="6" md="3">
            <filters></filters>
          </v-col>
          <v-col cols="12" md="9">
            <div v-if="$store.state.config.canFilter">
              <books></books>
              <pagination></pagination>
            </div>
          </v-col>
        </v-row>
      </ais-instant-search>
    </v-container>
  </v-app>
</template>

<script>
  import "instantsearch.css/themes/algolia-min.css";
  import Filters from "./components/filters/Filters";
  import Pagination from "./components/commons/Pagination";
  import HeaderBar from "./components/commons/HeaderBar";
  import CurrentFilters from "./components/filters/CurrentFilters";
  import Books from "./components/Books";
  import WelcomeHeader from "./components/WelcomeHeader";

  export default {
    components: {
      WelcomeHeader,
      CurrentFilters,
      Filters,
      Pagination,
      HeaderBar,
      Books
    },
    mounted() {
      let index = this.$store.state.SClient.searchClient.initIndex(this.$store.state.SClient.indexName);
      this.$store.dispatch('getStats', index);
    }
  };
</script>
<style lang="sass">
  @import 'styles/styles'
</style>