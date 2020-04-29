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
        :search-client="searchClient"
        index-name="test_Pressbooks_directory"
      >
        <div class="search-panel">
          <div class="search-panel__filters">
            <ais-refinement-list attribute="categories" searchable />
          </div>
          <div class="search-panel__results">
            <ais-search-box placeholder="Search here…" class="searchbox" />
            <ais-hits :transform-items="transformItems">
              <div class="books" slot-scope="{ items }">
                <ais-state-results>
                  <template slot-scope="{ query, hits }">
                    <p class="books-no-results" v-if="hits.length === 0">
                      No results found matching <strong>{{ query }}</strong
                      >.
                    </p>
                  </template>
                </ais-state-results>
                <article
                  v-for="item in items"
                  :key="item.objectID"
                  class="book"
                >
                  <div
                    class="media-object"
                    :style="`background-image: url('${item.image}');`"
                  ></div>
                  <div class="media-data">
                    <div class="media-icons media-data-row">
                      <div
                        class="media-lang book-details"
                        v-if="item.inLanguage"
                      >
                        {{ item.inLanguage }}
                      </div>
                      <div class="media-license book-details">
                        <img
                          :src="item.licenseIcon"
                          :title="item.licenseAlt"
                          class="img-icons"
                          v-if="item.licenseIcon"
                        />
                      </div>
                      <div class="media-clone book-details">
                        <img
                          :src="baseIcon(item.isBasedOn).img"
                          :title="baseIcon(item.isBasedOn).alt"
                          class="img-icons"
                        />
                      </div>
                    </div>
                    <div class="media media-data-row">
                      <div class="media-title">
                        {{ item.name }}
                      </div>
                      <div class="media-detail">
                        <div class="media-row">
                          <strong>Author(s): </strong>{{ item.author }}
                        </div>
                        <div class="media-row" v-if="item.editor">
                          <strong>Editor(s): </strong>
                        </div>
                        <div class="media-row">
                          <strong>Subject(s): </strong>
                        </div>
                        <div class="media-row" v-if="item.publisher_name">
                          <strong>Publisher: </strong>{{ item.publisher_name }}
                        </div>
                        <div class="media-row">
                          <strong>Word Count: </strong>
                        </div>
                        <div class="media-row" v-if="item.description">
                          <strong>Description: </strong> {{ item.description }}
                        </div>
                      </div>
                    </div>
                  </div>
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
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia-min.css";

import "./App.css";

export default {
  methods: {
    baseIcon(isBasedOn) {
      return {
        img: isBasedOn
          ? this.imagesPath + "is-child.png"
          : this.imagesPath + "is-base.png",
        alt: isBasedOn ? "Based on other book" : "Is not based on another book"
      };
    },
    getLicenseIcon(license) {
      var img = {
        image:
          this.imagesPath +
          "licenses/" +
          this.licenseIcons["public-domain"].image,
        alt: this.licenseIcons["public-domain"].alt
      };
      var lic = license
        .toLowerCase()
        .split(" ")
        .join("-");
      for (const key in this.licenseIcons) {
        if (lic.includes(key)) {
          img = {
            image: this.imagesPath + "licenses/" + this.licenseIcons[key].image,
            alt: this.licenseIcons[key].alt
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
        author: item.author.join(", "),
        editor: item.editor ? item.editor.join(", ") : false,
        publisher_name: item.publisher_name ? item.publisher_name.value : false,
        inLanguage: item.inLanguage ? item.inLanguage.toUpperCase() : false,
        description: item.description
          ? vm.removeXMLTags(item.description)
          : false,
        licenseIcon: item.license_name
          ? vm.getLicenseIcon(item.license_name).image
          : false,
        licenseAlt: item.license_name
          ? vm.getLicenseIcon(item.license_name).alt
          : false,
        isBasedOn: item.isBasedOn !== undefined ? true : false
      }));
    }
  },
  data() {
    return {
      searchClient: algoliasearch(
        process.env.VUE_APP_ALGOLIA_APP_ID,
        process.env.VUE_APP_ALGOLIA_API_READ_KEY
      ),
      indexName: process.env.VUE_APP_ALGOLIA_INDEX,
      imagesPath: "assets/images/",
      licenseIcons: {
        "by-sa": {
          image: "by-sa.png",
          alt: "Attribution - ShareAlike (SA)"
        },
        "by-nd": {
          image: "by-nd.png",
          alt: "Attribution - No Derivative Work (ND)"
        },
        "by-nc-sa": {
          image: "by-nc-sa.png",
          alt: "Attribution - Non Commercial - ShareAlike"
        },
        "by-nc-nd": {
          image: "by-nc-nd.png",
          alt: "Attribution - Noncommercial - NoDerivatives"
        },
        "by-nc": {
          image: "by-nc.png",
          alt: "Attribution - Non Commercial (NC)"
        },
        by: {
          image: "by.png",
          alt: "Attribution Alone (BY)"
        },
        allrights: {
          image: "allrights.png",
          alt: "All Rights Reserved"
        },
        cc0: {
          image: "0.png",
          alt: "Zero - Public Domain"
        },
        "public-domain": {
          image: "public-domain.png",
          alt: "Public Domain"
        }
      }
    };
  }
};
</script>
