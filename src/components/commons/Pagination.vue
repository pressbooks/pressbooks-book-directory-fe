<template>
  <div class="text-center">
    <ais-pagination :class-names="{ 'ais-Pagination': 'nav' }">
      <div
        slot-scope="{
          currentRefinement,
          nbPages,
          pages,
          isFirstPage,
          isLastPage,
          refine,
          createURL
        }"
      >
        <v-pagination
          :length="nbPages"
          :page="currentRefinement"
          :total-visible="6"
          @input="updatePage"
          color="#42A5F5"
          :value="currentRefinement + 1"
        ></v-pagination>
      </div>
    </ais-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  methods: {
    updatePage(page) {
      this.$store.state.SClient.searchParameters.page = page - 1;
      this.$store.dispatch("refreshFilters");
    }
  }
};
</script>
