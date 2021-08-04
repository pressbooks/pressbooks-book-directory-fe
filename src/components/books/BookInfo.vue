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
        @click="clickBook"
      >
        {{ item.name }}
      </a>
    </h2>
    <p class="leading-tight">
      <span data-cy="book-word-count">{{ item.wordCount | numberFormat }}</span> words | <span data-cy="book-size">{{ sizeInMb }}</span> MB | <template v-if="hasH5PActivities">
        <a
          :href="item.url + 'h5p-listing'"
          class="text-pb-red underline"
          target="_blank"
        ><span data-cy="h5p-count">{{ item.h5pActivities | numberFormat }}</span> H5P activities</a>
      </template>
      <template v-else>
        <span
          data-cy="h5p-count"
        >{{ item.h5pActivities | numberFormat }}</span> H5P activities
      </template>
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
  emits: ['title-clicked'],
  computed: {
    sizeInMb() {
      const size = (parseInt(this.item.storageSize) / 1024) / 1024;

      return size.toFixed(2);
    },
    hasH5PActivities() {
      return this.item.hasH5pActivities && this.item.h5pActivities > 0;
    }
  },
  methods: {
    clickBook() {
      this.$emit('book-title-click');
      const clickEndpoint = import.meta.env.VITE_CLICK_COUNT_ENDPOINT;
      if (clickEndpoint) {
        fetch(clickEndpoint,{
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({book_id:this.item.objectID}),
        });
      }
    }
  }
};
</script>
