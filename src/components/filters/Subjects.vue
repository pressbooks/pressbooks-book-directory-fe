<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <searchable-filter title="subject" field="about"></searchable-filter>
</template>

<script>
    import SearchableFilter from "./commons/SearchableFilter";
    export default {
        name: "Subjects",
        components: {SearchableFilter}
    }
</script>
