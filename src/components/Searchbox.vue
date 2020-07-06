<template>
    <ais-search-box class="searchbox" v-slot="{ refine }">
        <h2 class="ais-SearchBox__text">Find a book:</h2>
        <v-text-field
                type="search"
                v-model="stringSearch"
                label="Search all book metadata"
                @input="enableFilters(refine, stringSearch)"
        >
            <v-icon slot="append">mdi-magnify</v-icon>
        </v-text-field>
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