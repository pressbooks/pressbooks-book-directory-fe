<template>
  <v-card
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
            <span class="v-avatar__details--language">{{item.languageCode}}</span>
            <v-img
              max-height="18"
              max-width="50"
              class="ml-2"
              :alt="licenseIcon(item).alt"
              :src="licenseIcon(item).image"
            ></v-img>
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
