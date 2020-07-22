<template>
    <excluded-filters field="license_name" :searchable="false" title="license"></excluded-filters>
</template>

<script>
    import ExcludedFilters from "./commons/ExcludedFilters";
    export default {
        name: "Licenses",
        components: {ExcludedFilters}
    }
</script>
