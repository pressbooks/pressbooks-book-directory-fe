<template>
  <div>
    <h2 class="leading-tight uppercase font-headings text-sm font-medium mb-2">
      {{ `${item.networkHost} | ${item.networkName}` }}
    </h2>
    <h2 class="leading-tight text-red-800 text-xl font-headings font-semibold mb-2">
      <a
        :href="item.url"
        target="_blank"
        rel="noopener external"
        data-cy="book-title"
      >
        {{ item.name }}
      </a>
    </h2>
    <p class="leading-tight font-headings mb-2">
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
