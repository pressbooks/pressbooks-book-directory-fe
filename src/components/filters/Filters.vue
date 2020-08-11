<template>
  <div
    v-if="$store.state.config.canFilter"
    class="search-panel__filters"
  >
    <v-list dense>
      <licenses />
      <subjects />
      <based-on />
      <word-count />
      <h5-p-activities />
      <networks />
      <languages />
      <publishers />
      <storage-size />
    </v-list>
  </div>
</template>

<script>
import Languages from './Languages';
import Licenses from './Licenses';
import Subjects from './Subjects';
import BasedOn from './BasedOn';
import WordCount from './WordCount';
import H5PActivities from './H5PActivities';
import Publishers from './Publishers';
import StorageSize from './StorageSize';
import Networks from './Networks';

export default {
    name: 'Filters',
    components: {
        Networks,
        StorageSize,
        Publishers,
        H5PActivities,
        WordCount,
        BasedOn,
        Subjects,
        Licenses,
        Languages
    },
    methods: {
        applyFilters() {
            this.$store.dispatch('refreshFilters');
        }
    }
};
</script>
