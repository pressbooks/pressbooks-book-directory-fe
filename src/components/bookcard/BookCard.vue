<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card
    :class="addClasses(item)"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-row class="v-card__content">
        <v-col cols="9">
            <div class="network">{{ item.networkHost }}</div>
        <v-card-title class="headline">
          <a class="v-card__title--link" :href="item.url" target="_blank">{{ item.name }}</a>
        </v-card-title>
        <v-card-text>
          <book-details :item="item"></book-details>
        </v-card-text>
        </v-col>
        <v-col cols="3">
            <v-avatar class="v-card__book" tile>
            <v-row>
              <v-col cols="12">
                <v-img
                        max-width="126"
                        max-height="180"
                        class="d-inline-block"
                        :src="item.image"
                        :lazy-src="defaultImage"
                >
                  <template v-slot:placeholder>
                    <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                    >
                      <v-progress-circular indeterminate color="red darken-3"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="6" class="v-avatar__details">
                <div class="v-avatar__details--language">{{item.languageCode}}</div>
              </v-col>
              <v-col cols="6" class="v-avatar__details">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                            v-if="item.license_name.indexOf('All Rights Reserved') >= 0"
                            max-height="18"
                            max-width="18"
                            contain
                            class="ml-2 v-avatar__details--t2"
                            v-bind="attrs"
                            v-on="on"
                            :src="item.licenseIcon"
                    ></v-img>
                    <v-img
                            v-if="item.license_name.indexOf('All Rights Reserved') < 0"
                            max-height="18"
                            max-width="50"
                            class="ml-2 v-avatar__details--t2"
                            v-bind="attrs"
                            v-on="on"
                            :src="item.licenseIcon"
                    ></v-img>
                  </template>
                  <span>{{ item.licenseAlt }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6" class="v-avatar__details">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                            v-if="item.has_h5pActivities && item.h5pActivities > 0"
                            max-height="18"
                            max-width="50"
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                            :alt="'This book has ' + item.h5pActivities + ' H5P Activities'"
                            :src="h5pActivitiesImage"
                    ></v-img>
                  </template>
                  <span>This book has {{ item.h5pActivities }} H5P Activities </span>
                </v-tooltip>
              </v-col>
              <v-col cols="6" class="v-avatar__details">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                            v-if="item.has_isBasedOn"
                            max-height="22"
                            max-width="25"
                            class="ml-2 v-avatar__details--b4"
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
                            max-height="22"
                            max-width="25"
                            class="ml-2 v-avatar__details--b4"
                            v-bind="attrs"
                            v-on="on"
                            alt="This book is not based on another book"
                            :src="originalImg"
                    ></v-img>
                  </template>
                  <span>This book is not based on another book </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-avatar>
          </v-col>
        </v-row>
    </div>
  </v-card>
</template>

<script>
import BookDetails from "./BookDetails";

export default {
  name: "book-card",
  components: {
    BookDetails
  },
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
        classes += 'ais-Hits__books--redborder';
      } else {
        classes += 'ais-Hits__books--border';
      }
      if(item.license_name.indexOf('All Rights Reserved') >= 0) {
        classes += ' ais-Hits__books--redbackground';
      }
      return classes;
    }
  }
};
</script>
