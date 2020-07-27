<template>
  <excluded-filters
      field="languageName"
      :searchable="true"
      title="language"
      :limit="10"
  ></excluded-filters>
</template>

<script>
  import ExcludedFilters from "./commons/ExcludedFilters";
  export default {
    name: "language-subject",
    components: {ExcludedFilters}
  }
</script>
