<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <excluded-filters
    title="Collection"
    field="collections"
    :searchable="false"
    :limit="10"
  />
</template>

<script>
import ExcludedFilters from './commons/ExcludedFilters';
export default {
  name: 'CollectionsFilter',
  components: {ExcludedFilters}
};
</script>
