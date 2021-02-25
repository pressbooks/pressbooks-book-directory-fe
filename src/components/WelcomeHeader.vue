<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.numberOfBooksIndexed }}</strong> books published across
      <strong>{{ $store.state.stats.numberOfNetworksIndexed }}</strong> Pressbooks networks. Learn more about how the directory
      works by <a href="https://networkmanagerguide.pressbooks.com/chapter/how-to-use-the-pressbooks-directory/">reading our guide</a>
      or taking the self-guided tour below.
    </p>
    <v-btn
      class="directory-tour"
      aria-label="Take the tour"
      @click="$store.commit('showTour')"
    >
      Take the tour
    </v-btn>
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