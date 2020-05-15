<template>
  <div class="search-panel__filters">
    <h5>Find a book</h5>
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
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#network" role="tab" aria-controls="home" aria-selected="true">
                Network filters
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#properties" role="tab" aria-controls="profile" aria-selected="false">
                Book Properties
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#language" role="tab" aria-controls="contact" aria-selected="false">
                Language and Subject
            </a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="network" role="tabpanel" aria-labelledby="home-tab">

        </div>
        <div class="tab-pane fade" id="properties" role="tabpanel" aria-labelledby="profile-tab">
            <book-properties></book-properties>
        </div>
        <div class="tab-pane fade" id="language" role="tabpanel" aria-labelledby="contact-tab">
            <ais-refinement-list attribute="inLanguage" :searchable="false" />
        </div>
    </div>
    <button type="button" class="btn btn-primary" @click.prevent="applyFilters">Apply Filters</button>
  </div>
</template>

<script>

import BookProperties from "./BookProperties";

export default {
    components: {
        BookProperties
    },
    methods: {
        applyFilters() {
            let filters = [], item = {};
            for (let attribute in this.$store.state.SClient.filtersApplied) {
                item = {};
                item[attribute] = this.$store.state.SClient.filtersApplied[attribute];
                filters.push({
                    attribute: attribute,
                    item: item
                });
            }
            this.$store.dispatch('applyFilters', filters);
        }
    },
    name: "filters"
};
</script>
