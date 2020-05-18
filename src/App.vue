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
        <ais-configure v-bind="$store.state.SClient.searchParameters">
        </ais-configure>
        <h5>Find a book</h5>
        <ais-search-box
          placeholder="Search here…"
          submit-title="Search"
          class="searchbox"
        >
          <div slot-scope="{ currentRefinement, refine }">
            <form
              @submit.prevent="enableFilters(refine, currentRefinement)"
              class="ais-SearchBox-form"
            >
              <input
                type="search"
                class="ais-SearchBox-input"
                v-model="currentRefinement"
              />
              <div slot="submit-icon">
                <button type="submit" class="btn submit-btn">Search</button>
              </div>
            </form>
          </div>
        </ais-search-box>
        <ais-current-refinements>
          <template slot="item" slot-scope="{ item }">
            <button
              type="button"
              class="btn btn-info btn-sm btn-current-filters"
              @click.prevent="deleteFilter(item)"
            >
              {{ item.attribute }} : {{ item.label }} &nbsp;&nbsp;<span
                class="badge badge-light"
                >x</span
              >
            </button>
          </template>
        </ais-current-refinements>
        <div class="search-panel">
          <filters></filters>
          <div
            class="search-panel__results"
            v-if="$store.state.config.canFilter"
          >
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
            <pagination></pagination>
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
import Pagination from "./components/commons/Pagination";

export default {
  components: {
    BookCard,
    Filters,
    Pagination
  },
  methods: {
    searchFunction(helper) {
      this.$store.dispatch("searchFunction", helper);
    },
    enableFilters(refine, currentRefinement) {
      refine(currentRefinement);
      this.$store.state.config.canFilter = currentRefinement.length > 1;
    },
    deleteFilter(item) {
      let keyToDelete = 0;
      if (
        this.$store.state.SClient.filtersApplied[item.attribute].length === 1
      ) {
        delete this.$store.state.SClient.filtersApplied[item.attribute];
      } else {
        this.$store.state.SClient.filtersApplied[item.attribute].forEach(
          (f, k) => {
            if (f.value == item.label) {
              keyToDelete = k;
            }
          }
        );
        this.$store.state.SClient.filtersApplied[item.attribute].splice(
          keyToDelete,
          1
        );
      }
      this.$store.dispatch("refreshFilters");
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
