<template>
  <div class="search-panel__filters">
    <h3>Find a book</h3>
    <ais-search-box
        placeholder="Search here…"
        submit-title="Search"
        class="searchbox"
    >
        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
            <form @submit.prevent="refine(currentRefinement)" class="ais-SearchBox-form">
                <input
                    type="search"
                    class="ais-SearchBox-input"
                    v-model="currentRefinement"
                />
                <div slot="submit-icon">
                    <button type="submit" class="btn submit-btn">Search</button>
                </div>
            </form>
        </div>
    </ais-search-box>
    <ais-current-refinements />
    <h3>Languages</h3>
    <ais-refinement-list attribute="inLanguage" :searchable="false" />
    <h3>Licenses</h3>
    <ais-refinement-list attribute="license_name" :searchable="false" />
  </div>
</template>

<script>
export default {
  name: "filters"
};
</script>
