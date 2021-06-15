<template>
  <ais-hits
    :transform-items="transformItems"
    class="mt-4 space-y-4"
  >
    <template #default="{ items }">
      <p
        v-if="items.length === 0"
        class="ais-Hits__books__noresults"
      >
        Sorry, no results were found for "{{ $store.state.SClient.searchParameters.searchQuery }}".
        You may want to check your spelling, use alternative terms with similar meanings, or clear one or more filters.
      </p>
      <book-card
        v-for="item in items"
        :key="item.objectID"
        :item="item"
      />
    </template>
  </ais-hits>
</template>

<script>

import BookCard from './BookCard.vue';
import helpers from '../../store/helpers';
export default {
  name: 'Books',
  components: {BookCard},
  methods: {
    transformItems(items) {
      let vm = this;
      return items.map(item => ({
        ...item,
        authorNames:
            typeof item.author === 'object' && item.author !== null
              ? helpers.functions.unescapeHTML(item.author.join(', '))
              : helpers.functions.unescapeHTML(item.author),
        editorNames:
            item.hasEditor && typeof item.editor === 'object'
              ? helpers.functions.unescapeHTML(item.editor.join(', '))
              : helpers.functions.unescapeHTML(item.editor),
        image: item.hasThumbnailUrl
          ? item.thumbnailUrl
          : item.hasImage ? item.image : vm.$store.state.config.imagesPath + vm.$store.state.config.defaultBookCover,
        publisherName: item.hasPublisher ? helpers.functions.unescapeHTML(item.publisherName) : false,
        lang: item.hasLanguageName ? item.inLanguage : false,
        description: vm.getBookDescription(item),
        licenseIcon: item.hasLicense
          ? vm.getLicenseIcon(item).image
          : false,
        licenseAlt: item.hasLicense
          ? vm.getLicenseIcon(item).alt
          : false,
        isBasedOn: item.isBasedOn !== undefined,
        subject: item.subject !== undefined ? item.subject : false,
        wordCount: item.wordCount !== undefined ? item.wordCount : false,
        name: helpers.functions.unescapeHTML(item.name)
      }));
    },
    getLicenseIcon(item) {
      return helpers.functions.getLicenseIconAndAltByLicenseName(item.licenseName);
    },
    removeXMLTags(string) {
      return string.replace(/(<([^>]+)>)/gi, '');
    },
    getBookDescription(item) {
      if (!item.hasDescription && item.hasDisambiguatingDescription) {
        return this.removeXMLTags(helpers.functions.unescapeHTML(item.disambiguatingDescription));
      }
      return item.hasDescription ? this.removeXMLTags(helpers.functions.unescapeHTML(item.description)) : '';
    }
  }
};
</script>
