<template>
  <excluded-filters
    field="publisherName"
    :searchable="true"
    title="publisher"
    :limit="10"
  />
</template>

<script>
import ExcludedFilters from './commons/ExcludedFilters';
export default {
  name: 'Publishers',
  components: {ExcludedFilters}
};
</script>
