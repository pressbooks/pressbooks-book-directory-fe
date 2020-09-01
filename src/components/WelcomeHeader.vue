<template>
  <v-container class="welcome-header">
    <h1>Welcome to Pressbooks Directory</h1>
    <p>
      This directory provides an index of <strong>{{ $store.state.stats.totalBooks }}</strong> public books
      published across <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks networks. Find books
      of interest by searching, applying filters, or simply browsing the book cards below. [How to use the site.]
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