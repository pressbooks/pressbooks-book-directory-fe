<template>
  <v-toolbar class="toolbar">
      <a href="https://pressbooks.com" target="_blank">
          <v-img
                :src="logo"
                class="logo"
          ></v-img>
      </a>
      <v-btn icon :href="twitterUrl">
        <v-icon>mdi-twitter</v-icon>
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