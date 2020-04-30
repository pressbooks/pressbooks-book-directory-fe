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
        :search-function="searchFunction"
      >
<!--        <ais-configure-->
<!--          :filters="getStringQuery"-->
<!--        >-->
        <ais-configure
          v-bind="searchParameters"
        >
        </ais-configure>
        <div class="search-panel">
          <div class="search-panel__filters">
            <ais-current-refinements />
            <h3>Authors</h3>
            <ais-refinement-list
              attribute="inLanguage"
              :searchable="false"
            />
            <h3>Licenses</h3>
            <ais-refinement-list
              attribute="license_name"
              :searchable="false"
            />
          </div>
          <div class="search-panel__results">
            <ais-search-box placeholder="Search here…" class="searchbox" />
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
                        v-if="item.lang"
                        @click="applyFilters(item, 'inLanguage')"
                      >
                        {{ item.lang }}
                      </div>
                      <div class="media-license book-details">
                        <img
                          :src="item.licenseIcon"
                          :title="item.licenseAlt"
                          class="img-icons"
                          v-if="item.licenseIcon"
                          @click="applyFilters(item, 'license_name')"
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
                          <strong>Author(s): </strong>{{ item.authorNames }}
                        </div>
                        <div class="media-row" v-if="item.editor && item.editor.length > 0">
                          <strong>Editor(s): </strong> {{ item.editorNames }}
                        </div>
                        <div class="media-row" v-if="item.subject">
                          <strong>Subject(s): </strong> {{ item.subject }}
                        </div>
                        <div class="media-row" v-if="item.publisher_name">
                          <strong>Publisher: </strong>{{ item.publisherName }}
                        </div>
                        <div class="media-row" v-if="item.word_count">
                          <strong>Word Count: </strong> {{ item.word_count }}
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
  computed: {
    getStringQuery() {
      if (this.stringQuery.length > 0) {
        return this.stringQuery;
      }
    }
  },
  methods: {
    searchFunction(helper) {
      this.filters.forEach((f) => {
        helper.addDisjunctiveFacetRefinement(f.attribute, f.value);
      })
      helper.search();
      this.searchParameters.filters = '';
      this.filters = [];
    },
    applyFilters(item, attribute) {
      var toString = attribute + ':"' + item[attribute] + '"';
      if (this.searchParameters.filters.length == 0) {
        this.searchParameters.filters = toString ;
      } else {
        this.searchParameters.filters += ' AND ' + toString;
      }
      this.filters.push({
        attribute: attribute,
        value: item[attribute]
      });
    },
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
        if (lic == key) {
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
        authorNames: typeof(item.author) === "object" ? item.author.join(", ") : item.author,
        editorNames: typeof(item.editor) === "object" ? item.editor.join(", ") : item.editor,
        image: item.image ? item.image : vm.imagesPath + 'no-image-available.png',
        publisherNname: item.publisher_name ? item.publisher_name.value : false,
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
        isBasedOn: item.isBasedOn !== undefined ? true : false,
        subject: item.subject !== undefined ? item.subject : false,
        word_count: item.word_count !== undefined ? item.word_count : false
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
        "cc-by-sa-(attribution-sharealike)": {
          image: "by-sa.png",
          alt: "Attribution - ShareAlike (SA)"
        },
        "cc-by-nd-(attribution-noderivatives)": {
          image: "by-nd.png",
          alt: "Attribution - No Derivative Work (ND)"
        },
        "cc-by-nc-sa-(attribution-noncommercial-sharealike)": {
          image: "by-nc-sa.png",
          alt: "Attribution - Non Commercial - ShareAlike"
        },
        "cc-by-nc-nd-(attribution-noncommercial-noderivatives)": {
          image: "by-nc-nd.png",
          alt: "Attribution - Noncommercial - NoDerivatives"
        },
        "cc-by-nc-(attribution-noncommercial)": {
          image: "by-nc.png",
          alt: "Attribution - Non Commercial (NC)"
        },
        'cc-by-(attribution)': {
          image: "by.png",
          alt: "Attribution Alone (BY)"
        },
        'all-rights-reserved': {
          image: "allrights.png",
          alt: "All Rights Reserved"
        },
        'cc0-(creative-commons-zero)': {
          image: "0.png",
          alt: "Zero - Public Domain"
        },
        "public-domain": {
          image: "public-domain.png",
          alt: "Public Domain"
        }
      },
      stringQuery: '',
      filters: [],
      searchParameters: {
        hitsPerPage: 10,
        filters: ''
      }
    };
  }
};
</script>
