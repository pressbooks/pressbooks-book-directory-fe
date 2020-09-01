<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.totalBooks }}</strong> public books
      published across <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks networks. Find books
      of interest by searching, applying filters, or simply browsing the book cards below.
    </p>
    <p>
      <b>Note:</b> The site you are now viewing is a beta version of the directory. Functionality and content on this
      site is subject to change before the final release of the directory. To provide feedback on your experience using
      the beta to find books of interest, please use <a href="https://forms.gle/SH2TwGttNnJcY7x49" target="_blank">this form</a>.
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