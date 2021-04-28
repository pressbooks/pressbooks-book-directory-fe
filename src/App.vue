<template>
  <ais-instant-search
    :index-name="$store.state.SClient.indexName"
    :search-client="$store.state.SClient.searchClient"
  >
    <ais-configure
      :facet-filters.camel="$store.state.SClient.notFilters"
      :filters.camel="($store.state.SClient.filtersParams.length > 0) ? $store.state.SClient.filtersParams : ''"
      :query="$store.state.SClient.searchParameters.searchQuery"
    />
    <pb-navbar />
    <welcome-header />
    <pb-collections />
    <section class="section-books bg-white">
      <div class="content container mx-auto px-8 py-8">
        <div class="py-8">
          <pb-search-and-sort-box />
        </div>
        <div class="flex flex-row flex-wrap space-y-10 md:space-y-0 md:space-x-10">
          <pb-filters />
          <pb-paginated-books />
        </div>
      </div>
    </section>
    <pb-footer />
  </ais-instant-search>
</template>

<script>
import WelcomeHeader from './components/WelcomeHeader.vue';
import PbFooter from './components/PbFooter.vue';
import PbCollections from './components/collections/PbCollections.vue';
import PbNavbar from './components/PbNavbar.vue';
import PbFilters from './components/filters/PbFilters.vue';
import PbSearchAndSortBox from './components/PbSearchAndSortBox.vue';
import PbPaginatedBooks from './components/books/PbPaginatedBooks.vue';

export default {
  components: {
    PbPaginatedBooks,
    PbSearchAndSortBox,
    PbFilters,
    WelcomeHeader,
    PbFooter,
    PbCollections,
    PbNavbar,
  }
};
</script>
