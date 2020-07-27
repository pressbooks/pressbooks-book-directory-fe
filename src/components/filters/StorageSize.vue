<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <numeric-filters title="Storage size" field="storageSize"></numeric-filters>
</template>

<script>
    import NumericFilters from "./commons/NumericFilters";
    export default {
        name: "StorageSize",
        components: {NumericFilters}
    }
</script>