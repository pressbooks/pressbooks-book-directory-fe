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
    <ais-current-refinements>
        <template slot="item" slot-scope="{ item, refine, createURL }">
            <button type="button" class="btn btn-primary btn-sm btn-current-filters" @click.prevent="deleteFilter(item)">
                {{ item.attribute }} : {{item.label}} <span class="badge badge-light">x</span>
            </button>
        </template>
    </ais-current-refinements>
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
            <language-subject></language-subject>
        </div>
    </div>
    <button type="button" class="btn btn-sm btn-primary pull-right" @click.prevent="applyFilters">Filter</button>
  </div>
</template>

<script>

import BookProperties from "./BookProperties";
import LanguageSubject from "./LanguageSubject";

export default {
    components: {
        BookProperties,
        LanguageSubject
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
        },
        deleteFilter(item) {
            let keyToDelete = 0;
            if (this.$store.state.SClient.filtersApplied[item.attribute].length === 1) {
                delete this.$store.state.SClient.filtersApplied[item.attribute];
            } else {
                this.$store.state.SClient.filtersApplied[item.attribute].forEach((f, k) => {
                    if (f.value == item.label) {
                        keyToDelete = k;
                    }
                });
                this.$store.state.SClient.filtersApplied[item.attribute].splice(keyToDelete, 1);
            }
            this.applyFilters();
        }
    },
    name: "filters"
};
</script>
