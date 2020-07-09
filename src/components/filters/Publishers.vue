<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <searchable-filter field="publisher_name" title="publisher"></searchable-filter>
</template>

<script>
    import SearchableFilter from "./commons/SearchableFilter";
    export default {
        name: "Publishers",
        components: {SearchableFilter},
    }
</script>
