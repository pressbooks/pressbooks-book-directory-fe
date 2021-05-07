<template>
  <div class="pagination">
    <div
      class="container mx-auto my-4"
    >
      <ais-pagination :total-pages="500">
        <ul
          slot-scope="{
            currentRefinement,
            pages,
            isFirstPage,
            isLastPage,
            refine,
            createURL
          }"
          class="flex flex-row w-full items-center justify-center text-gray-600"
          data-cy="paginator"
          @click="scrollToBooksList"
        >
          <li
            v-if="!isFirstPage"
            class="action"
          >
            <a
              class="block"
              :href="createURL(0)"
              data-cy="paginator-prev"
              @click.prevent="refine(0)"
            >
              <ArrowNarrowLeftIcon class="h-6 w-6 mr-3 text-pb-red" />
            </a>
          </li>
          <li
            v-for="page in pages"
            :key="page"
            class="page"
            data-cy="paginator-link"
          >
            <a
              class="block px-2"
              :class="currentRefinement === page ? 'font-bold font-gray-900' : ''"
              :href="createURL(page)"
              @click.prevent="refine(page)"
            >
              {{ page + 1 }}
            </a>
          </li>
          <li v-if="!isLastPage">
            <a
              class="block"
              :href="createURL(currentRefinement + 1)"
              data-cy="paginator-next"
              @click.prevent="refine(currentRefinement + 1)"
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
  methods: {
    scrollToBooksList() {
      scrollTo('#books');
    }
  }
};
</script>

<style>

</style>