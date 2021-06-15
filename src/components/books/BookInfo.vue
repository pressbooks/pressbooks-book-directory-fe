<template>
  <div class="space-y-2 my-2">
    <h3
      class="tracking-widest uppercase text-sm font-medium"
      data-cy="book-network"
    >
      <span class="sr-only">Network</span>
      {{ `${item.networkHost} | ${item.networkName}` }}
    </h3>
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
      <span data-cy="book-word-count">{{ item.wordCount }}</span> words | <span data-cy="book-size">{{ sizeInMb }}</span> MB
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
