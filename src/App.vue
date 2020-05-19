<template>
  <div class="mx-auto" >
    <header-bar></header-bar>
    <v-container fluid>
      <ais-instant-search
        :search-client="$store.state.SClient.searchClient"
        :index-name="$store.state.SClient.indexName"
        :search-function="searchFunction"
      >
        <ais-configure v-bind="$store.state.SClient.searchParameters">
        </ais-configure>
        <ais-search-box
          placeholder="Search here…"
          submit-title="Search"
          class="searchbox"
        >
          <div slot-scope="{ currentRefinement, refine }">
            <v-text-field
              type="search"
              v-model="currentRefinement"
              label="Find a book"
              @input="enableFilters(refine, currentRefinement)"
            >
              <v-icon slot="append" color="red">mdi-magnify</v-icon>
            </v-text-field>
          </div>
        </ais-search-box>
        <ais-current-refinements>
          <template slot="item" slot-scope="{ item }">
            <v-chip
              class="ma-2"
              color="#42A5F5"
              text-color="white"
              @click.prevent="deleteFilter(item)"
            >
              {{ item.attribute }} : {{ item.label }}
              <v-icon right>mdi-close-circle-outline</v-icon>
            </v-chip>
          </template>
        </ais-current-refinements>
        <v-row no-gutters>
          <v-col cols="6" md="2">
            <filters></filters>
          </v-col>
          <v-col cols="12" md="10">
            <div
              v-if="$store.state.config.canFilter"
            >
              <ais-hits :transform-items="transformItems">
                <div class="books" slot-scope="{ query, items }">
                  <p class="books-no-results" v-if="items.length === 0">
                    No results found matching <strong>{{ query }}</strong
                  >.
                  </p>
                  <v-row dense>
                    <v-col v-for="item in items" :key="item.objectID" cols="12">
                      <book-card :item="item"></book-card>
                    </v-col>
                  </v-row>
                </div>
              </ais-hits>
              <pagination></pagination>
            </div>
          </v-col>
        </v-row>
      </ais-instant-search>
    </v-container>
  </div>
</template>

<script>
import "instantsearch.css/themes/algolia-min.css";

import "./App.css";
import BookCard from "./components/bookcard/BookCard";
import Filters from "./components/filters/Filters";
import Pagination from "./components/commons/Pagination";
import HeaderBar from "./components/commons/HeaderBar"

export default {
  components: {
    BookCard,
    Filters,
    Pagination,
    HeaderBar
  },
  methods: {
    searchFunction(helper) {
      this.$store.dispatch("searchFunction", helper);
    },
    enableFilters(refine, currentRefinement) {
      if (currentRefinement.length > 3) {
        refine(currentRefinement);
        this.$store.state.config.canFilter = currentRefinement.length > 3;
      }
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
