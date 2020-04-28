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
                      No results found matching <strong>{{query}}</strong>.
                    </p>
                  </template>
                </ais-state-results>
                <article
                  v-for="item in items"
                  :key="item.objectID"
                  class="book"
                >
                  <div class="media-object" :style="`background-image: url('${item.image}');`">
                  </div>
                  <div class="media">
                    <h2 class="media-title">
                      {{item.name}}
                    </h2>
                    <div class="media-detail">
                      <div class="media-row">
                        <strong>Author(s): </strong>{{item.author}}
                      </div>
                      <div class="media-row">
                        <strong>Editor(s): </strong>
                      </div>
                      <div class="media-row">
                        <strong>Subject(s): </strong>
                      </div>
                      <div class="media-row">
                        <strong>Publisher: </strong>{{item.publisher_name}}
                      </div>
                      <div class="media-row">
                        <strong>Word Count: </strong>
                      </div>
                      <div class="media-row">
                        <strong>Description: </strong>
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
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

import './App.css';

export default {
  methods: {
    transformItems(items) {
      return items.map(item => ({
        ...item,
        author: item.author.join(', '),
      }));
    }
  },
  data() {
    return {
      searchClient: algoliasearch(
              process.env.VUE_APP_ALGOLIA_APP_ID,
              process.env.VUE_APP_ALGOLIA_API_READ_KEY
      ),
      indexName: process.env.VUE_APP_ALGOLIA_INDEX
    };
  },
};
</script>