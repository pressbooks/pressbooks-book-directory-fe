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
        <ais-configure v-bind="searchParameters"> </ais-configure>
        <div class="search-panel">
          <div class="search-panel__filters">
            <ais-current-refinements />
            <h3>Authors</h3>
            <ais-refinement-list attribute="inLanguage" :searchable="false" />
            <h3>Licenses</h3>
            <ais-refinement-list attribute="license_name" :searchable="false" />
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
                          @click="applyFilters(item, 'isBasedOn')"
                        />
                      </div>
                    </div>
                    <div class="media media-data-row">
                      <div class="media-title">
                        {{ item.name }}
                      </div>
                      <div class="media-detail">
                        <div class="media-row">
                          <strong>Author(s): </strong>
                          <span
                            v-for="(author, index) in item.author"
                            v-bind:key="index"
                          >
                            <span v-if="index != 0">, </span>
                            <span
                              class="cursor-pointer"
                              @click="applyFilters(item, 'author', index)"
                            >
                              {{ author }}
                            </span>
                          </span>
                        </div>
                        <div
                          class="media-row"
                          v-if="item.editor && item.editor.length > 0"
                        >
                          <strong>Editor(s): </strong>
                          <span
                            v-for="(editor, index) in item.editor"
                            v-bind:key="index"
                          >
                            <span v-if="index != 0">, </span>
                            <span
                              class="cursor-pointer"
                              @click="applyFilters(item, 'editor', index)"
                            >
                              {{ editor }}
                            </span>
                          </span>
                        </div>
                        <div class="media-row" v-if="item.subject">
                          <strong>Subject(s): </strong> {{ item.subject }}
                        </div>
                        <div
                          v-if="item.publisher_name"
                          @click="applyFilters(item, 'publisher_name')"
                        >
                          <strong>Publisher: </strong>
                          <span class="media-row cursor-pointer">{{
                            item.publisherName
                          }}</span>
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
  methods: {
    searchFunction(helper) {
      this.filters.forEach(f => {
        if (this.filtersAllowed[f.attribute].type == "boolean") {
          if (f.value) {
            helper.addFacetExclusion("isBasedOn", false);
            helper.addFacetExclusion("has_isBasedOn", false);
          } else {
            helper.addDisjunctiveFacetRefinement(f.attribute, f.value);
          }
        } else {
          helper.addDisjunctiveFacetRefinement(f.attribute, f.value);
        }
      });
      helper.search();
      this.searchParameters.filters = "";
      this.filters = [];
    },
    applyFilters(item, attribute, index = null) {
      if (this.filtersAllowed[attribute] === undefined) {
        return;
      }
      var toString = "";
      var typeVar = this.filtersAllowed[attribute].type;
      var attr = attribute,
        value;

      if (index !== null) {
        value = item[attr][index];
      } else {
        value = item[attr];
      }

      switch (typeVar) {
        case "boolean":
          if (item[attribute]) {
            toString = this.filtersAllowed[attr].trueValue;
            attr = this.filtersAllowed[attr].trueAttribute;
            value = true;
          } else {
            toString = this.filtersAllowed[attr].falseValue;
            attribute = this.filtersAllowed[attr].falseAttribute;
            value = false;
          }
          break;
        default:
          toString = attr + ':"' + value + '"';
          break;
      }
      if (this.searchParameters.filters.length == 0) {
        this.searchParameters.filters = toString;
      } else {
        this.searchParameters.filters += " AND " + toString;
      }
      this.filters.push({
        attribute: attr,
        value: value
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
        "cc-by-(attribution)": {
          image: "by.png",
          alt: "Attribution Alone (BY)"
        },
        "all-rights-reserved": {
          image: "allrights.png",
          alt: "All Rights Reserved"
        },
        "cc0-(creative-commons-zero)": {
          image: "0.png",
          alt: "Zero - Public Domain"
        },
        "public-domain": {
          image: "public-domain.png",
          alt: "Public Domain"
        }
      },
      stringQuery: "",
      filtersAllowed: {
        license_name: {
          type: "string"
        },
        inLanguage: {
          type: "string"
        },
        has_isBasedOn: {
          type: "boolean"
        },
        publisher_name: {
          type: "string"
        },
        editor: {
          type: "string"
        },
        isBasedOn: {
          type: "boolean",
          trueValue: "NOT isBasedOn:false AND NOT has_isBasedOn:false",
          falseValue: "has_isBasedOn:false",
          trueAttribute: "isBasedOn",
          falseAttribute: "has_isBasedOn"
        },
        author: {
          type: "string"
        }
      },
      filters: [],
      searchParameters: {
        hitsPerPage: 10,
        filters: "",
        facets: [
          "isBasedOn",
          "has_isBasedOn",
          "license_name",
          "inLanguage",
          "publisher_name",
          "author",
          "editor"
        ],
        disjunctiveFacets: [
          "isBasedOn",
          "has_isBasedOn",
          "license_name",
          "inLanguage",
          "publisher_name",
          "author",
          "editor"
        ]
      }
    };
  }
};
</script>
