<template>
  <div>
    <h2 class="supername leading-tight uppercase font-headings text-sm font-medium mb-2">
      {{ `${item.networkHost} | ${item.networkName}` }}
    </h2>
    <h2 class="name leading-tight text-red-800 text-xl font-headings font-semibold mb-2">
      <a
        :href="item.url"
        target="_blank"
        rel="noopener external"
      >
        {{ item.name }}
      </a>
    </h2>
    <p class="complement leading-tight font-headings mb-2">
      <span class="word-count">{{ item.wordCount }}</span> words | <span class="size">{{ sizeInMb }}</span> MB
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
