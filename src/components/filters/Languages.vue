<template>
  <excluded-filters
    field="languageName"
    :searchable="true"
    title="language"
    :limit="10"
  />
</template>

<script>
import ExcludedFilters from './commons/ExcludedFilters';
export default {
    name: 'LanguageSubject',
    components: {ExcludedFilters}
};
</script>
