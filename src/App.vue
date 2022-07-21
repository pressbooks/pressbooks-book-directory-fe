<template>
  <ais-instant-search
    v-if="!restartIndex"
    class="w-full"
    :index-name="currentIndex"
    :search-client="$store.state.SClient.searchClient"
    :search-function="paginationHook"
    :middlewares="middlewares"
  >
    <ais-configure
      :facet-filters.camel="$store.state.SClient.notFilters"
      :filters.camel="($store.state.SClient.filtersParams.length > 0) ? $store.state.SClient.filtersParams : ''"
      :query="$store.state.SClient.searchParameters.searchQuery"
    />
    <pb-navbar />
    <main>
      <pb-welcome-header />
      <pb-collections />
      <section aria-label="Find a book">
        <div class="content container mx-auto px-8">
          <div class="py-8 border-b border-grey-300">
            <pb-search-and-sort-box />
          </div>
          <div class="flex flex-col mt-8 md:flex-row space-y-10 md:space-y-0 md:space-x-10">
            <pb-filters />
            <pb-paginated-books />
          </div>
        </div>
      </section>
    </main>
    <pb-footer />
    <pb-tour
      v-if="$store.state.config.showTour"
      :overlay="0.5"
      :auto-scroll="true"
      :typing-speed="17"
    />
  </ais-instant-search>
</template>

<script>
import searchInsights from 'search-insights';
import {createInsightsMiddleware} from 'instantsearch.js/es/middlewares';
import PbWelcomeHeader from './components/PbWelcomeHeader.vue';
import PbFooter from './components/PbFooter.vue';
import PbCollections from './components/collections/PbCollections.vue';
import PbNavbar from './components/PbNavbar.vue';
import PbFilters from './components/filters/PbFilters.vue';
import PbSearchAndSortBox from './components/PbSearchAndSortBox.vue';
import PbPaginatedBooks from './components/books/PbPaginatedBooks.vue';
import PbTour from './components/PbTour.vue';
import NProgress from 'nprogress/nprogress';

const insightMiddleware = createInsightsMiddleware({
  insightsClient: searchInsights,
  onEvent(event, insights) {
    const { insightsMethod, payload, widgetType, eventType } = event;

    if (widgetType === 'ais.hits' && eventType === 'view') {
      return;
    }

    insights(insightsMethod, payload);
  }
});

export default {
  components: {
    PbTour,
    PbPaginatedBooks,
    PbSearchAndSortBox,
    PbFilters,
    PbWelcomeHeader,
    PbFooter,
    PbCollections,
    PbNavbar,
  },
  data() {
    return {
      middlewares: [
        this.middleware,
        insightMiddleware
      ],
      resetPage: false,
      routeQuery: undefined,
      restartIndex: false,
      currentIndex: this.$store.state.SClient.indexName
    };
  },
  watch: {
    '$store.state.SClient' : {
      deep: true,
      handler(){
        NProgress.start();
      }
    },
    '$route.query': {
      deep: true,
      handler(query) {
        if (typeof this.routeQuery !== 'undefined') {
          this.resetPage = false;
          const copyOfQuery = {...query};
          if (copyOfQuery[this.$store.state.SClient.searchParameters.aliases.page]) {
            delete copyOfQuery[this.$store.state.SClient.searchParameters.aliases.page];
          }
          if (this.routeQuery[this.$store.state.SClient.searchParameters.aliases.page]) {
            delete this.routeQuery[this.$store.state.SClient.searchParameters.aliases.page];
          }

          for (let attribute in copyOfQuery) {
            if (
              typeof this.routeQuery[attribute] === 'undefined' ||
                this.routeQuery[attribute].toString() !== copyOfQuery[attribute].toString()
            ) {
              this.resetPage = true;
            }
          }
        }
        this.routeQuery = query;
        if (this.currentIndex !== this.$store.state.SClient.indexName) {
          this.currentIndex = this.$store.state.SClient.indexName;
        }
      }
    }
  },
  beforeMount() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
  },
  updated() {
    this.hideLoader();
  },
  methods: {
    paginationHook(helper) {
      helper.setQueryParameter('hitsPerPage', this.$store.state.SClient.searchParameters.hitsPerPage);
      if(this.resetPage && parseInt(this.$store.state.SClient.searchParameters.page) > 1) {
        helper.setPage(0); // reset the pagination when the query changes
        let routeQuery = {...this.$route.query};
        routeQuery[this.$store.state.SClient.searchParameters.aliases.page] = 1;
        this.$router.replace({ query: routeQuery });
      } else {
        helper.setPage(this.$store.state.SClient.searchParameters.page - 1);
      }
      this.resetPage = false;
      helper.search();
    },
    middleware() {
      return {
        onStateChange: ({ uiState }) => {
          this.hideLoader();
        }
      };
    },
    hideLoader() {
      setTimeout(()=>{
        NProgress.done();
      },window.Cypress ? 3000 : 250);
    }
  }
};
</script>
