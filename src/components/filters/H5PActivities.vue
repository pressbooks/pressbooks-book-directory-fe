<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <numeric-filters
    title="H5P Activities"
    field="h5pActivities"
  />
</template>

<script>
import NumericFilters from './commons/NumericFilters';
export default {
  name: 'H5PActivities',
  components: {NumericFilters}
};
</script>