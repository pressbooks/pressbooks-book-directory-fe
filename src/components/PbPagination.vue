<template>
  <div class="pagination">
    <div class="container mx-auto py-16">
      <div class="flex flex-row w-full items-center md:w-1/2 justify-center text-gray-600">
        <div class="action">
          <a
            href="#!"
            class="block"
          >
            <ArrowNarrowLeftIcon class="h-6 w-6 mr-3 text-red-800"></ArrowNarrowLeftIcon>
          </a>
        </div>
        <div class="page font-bold text-gray-900">
          <a
            href="!"
            class="block px-2"
          >
            1
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            2
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            3
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            4
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            5
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            6
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            7
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            8
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            9
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            10
          </a>
        </div>
        <a
          href="#!"
          class="block"
        >
          <ArrowNarrowRightIcon class="h-6 w-6 ml-3 text-red-800"></ArrowNarrowRightIcon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@vue-hero-icons/outline';

export default {
  name: 'PbPagination',
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon
  },
};
</script>

<style>

</style>