<template>
  <v-toolbar dense max-height="70px" min-height="70px">
    <v-img
      :src="logo"
      max-height="130"
      max-width="150"
      class="mt-5"
    ></v-img>
    <v-spacer></v-spacer>
    <v-btn class="mt-5" icon :href="twitterUrl">
      <v-icon color="#015d75">mdi-twitter</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "header-bar",
  data() {
    return {
      logo: this.$store.state.config.imagesPath + this.$store.state.config.logo,
      twitterUrl: this.$store.state.config.twitterUrl
    }
  }
};
</script>
