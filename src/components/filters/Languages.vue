<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <searchable-filter field="languageName" title="language"></searchable-filter>
</template>

<script>
    import SearchableFilter from "./commons/SearchableFilter";
    export default {
      name: "language-subject",
      components: {SearchableFilter},
    };
</script>
