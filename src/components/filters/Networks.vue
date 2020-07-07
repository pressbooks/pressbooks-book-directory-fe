<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <searchable-filter field="networkName" title="network"></searchable-filter>
</template>

<script>
    import SearchableFilter from "./commons/SearchableFilter";
    export default {
        name: "Networks",
        components: {SearchableFilter}
    }
</script>