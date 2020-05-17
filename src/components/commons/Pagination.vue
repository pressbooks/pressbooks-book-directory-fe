<template>
  <div class="">
    <ais-pagination :class-names="{ 'ais-Pagination': 'nav' }">
      <ul
        slot-scope="{
          currentRefinement,
          nbPages,
          pages,
          isFirstPage,
          isLastPage,
          refine,
          createURL
        }"
        class="pagination"
      >
        <li v-if="!isFirstPage" class="page-item">
          <span
            class="page-link"
            :href="createURL(0)"
            @click.prevent="updatePage(0)"
          >
            ‹‹
          </span>
        </li>
        <li v-if="!isFirstPage" class="page-item">
          <span
            class="page-link"
            :href="createURL(currentRefinement - 1)"
            @click.prevent="updatePage(currentRefinement - 1)"
          >
            ‹
          </span>
        </li>
        <li
          v-for="page in pages"
          :key="page"
          class="page-item"
          v-bind:class="{ active: page === currentRefinement }"
        >
          <span
            class="page-link"
            :href="createURL(page)"
            :style="{ fontWeight: page === currentRefinement ? 'bold' : '' }"
            @click.prevent="updatePage(page)"
          >
            {{ page + 1 }}
          </span>
        </li>
        <li v-if="!isLastPage" class="page-item">
          <span
            class="page-link"
            :href="createURL(currentRefinement + 1)"
            @click.prevent="updatePage(currentRefinement + 1)"
          >
            ›
          </span>
        </li>
        <li v-if="!isLastPage" class="page-item">
          <span
            class="page-link"
            :href="createURL(nbPages)"
            @click.prevent="updatePage(nbPages)"
          >
            ››
          </span>
        </li>
      </ul>
    </ais-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  methods: {
    updatePage(page) {
      this.$store.state.SClient.searchParameters.page = page;
      this.$store.dispatch("refreshFilters");
    }
  }
};
</script>
