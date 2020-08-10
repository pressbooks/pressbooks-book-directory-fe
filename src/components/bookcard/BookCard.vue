<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-sheet
        v-if="state && state.searchMetadata.isSearchStalled"
        color="grey lighten-4"
        class="px-3 pt-3 pb-3"
    >
      <v-skeleton-loader
          class="mx-auto"
          type="table-heading, card, actions"
      ></v-skeleton-loader>
    </v-sheet>
    <v-card
      :class="addClasses(item)"
    >
      <v-row class="v-card__content">
        <v-col cols="9">
            <div class="network">{{ item.networkHost }} | {{ item.networkName }}</div>
        <v-card-title>
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </v-card-title>
        <v-card-text>
          <book-details :item="item"></book-details>
        </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-row>
            <v-col cols="12">
                <v-img class="book-cover" :src="item.image">
                </v-img>
              </v-col>
              <v-col cols="6">
                <div class="language">{{ item.languageCode }}</div>
              </v-col>
              <v-col cols="6">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      max-height="35"
                      contain
                      class="copyright"
                      v-bind="attrs"
                      v-on="on"
                      :eager="true"
                      :src="item.licenseIcon"
                      :alt="item.licenseAlt"
                  ></v-img>
                  </template>
                  <span>{{ item.licenseAlt }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                        v-if="item.has_h5pActivities && item.h5pActivities > 0"
                        max-height="35"
                        contain
                        v-bind="attrs"
                        v-on="on"
                        :eager="true"
                        :alt="'This book has ' + item.h5pActivities + ' H5P Activities'"
                        :src="h5pActivitiesImage"
                    ></v-img>
                  </template>
                  <span>This book has {{ item.h5pActivities }} H5P Activities </span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-if="item.has_isBasedOn"
                      max-height="35"
                      contain
                      class="isBasedOn"
                      v-bind="attrs"
                      v-on="on"
                      alt="Book based on another book"
                      :src="basedOnImg"
                    ></v-img>
                  </template>
                  <span>This book is based on another book </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-if="!item.has_isBasedOn"
                      max-height="35"
                      contain
                      class="isBasedOn"
                      v-bind="attrs"
                      v-on="on"
                      alt="This book is not based on another book"
                      :src="originalImg"
                    ></v-img>
                    </template>
                    <span>{{ item.licenseAlt }}</span>
                  </v-tooltip>
                </v-col>
            </v-row>
          </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import BookDetails from "./BookDetails";
import {createWidgetMixin} from "vue-instantsearch";

const connectSearchMetaData = (renderFn, unmountFn) => () => ({
  init() {
    renderFn({ searchMetadata: {} }, true);
  },

  render({ searchMetadata }) {
    renderFn({ searchMetadata }, false);
  },

  dispose() {
    unmountFn();
  },
});

export default {
  name: "book-card",
  components: {
    BookDetails
  },
  mixins: [createWidgetMixin({ connector: connectSearchMetaData })],
  props: ["item"],
  data() {
    return {
      h5pActivitiesImage: this.$store.state.config.imagesPath + this.$store.state.config.h5pLogo,
      basedOnImg: this.$store.state.config.imagesPath + this.$store.state.config.basedOnImg,
      originalImg: this.$store.state.config.imagesPath + this.$store.state.config.originalImg,
      inCatalogColor: 'red lighten-4',
      normalColor: 'white',
      defaultImage: this.$store.state.config.imagesPath + this.$store.state.config.defaultBookCover
    };
  },
  methods: {
    addClasses(item) {
      let classes = 'ais-Hits__books-book ';
      if(item.has_inCatalog && item.inCatalog) {
        classes += 'ais-Hits__books--border';
      } else {
        classes += 'ais-Hits__books--notcatalog';
      }
      if(item.license_name.indexOf('All Rights Reserved') >= 0) {
        classes += ' ais-Hits__books--allrights';
      }
      return classes;
    }
  }
};
</script>