<template>
  <div>
    <ul
      class="py-4 space-y-1"
      data-cy="book-meta"
    >
      <meta-info
        v-if="hasAuthors"
        title="Author(s):"
        :text="authors"
        data-cy="book-authors"
      />
      <meta-info
        v-if="item.hasEditor"
        title="Editor(s):"
        :text="editors"
        data-cy="book-editors"
      />
      <meta-info
        v-if="hasSubjects"
        title="Subject(s):"
        :text="subjects"
        data-cy="book-subjects"
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
        data-cy="book-publisher"
      />
      <meta-info
        title="Language:"
        :text="item.languageName"
        data-cy="book-language"
      />
    </ul>
    <div data-cy="book-description">
      <!-- eslint-disable vue/no-v-html -->
      <v-clamp
        v-if="hasDescription"
        autoresize
        :max-lines="maxLinesDescription"
        class="leading-relaxed font-serif"
        data-cy="book-description"
      >
        {{ item.description }}
        <template #after="{ toggle, clamped }">
          <button
            v-if="clamped"
            class="block text-pb-red underline"
            data-cy="book-read-more-description"
            @click.prevent="toggle"
          >
            Read more
          </button>
        </template>
      </v-clamp>
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>

<script>
import MetaInfo from './MetaInfo.vue';
import VClamp from 'vue-clamp';

export default {
  name: 'BookDetails',
  components: {
    MetaInfo,
    VClamp
  },
  props: {
    item: {
      type: Object,
      default() { return {}; }
    },
  },
  data() {
    return {
      maxLinesDescription: 6
    };
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
    },
    editors() {
      return this.item.editor.join(', ');
    }
  }
};
</script>
