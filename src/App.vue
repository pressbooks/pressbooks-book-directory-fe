<template>
  <ais-instant-search
    :index-name="$store.state.SClient.indexName"
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
    <pb-welcome-header />
    <pb-collections />
    <section>
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
import PbWelcomeHeader from './components/PbWelcomeHeader.vue';
import PbFooter from './components/PbFooter.vue';
import PbCollections from './components/collections/PbCollections.vue';
import PbNavbar from './components/PbNavbar.vue';
import PbFilters from './components/filters/PbFilters.vue';
import PbSearchAndSortBox from './components/PbSearchAndSortBox.vue';
import PbPaginatedBooks from './components/books/PbPaginatedBooks.vue';
import PbTour from './components/PbTour.vue';
import NProgress from 'nprogress/nprogress';

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
      currentQuery: '',
      currentPage: 0,
      middlewares: [this.middleware]
    };
  },
  watch: {
    '$store.state.SClient.notFilters' : {
      deep: true,
      handler(){
        this.currentQuery = null;
      }
    },
    '$store.state.SClient' : {
      deep: true,
      handler(){
        NProgress.start();
      }
    }
  },
  beforeMount() {
    NProgress.start();
  },
  updated() {
    this.hideLoader();
  },
  methods: {
    paginationHook(helper) {

      if(helper.getPage() === 0) {
        this.currentQuery = helper.state.query;
      }
      if(this.currentQuery !== helper.state.query) {
        helper.setPage(0); // reset the pagination when the query changes
      }

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
      },1000);
    }
  }
};
</script>
