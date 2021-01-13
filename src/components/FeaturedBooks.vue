<template>
<v-container class="pa-0">
  <v-row no-gutters>
    <v-col :lg="7" :md="12" :sm="12">
      <v-container class="pa-0">
        <v-row no-gutters justify="center">
          <v-col v-for="(featuredBook, n) in fakeBooks.slice(0, 3)" :key="n" :lg="4">
            <v-card class="welcome-header--featuredbook--image" :elevation="0">
              <book-cover :image="featuredBook.image"></book-cover>
              <v-card-title class="v-card__title--featuredbook">
                <a
                  :href="featuredBook.url"
                  target="_blank"
                >
                  {{truncateTitle(featuredBook.title)}}
                </a>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col :lg="5" :md="12" :sm="12">
      <v-container class="pa-0">
        <v-row no-gutters justify="center">
          <v-col v-for="(featuredBook, n) in fakeBooks.slice(3, 5)" :key="n" :lg="6" :md="4" :sm="4">
            <v-card class="welcome-header--featuredbook--image" :elevation="0">
              <book-cover :image="featuredBook.image"></book-cover>
              <v-card-title class="v-card__title--featuredbook">
                <a
                  :href="featuredBook.url"
                  target="_blank"
                >
                  {{truncateTitle(featuredBook.title)}}
                </a>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import BookCover from './commons/BookCover';

export default {
  name: 'FeaturedBooks',
  components: {BookCover},
  data() {
    return {
      truncateLimit: 35,
      fakeBooks: [
        {
          title: 'Basic Kitchen and Food Service Management',
          image: 'https://pressbooks.bccampus.ca/knowinghome/wp-content/uploads/sites/621/2019/01/OTB091-01-basic-kitchen-and-food-service-management-2018-COVER-STORE.jpg',
          url: 'https://opentextbc.ca/basickitchenandfoodservicemanagement/'
        },
        {
          title: 'Answer Guide',
          image: 'https://opentextbc.ca/faqs/wp-content/uploads/sites/252/2019/09/OpenTextbook_Cover-AnswerGuide.jpg',
          url: 'https://opentextbc.ca/faqs/'
        },
        {
          title: 'BC Reads: Adult Literacy Fundamental English - Course Pack 5',
          image: 'https://opentextbc.ca/abealf5/wp-content/uploads/sites/86/2020/10/OTB085-01-bc-reads-adult-literacy-fundamental-english-CP5-2018-COVER-STORE.jpg',
          url: 'https://opentextbc.ca/abealf6/'
        },
        {
          title: 'British Columbia in a Global Context',
          image: 'https://pressbooks.bccampus.ca/commonsensecomp/wp-content/uploads/sites/870/2020/02/Building-Blocks-of-Academic-Writing-COVER-STORE.jpg',
          url: 'https://pressbooks.bccampus.ca/geographyofbc/'
        },
        {
          title: 'Clinical Procedures for Safer Patient Care',
          image: 'https://opentextbc.ca/clinicalskills/wp-content/uploads/sites/82/2020/01/OTB099-01-CLINICAL-PROCEDURES-2018-COVER-STORE.jpg',
          url: 'https://opentextbc.ca/clinicalskills/'
        }
      ]
    };
  },
  methods: {
    truncateTitle(title) {
      return title.length > this.truncateLimit ? title.substr(0, this.truncateLimit - 1) + '...' : title;
    }
  }
};
</script>