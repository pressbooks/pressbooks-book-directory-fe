<template>
    <excluded-filters
        field="networkName"
        :searchable="true"
        title="network"
        :limit="10"
    ></excluded-filters>
</template>

<script>
    import ExcludedFilters from "./commons/ExcludedFilters";
    export default {
        name: "Networks",
        components: {ExcludedFilters}
    }
</script>