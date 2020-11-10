<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.totalBooks }}</strong> books published across
      <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks networks. Search and filter books by keyword,
      subject matter, license, and more.
    </p>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="additionalText"
      v-html="additionalText"
    />
    <!--eslint-enable-->
    <searchbox />
  </v-container>
</template>

<script>
import Searchbox from './Searchbox';
export default {
  name: 'WelcomeHeader',
  components: {Searchbox},
  data() {
    return {
      additionalText: (process.env.VUE_APP_HEADER_ADDITIONAL_TEXT) ? process.env.VUE_APP_HEADER_ADDITIONAL_TEXT : false
    };
  }
};
</script>