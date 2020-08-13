<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <date-range-filters
    title="Last modified"
    field="lastModified"
  />
</template>

<script>
import DateRangeFilters from '@/components/filters/commons/DateRangeFilters';

export default {
    name: 'LastModified',
    components: {DateRangeFilters}
};
</script>