<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.totalBooks }}</strong> books published across
      <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks networks. Search and filter books by keyword,
      subject matter, license, and more.
    </p>
    <p>
      <b>Note:</b> Pressbooks Directory is still in beta. Functionality and content on this site is subject to change.
      Tell us what you think by filling out our <a
        href="https://forms.gle/SH2TwGttNnJcY7x49"
        target="_blank"
      >
        feedback form</a>.
    </p>
    <searchbox />
  </v-container>
</template>

<script>
import Searchbox from './Searchbox';
export default {
  name: 'WelcomeHeader',
  components: {Searchbox}
};
</script>