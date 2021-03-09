<template>
  <ais-hits :transform-items="transformItems">
    <template
      #default="{ items }"
    >
      <div class="ais-Hits__books">
        <p
          v-if="items.length === 0"
          class="ais-Hits__books__noresults"
        >
          Sorry, no results were found for "{{ $store.state.SClient.searchParameters.searchQuery }}".
          You may want to check your spelling, use alternative terms with similar meanings, or clear one or more filters.
        </p>
        <div
          v-for="item in items"
          :key="item.objectID"
          class="ais-Hits__books__container"
        >
          <book-card :item="item" />
        </div>
      </div>
    </template>
  </ais-hits>
</template>

<script>
import BookCard from './bookcard/BookCard.vue';
import helpers from '@/store/helpers';
export default {
  name: 'Books',
  components: {
    BookCard
  },
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
                        item.has_editor && typeof item.editor === 'object'
                          ? helpers.functions.unescapeHTML(item.editor.join(', '))
                          : helpers.functions.unescapeHTML(item.editor),
        image: item.image
          ? item.image
          : vm.$store.state.config.imagesPath + vm.$store.state.config.defaultBookCover,
        publisherName: item.publisherName ? helpers.functions.unescapeHTML(item.publisherName) : false,
        lang: item.inLanguage ? item.inLanguage.toUpperCase() : false,
        description: vm.getBookDescription(item),
        licenseIcon: item.licenseName
          ? vm.getLicenseIcon(item).image
          : false,
        licenseAlt: item.licenseName
          ? vm.getLicenseIcon(item).alt
          : false,
        isBasedOn: item.isBasedOn !== undefined,
        subject: item.subject !== undefined ? item.subject : false,
        wordCount: item.wordCount !== undefined ? item.wordCount : false,
        name: helpers.functions.unescapeHTML(item.name)
      }));
    },
    getLicenseIcon(item) {
      if (item.licenseName !== undefined) {
        let license = item.licenseName;
        let img = {
          image:
                            this.$store.state.config.imagesPath +
                            'licenses/' +
                            this.$store.state.config.licenseIcons['public-domain'].image,
          alt: this.$store.state.config.licenseIcons['public-domain'].alt
        };
        let lic = license
          .toLowerCase()
          .split(' ')
          .join('-');
        for (const key in this.$store.state.config.licenseIcons) {
          if (lic == key) {
            img = {
              image: this.$store.state.config.imagesPath + 'licenses/' + this.$store.state.config.licenseIcons[key].image,
              alt: this.$store.state.config.licenseIcons[key].alt
            };
          }
        }
        return img;
      }
      return {image: false, alt: false};
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
