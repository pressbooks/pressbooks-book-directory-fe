<template>
    <ais-search-box
        class="searchbox"
    >
        <div slot-scope="{ refine }" id="slotsearch">
            <v-row align="center">
                <v-col cols="12" md="3" sm="12">
                    <p class="ais-SearchBox__text font-weight-bold text-center">
                        FIND A BOOK
                    </p>
                </v-col>
                <v-col cols="12"  md="9" sm="12">
                    <v-text-field
                        type="search"
                        v-model="stringSearch"
                        label="Search all book metadata"
                        @input="enableFilters(refine, stringSearch)"
                        id="search-input"
                    >
                        <v-icon slot="append" color="red">mdi-magnify</v-icon>
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
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