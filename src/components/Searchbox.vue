<template>
    <ais-search-box
            class="searchbox"
            v-slot="{ refine }"
    >
        <v-form @submit.prevent="enableFilters(refine, stringSearch)">
            <v-row
                justify="space-between"
            >
                <v-col
                    cols="12"
                    md="11"
                    sm="12"
                >
                    <h2 class="ais-SearchBox__text">Find a book:</h2>
                    <v-text-field
                            type="search"
                            v-model="stringSearch"
                            label="Search all book metadata"
                    >
                        <v-icon slot="prepend">mdi-magnify</v-icon>
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="1"
                    sm="12"
                >
                    <v-btn type="submit" id="search-button">Search</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <a href="https://www.algolia.com/" aria-label="Search by Algolia" target="_blank" class="filters__stats-algolia-logo"> </a>
    </ais-search-box>
</template>

<script>
    export default {
        name: "Searchbox",
        data() {
            return {
                stringSearch: ""
            };
        },
        methods: {
            enableFilters(refine, currentRefinement) {
                if (currentRefinement.length > 3 || currentRefinement.length === 0) {
                    refine(currentRefinement);
                }
            },
        }
    }
</script>