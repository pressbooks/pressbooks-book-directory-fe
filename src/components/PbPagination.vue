<template>
  <ais-pagination
    :total-pages="500"
    role="navigation"
    class="container mx-auto my-4"
  >
    <template
      #default="{
        pages,
        isFirstPage,
        isLastPage,
      }"
    >
      <ul
        class="flex flex-row w-full items-center justify-center space-x-2"
        :data-cy="`paginator-${dataCySubfix}`"
        @click="scrollToBooksList"
      >
        <li v-if="!isFirstPage">
          <a
            class="block py-1 px-2"
            :data-cy="`paginator-prev-${dataCySubfix}`"
            href="#"
            @click.prevent="changePage($store.state.SClient.searchParameters.page - 1)"
          >
            <span class="sr-only">Previous page</span>
            <ArrowNarrowLeftIcon class="h-6 w-6 text-pb-red" />
          </a>
        </li>
        <li
          v-for="page in pages"
          :key="page"
          class="page"
        >
          <a
            class="block py-1 px-2"
            href="#"
            :data-cy="`paginator-link-${page+1}-${dataCySubfix}`"
            :class="$store.state.SClient.searchParameters.page == page+1 ? 'font-bold font-gray-900' : ''"
            @click.prevent="changePage(page + 1)"
          >
            <span class="sr-only">Page</span>
            {{ page + 1 }}
          </a>
        </li>
        <li v-if="!isLastPage">
          <a
            class="block py-1 px-2"
            href="#"
            :data-cy="`paginator-next-${dataCySubfix}`"
            @click.prevent="changePage(parseInt($store.state.SClient.searchParameters.page) + 1)"
          >
            <span class="sr-only">Next page</span>
            <ArrowNarrowRightIcon class="h-6 w-6 text-pb-red" />
          </a>
        </li>
      </ul>
    </template>
  </ais-pagination>
</template>

<script>
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/vue/outline';
import {scrollTo} from '../utils/helpers';

export default {
  name: 'PbPagination',
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon
  },
  props: {
    dataCySubfix: {
      type: String,
      default: ''
    }
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
          routeQuery[this.alias] !== page
        )
      ) {
        routeQuery[this.alias] = page;
        this.$router.replace({ query: routeQuery });
      }
    }
  }
};
</script>
