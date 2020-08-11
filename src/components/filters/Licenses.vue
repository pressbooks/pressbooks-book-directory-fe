<template>
  <excluded-filters
    field="license_code"
    :searchable="false"
    title="license"
    :limit="20"
  />
</template>

<script>
import ExcludedFilters from './commons/ExcludedFilters';
export default {
    name: 'Licenses',
    components: {ExcludedFilters}
};
</script>
