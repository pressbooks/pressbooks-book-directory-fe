<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <numeric-filters
    title="word count"
    field="wordCount"
  />
</template>

<script>
import NumericFilters from './commons/NumericFilters';
export default {
  name: 'WordCount',
  components: {NumericFilters}
};
</script>