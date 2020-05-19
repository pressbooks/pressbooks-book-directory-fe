<template>
    <v-card color="rgb(220, 223, 245)">
        <div class="d-flex flex-no-wrap justify-space-between">
            <v-row justify="space-between">
                <v-col cols="10">
                    <v-card-title class="headline">{{ item.name }}</v-card-title>
                    <v-card-subtitle>
                        <!--          <icons-filter :item="item"></icons-filter>-->
                        <book-details :item="item"></book-details>
                    </v-card-subtitle>
                </v-col>
                <v-col cols="2">
                    <v-avatar
                            class="ma-3"
                            height="100%"
                            max-height="350"
                            width="186"
                            tile
                    >
                        <v-img :src="item.image" ></v-img>
                    </v-avatar
                            class="ma-3">
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
import "../../App.css";
import IconsFilter from "./IconsFilter";
import BookDetails from "./BookDetails";

export default {
  name: "book-card",
  components: {
    BookDetails,
    IconsFilter
  },
  props: ["item"]
};
</script>
