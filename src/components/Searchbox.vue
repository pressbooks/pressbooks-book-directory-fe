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
                    md="2"
                >
                    <h2 class="ais-SearchBox__text">Find a book:</h2>
                </v-col>
                <v-col
                    md="9"
                    cols="12"
                >
                    <v-text-field
                        type="search"
                        v-model="stringSearch"
                        label="Search all book metadata"
                        id="search-book"
                    >
                        <v-icon slot="prepend">mdi-magnify</v-icon>
                    </v-text-field>
                </v-col>
                <v-col
                    md="1"
                    cols="12"
                    align="center"
                >
                    <v-btn type="submit" id="search-button">Search</v-btn>
                </v-col>
            </v-row>
        </v-form>
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