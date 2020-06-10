<template>
    <v-container class="mt-2 ml-5">
        <v-row>
            <v-col>
                <div class="float-left headerwelcome_red-font-pressbooks font-weight-bold">
                    Active Filters:
                </div>
                <ais-current-refinements>
                    <template slot="item" slot-scope="{ item }">
                        <v-chip
                            class="ma-2"
                            color="#169db3"
                            text-color="white"
                            label="true"
                            @click.prevent="deleteFilter(item)"
                            small
                        >
                            {{ item.label }}
                            <v-icon right>mdi-close-circle</v-icon>
                        </v-chip>
                    </template>
                </ais-current-refinements>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "CurrentFilters",
        methods: {
            deleteFilter(item) {
                let keyToDelete = 0;
                if (
                    this.$store.state.SClient.filtersApplied[item.attribute].length === 1
                ) {
                    delete this.$store.state.SClient.filtersApplied[item.attribute];
                } else {
                    this.$store.state.SClient.filtersApplied[item.attribute].forEach(
                        (f, k) => {
                            if (f.value == item.label) {
                                keyToDelete = k;
                            }
                        }
                    );
                    this.$store.state.SClient.filtersApplied[item.attribute].splice(
                        keyToDelete,
                        1
                    );
                }
                this.$store.dispatch("refreshFilters");
            }
        }
    }
</script>