<template>
  <div class="space-y-2 my-2">
    <h2
      class="tracking-widest uppercase text-sm font-medium"
      data-cy="book-network"
    >
      {{ `${item.networkHost} | ${item.networkName}` }}
    </h2>
    <h2 class="leading-tight text-xl font-semibold mb-1">
      <a
        class="text-red-700"
        :href="item.url"
        target="_blank"
        rel="noopener"
        data-cy="book-title"
      >
        {{ item.name }}
      </a>
    </h2>
    <p class="leading-tight">
      <span data-cy="book-word-count">{{ item.wordCount }}</span> words | <span data-cy="book-size">{{ sizeInMb }}</span> MB | <span data-cy="h5p-count">{{ item.h5pActivities }}</span> H5P activities
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
  computed: {
    sizeInMb() {
      const size = (parseInt(this.item.storageSize) / 1024) / 1024;

      return size.toFixed(2);
    }
  }
};
</script>