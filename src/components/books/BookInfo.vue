<template>
  <div class="space-y-2">
    <span
      class="tracking-widest uppercase text-sm font-medium"
      data-cy="book-network"
    >
      <span class="sr-only">Network</span>
      {{ `${item.networkHost} | ${item.networkName}` }}
    </span>
    <h4 class="leading-tight text-xl font-semibold mb-1">
      <a
        class="text-red-700 underline hover:text-red-900"
        :href="item.url"
        target="_blank"
        rel="noopener"
        data-cy="book-title"
        @click="$emit('book-title-click')"
      >
        {{ item.name }}
      </a>
    </h4>
    <p class="leading-tight">
      <span data-cy="book-copyright-license">{{ bookLicense }}</span> | <template v-if="hasH5PActivities">
        <a
          :href="item.url + 'h5p-listing'"
          class="text-pb-red underline"
          target="_blank"
        ><span data-cy="h5p-count">{{ $filters.numberFormat(item.h5pActivities) }}</span> H5P activities</a>
      </template>
      <template v-else>
        <span
          data-cy="h5p-count"
        >{{ $filters.numberFormat(item.h5pActivities) }}</span> H5P activities
      </template> | <span data-cy="book-word-count">{{ $filters.numberFormat(item.wordCount) }}</span> words
    </p>
  </div>
</template>

<script>
export default {
  name: 'BookInfo',
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  emits: ['book-title-click'],
  computed: {
    hasH5PActivities() {
      return this.item.hasH5pActivities && this.item.h5pActivities > 0;
    },
    bookLicense() {
      return this.item.licenseCode;
    }
  }
};
</script>
