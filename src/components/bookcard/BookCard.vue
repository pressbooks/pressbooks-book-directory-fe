<template>
  <v-card
    :class="(item.has_inCatalog && item.inCatalog) ? 'ais-Hits__books--redborder' : 'ais-Hits__books--border'"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="headline"
          v-text="item.name"
        ></v-card-title>

        <v-card-text>
          <book-details :item="item"></book-details>
        </v-card-text>
      </div>
      <v-avatar
        class="d-flex flex-no-wrap justify-space-between ma-3"
        height="80%"
        max-height="350"
        width="186"
        tile
      >
        <v-row>
          <v-col cols="12">
            <v-img max-width="126" max-height="180" class="d-inline-block" :src="item.image"></v-img>
          </v-col>
          <v-col cols="12" class="v-avatar__details">
            <span v-bind="attrs" v-on="on" class="v-avatar__details--language">{{item.languageCode}}</span>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  max-height="18"
                  max-width="50"
                  class="ml-2 v-avatar__details--t2"
                  v-bind="attrs"
                  v-on="on"
                  :alt="licenseIcon(item).alt"
                  :src="licenseIcon(item).image"
                ></v-img>
              </template>
              <span>{{ licenseIcon(item).alt }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" class="v-avatar__details">
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
      normalColor: 'white'
    };
  },
  methods: {
    licenseIcon(item) {
      if (item.license_name !== undefined) {
        let license = item.license_name;
        let img = {
          image:
            this.$store.state.config.imagesPath +
            "licenses/" +
              this.$store.state.config.licenseIcons["public-domain"].image,
          alt: this.$store.state.config.licenseIcons["public-domain"].alt
        };
        let lic = license
          .toLowerCase()
          .split(" ")
          .join("-");
        for (const key in this.$store.state.config.licenseIcons) {
          if (lic == key) {
            img = {
              image: this.$store.state.config.imagesPath + "licenses/" + this.$store.state.config.licenseIcons[key].image,
              alt: this.$store.state.config.licenseIcons[key].alt
            };
          }
        }
        return img;
      }
    }
  }
};
</script>
