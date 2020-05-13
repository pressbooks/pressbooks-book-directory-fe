<template>
    <div class="search-panel__filters">
        <ais-current-refinements />
        <h3>Languages</h3>
        <ais-refinement-list attribute="inLanguage" :searchable="false" />
        <h3>Licenses</h3>
        <ais-refinement-list attribute="license_name" :searchable="false" />
    </div>
</template>

<script>
    export default {
        name: 'filters'
    }
</script>