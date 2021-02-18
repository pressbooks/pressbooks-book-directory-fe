<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.numberOfBooksIndexed }}</strong> books published across
      <strong>{{ $store.state.stats.numberOfNetworksIndexed }}</strong> Pressbooks networks. Search and filter books by keyword,
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
    <collections v-if="$vuetify.breakpoint.width > 700" />
    <searchbox />
  </v-container>
</template>

<script>
import Searchbox from './Searchbox';
import Collections from './additionalCards/Collections';

export default {
  name: 'WelcomeHeader',
  components: {Collections, Searchbox},
  data() {
    return {
      additionalText: (process.env.VUE_APP_HEADER_ADDITIONAL_TEXT) ? process.env.VUE_APP_HEADER_ADDITIONAL_TEXT : false,
      totalBooks: false,
      totalNetworks: false
    };
  }
};
</script>