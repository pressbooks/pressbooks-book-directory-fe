<template>
  <v-app>
    <header-bar />
    <main role="main">
      <v-container id="v-application__main_content">
        <ais-instant-search
          :search-client="$store.state.SClient.searchClient"
          :index-name="$store.state.SClient.indexName"
          :stalled-search-delay="200"
        >
          <ais-configure
            :facet-filters.camel="$store.state.SClient.notFilters"
            :filters.camel="($store.state.SClient.filtersParams.length > 0) ? $store.state.SClient.filtersParams : ''"
            :query="$store.state.SClient.searchParameters.searchQuery"
          />
          <welcome-header />
          <current-filters />
          <v-row>
            <v-col
              id="filters"
              cols="12"
              md="4"
              lg="3"
            >
              <filters />
            </v-col>
            <v-col
              id="book-list"
              cols="12"
              md="8"
              lg="9"
            >
              <div v-if="$store.state.config.canFilter">
                <books />
                <pagination />
              </div>
            </v-col>
          </v-row>
        </ais-instant-search>
        <a
          href="https://www.algolia.com/"
          aria-label="Search by Algolia"
          target="_blank"
          class="filters__stats-algolia-logo"
        />
      </v-container>
    </main>
  </v-app>
</template>

<script>
import 'instantsearch.css/themes/algolia-min.css';
import Filters from './components/filters/Filters';
import Pagination from './components/commons/Pagination';
import HeaderBar from './components/commons/HeaderBar';
import CurrentFilters from './components/filters/CurrentFilters';
import Books from './components/Books';
import WelcomeHeader from './components/WelcomeHeader';

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