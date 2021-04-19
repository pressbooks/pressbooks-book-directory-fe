<template>
  <v-container
    v-if="$store.state[storeName][storeProperty].length > 4"
    :id="'special-header-' + storeName"
    :class="'pa-0 specialheader ' + 'specialheader--' + storeName"
  >
    <h2>{{ title }}</h2>
    <v-row
      v-if="$vuetify.breakpoint.width > 1264"
      no-gutters
      justify="center"
    >
      <v-col
        class="offset-1 ml-auto specialheader--col"
        :lg="2"
      >
        <specials-book-card :card="$store.state[storeName][storeProperty][0]" />
      </v-col>
      <v-col
        v-for="(card, n) in $store.state[storeName][storeProperty].slice(1, 5)"
        :key="n"
        :lg="2"
        class="ml-auto specialheader--col"
      >
        <specials-book-card :card="card" />
      </v-col>
    </v-row>
    <v-row
      v-else
      no-gutters
    >
      <v-col
        :lg="7"
        :md="12"
        :sm="12"
      >
        <v-container class="pa-0">
          <v-row
            no-gutters
          >
            <v-col
              v-for="(card, n) in $store.state[storeName][storeProperty].slice(1, 4)"
              :key="n"
              :lg="4"
            >
              <specials-book-card :card="card" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col
        :lg="5"
        :md="12"
        :sm="12"
      >
        <v-container class="pa-0">
          <v-row
            no-gutters
            justify="center"
          >
            <v-col
              v-for="(card, n) in $store.state[storeName][storeProperty].slice(3, 5)"
              :key="n"
              :lg="6"
              :md="4"
              :sm="4"
            >
              <specials-book-card :card="card" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SpecialsBookCard from './SpecialsBookCard';

export default {
  name: 'SpecialsHeader',
  components: {SpecialsBookCard},
  props: {
    title: {
      type: String,
      default: ''
    },
    storeName: {
      type: String,
      default: ''
    },
    storeProperty: {
      type: String,
      default: ''
    },
    storeAction: {
      type: String,
      default: ''
    },
  },
  mounted() {
    let index = this.$store.state.SClient.searchClient.initIndex(this.$store.state.SClient.indexName);
    this.$store.dispatch(this.storeAction, index);
  }
};
</script>