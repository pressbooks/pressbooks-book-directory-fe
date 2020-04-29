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
                    <div class="media-icons" v-if="item.inLanguage">
                      <div class="media-lang">
                        {{ item.inLanguage }}
                      </div>
                      <div class="media-license">
                        <img :src="item.license" height="22" v-if="item.license" />
                      </div>
                      <div class="media-clone">
                        <img :src="baseIcon(item.has_isBasedOn)" height="22" />
                      </div>
                    </div>
                    <div class="media">
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
    baseIcon(isChild) {
      return isChild ? this.imagesPath + 'is-child.png' : this.imagesPath + 'is-base.png';
    },
    getLicenseIcon(license) {
      var lic = license.toLowerCase().split(' ').join('-');
      for (const key in this.licenseIcons) {
        if (lic.includes(key)) {
          return this.imagesPath + 'licenses/' + this.licenseIcons[key];
        }
      }
      return this.imagesPath + 'licenses/' + this.licenseIcons['public-domain'];
    },
    removeXMLTags(string) {
      return string.replace(/<[^>]*>/g, '');
    },
    transformItems(items) {
      let vm = this;
      return items.map(item => ({
        ...item,
        author: item.author.join(", "),
        editor: item.editor ? item.editor.join(", ") : false,
        publisher_name: item.publisher_name ? item.publisher_name.value : false,
        inLanguage: item.inLanguage ? item.inLanguage.toUpperCase() : false,
        description: item.description ? vm.removeXMLTags(item.description) : false,
        license: item.license_name ? vm.getLicenseIcon(item.license_name) : false
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
      imagesPath: 'assets/images/',
      licenseIcons: {
        'by-sa': 'by-sa.png',
        'by-nd': 'by-nd.png',
        'by-nc-sa': 'by-nc-sa.png',
        'by-nc-nd': 'by-nc-nd.png',
        'by-nc': 'by-nc.png',
        'by': 'by.png',
        'allrights': 'allrights.png',
        '0': '0.png',
        'public-domain': 'public-domain.png'
      }
    };
  }
};
</script>
