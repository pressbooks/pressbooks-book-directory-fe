<template>
  <excluded-filters
    field="publisher_name"
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
