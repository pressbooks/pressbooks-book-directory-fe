<template>
  <excluded-filters
    field="licenseCode"
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
