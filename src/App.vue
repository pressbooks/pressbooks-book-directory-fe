<template>
  <div>
    <header class="header">
      <h1 class="header-title"><a href="/">Vue InstantSearch v2 starter</a></h1>
      <p class="header-subtitle">
        using
        <a href="https://github.com/algolia/vue-instantsearch">
          Vue InstantSearch
        </a>
      </p>
    </header>

    <div class="container">
      <ais-instant-search
        :search-client="$store.state.SClient.searchClient"
        :index-name="$store.state.SClient.indexName"
        :search-function="searchFunction"
      >
        <ais-configure v-bind="$store.state.SClient.searchParameters" >
        </ais-configure>
        <div class="search-panel">
          <filters></filters>
          <div class="search-panel__results">
            <ais-hits :transform-items="transformItems">
              <div class="books" slot-scope="{ query, items }">
                <ais-state-results>
                  <template slot-scope="{ query, hits }">
                    <p class="books-no-results" v-if="hits.length === 0">
                      No results found matching <strong>{{ query }}</strong
                      >.
                    </p>
                  </template>
                </ais-state-results>
                <article v-for="item in items" :key="item.objectID">
                  <book-card class="book-card" :item="item"></book-card>
                </article>
              </div>
            </ais-hits>
            <div class="pagination"><ais-pagination /></div>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import "instantsearch.css/themes/algolia-min.css";

import "./App.css";
import BookCard from "./components/bookcard/BookCard";
import Filters from "./components/filters/Filters";

export default {
  components: {
    BookCard,
    Filters
  },
  methods: {
    searchFunction(helper) {
      this.$store.dispatch('searchFunction', helper);
    },
    getLicenseIcon(license) {
      var img = {
        image:
          this.$store.state.config.imagesPath +
          "licenses/" +
          this.$store.state.config.licenseIcons["public-domain"].image,
        alt: this.$store.state.config.licenseIcons["public-domain"].alt
      };
      var lic = license
        .toLowerCase()
        .split(" ")
        .join("-");
      for (const key in this.$store.state.config.licenseIcons) {
        if (lic == key) {
          return {
            image:
              this.$store.state.config.imagesPath +
              "licenses/" +
              this.$store.state.config.licenseIcons[key].image,
            alt: this.$store.state.config.licenseIcons[key].alt
          };
        }
      }
      return img;
    },
    removeXMLTags(string) {
      return string.replace(/<[^>]*>/g, "");
    },
    transformItems(items) {
      let vm = this;
      return items.map(item => ({
        ...item,
        authorNames:
          typeof item.author === "object"
            ? item.author.join(", ")
            : item.author,
        editorNames:
          typeof item.editor === "object"
            ? item.editor.join(", ")
            : item.editor,
        image: item.image
          ? item.image
          : vm.imagesPath + "no-image-available.png",
        publisherName: item.publisher_name ? item.publisher_name : false,
        lang: item.inLanguage ? item.inLanguage.toUpperCase() : false,
        description: item.description
          ? vm.removeXMLTags(item.description)
          : false,
        licenseIcon: item.license_name
          ? vm.getLicenseIcon(item.license_name).image
          : false,
        licenseAlt: item.license_name
          ? vm.getLicenseIcon(item.license_name).alt
          : false,
        isBasedOn: item.isBasedOn !== undefined,
        subject: item.subject !== undefined ? item.subject : false,
        word_count: item.word_count !== undefined ? item.word_count : false
      }));
    }
  }
};
</script>
