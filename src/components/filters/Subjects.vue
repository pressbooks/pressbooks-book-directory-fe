<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <excluded-filters
    title="subject"
    field="about"
    :searchable="true"
    :limit="10"
  />
</template>

<script>
import ExcludedFilters from './commons/ExcludedFilters';
export default {
    name: 'Subjects',
    components: {ExcludedFilters}
};
</script>
