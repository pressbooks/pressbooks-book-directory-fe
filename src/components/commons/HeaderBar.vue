<template>
  <v-toolbar class="toolbar">
    <a
      href="https://pressbooks.com"
      aria-label="Visit Pressbooks.com"
      target="_blank"
    >
      <v-img
        :src="logo"
        class="logo"
      />
    </a>
    <v-btn
      icon
      :href="twitterUrl"
      aria-label="Visit Pressbooks' Twitter account"
    >
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
    name: 'HeaderBar',
    data() {
        return {
            logo: this.$store.state.config.imagesPath + this.$store.state.config.logo,
            twitterUrl: this.$store.state.config.twitterUrl
        };
    }
};
</script>