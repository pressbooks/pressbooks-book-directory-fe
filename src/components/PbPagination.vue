<template>
  <div class="pagination">
    <div
      class="container mx-auto my-4"
    >
      <ais-pagination :total-pages="500">
        <ul
          slot-scope="{
            pages,
            isFirstPage,
            isLastPage
          }"
          class="flex flex-row w-full items-center justify-center"
          data-cy="paginator"
          @click="scrollToBooksList"
        >
          <li
            v-if="!isFirstPage"
            class="action"
          >
            <a
              class="block"
              data-cy="paginator-prev"
              href="#"
              @click.prevent="changePage($store.state.SClient.searchParameters.page - 1)"
            >
              <ArrowNarrowLeftIcon class="h-6 w-6 mr-3 text-pb-red" />
            </a>
          </li>
          <li
            v-for="page in pages"
            :key="page"
            class="page"
            :data-cy="`paginator-link-${page+1}`"
          >
            <a
              class="block px-2"
              href="#"
              :class="$store.state.SClient.searchParameters.page == page+1 ? 'font-bold font-gray-900' : ''"
              @click.prevent="changePage(page + 1)"
            >
              {{ page + 1 }}
            </a>
          </li>
          <li v-if="!isLastPage">
            <a
              class="block"
              href="#"
              data-cy="paginator-next"
              @click.prevent="changePage(parseInt($store.state.SClient.searchParameters.page) + 1)"
            >
              <ArrowNarrowRightIcon class="h-6 w-6 ml-3 text-pb-red" />
            </a>
          </li>
        </ul>
      </ais-pagination>
    </div>
  </div>
</template>

<script>
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@vue-hero-icons/outline';
import {scrollTo} from '../utils/helpers';

export default {
  name: 'PbPagination',
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon
  },
  data() {
    return {
      alias: this.$store.state.SClient.searchParameters.aliases.page
    };
  },
  methods: {
    scrollToBooksList() {
      scrollTo('#books');
    },
    changePage(page) {
      let routeQuery = {...this.$route.query};
      if (
        !routeQuery[this.alias] ||
        (
          routeQuery[this.alias] &&
          routeQuery[this.alias] != page
        )
      ) {
        routeQuery[this.alias] = page;
        this.$router.replace({ query: routeQuery });
      }
    }
  }
};
</script>

<style>

</style>