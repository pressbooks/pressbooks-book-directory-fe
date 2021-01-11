<template>
<div>
  <v-row>
    <v-col v-for="index in limit" :key="index">
      <v-card class="welcome-header--featuredbook--image">
        <book-cover image="https://pressbooks.palni.org/brasstechniquesandpedagogy/wp-content/uploads/sites/4/2020/07/Book-cover-350x525.jpg"></book-cover>
        <v-card-title>Fake title Fake title Fake titleFake titleFake titleFake titleFake titleFake titleFake title</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import BookCover from './commons/BookCover';

export default {
  name: 'FeaturedBooks',
  components: {BookCover},
  data() {
    return {
      limit: 5
    };
  }
};
</script>