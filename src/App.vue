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
          <v-btn
            class="float-right"
            aria-label="Visit Pressbooks' Twitter account"
            @click="$store.commit('showTour')"
          >
            Take the tour
          </v-btn>
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
              </div>
            </v-col>
          </v-row>
          <pagination />
        </ais-instant-search>
        <a
          href="https://www.algolia.com/"
          aria-label="Search by Algolia"
          target="_blank"
          class="filters__stats-algolia-logo"
        />
      </v-container>
      <press-tour
        v-if="$store.state.config.showTour"
        :auto-scroll="true"
      />
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
import PressTour from './components/tour/PressTour';

export default {
  components: {
    WelcomeHeader,
    CurrentFilters,
    Filters,
    Pagination,
    HeaderBar,
    Books,
    PressTour
  },
  data(){
    return {
      metaTags: [
        {
          'http-equiv': 'Content-Type',
          content: 'text/html; charset=utf-8'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        {
          name: 'description',
          content: 'A searchable library of free textbooks and other open educational resources (OER) published using the Pressbooks Authoring & Editing Platform'
        },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1'
        }
      ]
    };
  },
  mounted() {
    let index = this.$store.state.SClient.searchClient.initIndex(this.$store.state.SClient.indexName);
    this.$store.dispatch('getStats', index);
    if (
      typeof process.env.VUE_APP_ENVIRONMENT === 'undefined' ||
      process.env.VUE_APP_ENVIRONMENT.toLowerCase() !== 'production'
    ) {
      this.metaTags.push({
        name: 'robots',
        content: 'noindex'
      });
    }

  },
  metaInfo() {
    return {
      meta: this.metaTags
    };
  }
};
</script>
<style lang="sass">
  @import 'styles/styles'
</style>