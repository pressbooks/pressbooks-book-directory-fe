<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.totalBooks }}</strong> books published across
      <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks networks. Search and filter books by keyword,
      subject matter, license, and more. See
      <a href="https://networkmanagerguide.pressbooks.com/chapter/how-to-use-the-pressbooks-directory/">our guide for
        more detailed instructions</a> on using the Pressbooks Directory to find books of interest.
    </p>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="additionalText"
      v-html="additionalText"
    />
    <!--eslint-enable-->
    <featured-books v-if="$vuetify.breakpoint.width > 700" />
    <searchbox />
  </v-container>
</template>

<script>
import Searchbox from './Searchbox';
import FeaturedBooks from './FeaturedBooks';

export default {
  name: 'WelcomeHeader',
  components: {Searchbox, FeaturedBooks},

  data() {
    return {
      additionalText: (process.env.VUE_APP_HEADER_ADDITIONAL_TEXT) ? process.env.VUE_APP_HEADER_ADDITIONAL_TEXT : false
    };
  }
};
</script>