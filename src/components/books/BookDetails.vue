<template>
  <div>
    <ul class="py-4 space-y-1">
      <meta-info
        v-if="hasAuthors"
        title="Author(s):"
        :text="authors"
      />
      <meta-info
        v-if="hasSubjects"
        title="Subject(s):"
        :text="subjects"
      />
      <meta-info
        v-if="hasLastUpdated"
        title="Updated:"
        data-cy="book-last-updated"
        :text="lastUpdated"
      />
      <meta-info
        v-if="hasPublisher"
        title="Publisher:"
        :text="item.publisherName"
      />
      <meta-info
        title="Language:"
        :text="item.languageName"
      />
    </ul>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="hasDescription"
      class="leading-relaxed font-serif line-clamp-6"
      v-html="item.description"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script>
import MetaInfo from './MetaInfo.vue';

export default {
  name: 'BookDetails',
  components: {
    MetaInfo
  },
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  computed: {
    hasAuthors() {
      return this.item.author && this.item.author.length > 0;
    },
    hasDescription() {
      return this.item.description;
    },
    hasLastUpdated() {
      return this.item.hasLastUpdated;
    },
    hasPublisher() {
      return this.item.publisherName;
    },
    hasSubjects() {
      return this.item.about && this.item.about.length > 0;
    },
    authors() {
      return this.item.author.join(', ');
    },
    subjects() {
      return this.item.about.join(', ');
    },
    lastUpdated() {
      const date = new Date(this.item.lastUpdated * 1000);
      const month = date.getUTCMonth() +1, day = date.getUTCDate();

      return `${month < 10 ? '0' + month : month}-${day}-${date.getUTCFullYear()}`;
    }
  }
};
</script>
