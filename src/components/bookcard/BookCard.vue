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
            <v-img max-width="86" max-height="150" class="d-inline-block" :src="item.image"></v-img>
          </v-col>
          <v-col cols="12" class="v-avatar__details">
            <span class="v-avatar__details--language">{{item.languageCode}}</span>
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
  props: ["item"]
};
</script>
