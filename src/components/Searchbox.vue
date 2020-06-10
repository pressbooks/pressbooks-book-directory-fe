<template>
    <ais-search-box
        placeholder="Search here…"
        submit-title="Search"
        class="searchbox"
    >
        <div slot-scope="{ refine }">
            <v-row align="center">
                <v-col cols="3">
                    <p class="headerwelcome_red-font-pressbooks display-1 font-weight-bold">
                        FIND A BOOK
                    </p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="search"
                        v-model="stringSearch"
                        label="Search all book metadata"
                        @input="enableFilters(refine, stringSearch)"
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
                if (currentRefinement.length > 3) {
                    refine(currentRefinement);
                    this.$store.state.config.canFilter = currentRefinement.length > 3;
                }
            },
        }
    }
</script>