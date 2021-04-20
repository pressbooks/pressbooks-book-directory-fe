<template>
  <pb-selectable-filters
    title="License"
    :searchable="false"
  />
</template>
<script>
import PbSelectableFilters from './PbSelectableFilters.vue';
export default {
  name: 'PbFilters',
  components: {
    PbSelectableFilters
  }
};
</script>