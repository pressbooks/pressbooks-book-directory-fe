<template>
    <v-list-group value="true">
        <template v-slot:activator>
            <v-list-item-title>WORDS</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                id="min-wc"
                                min="1"
                                v-model="wordCount.min"
                                @input="
                                  updateRangeInput('wordCount', wordCount.min, wordCount.max)
                                "
                                label="Min"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                id="max-wc"
                                min="1"
                                v-model="wordCount.max"
                                @input="
                                  updateRangeInput('wordCount', wordCount.min, wordCount.max)
                                "
                                label="Max"
                            />
                        </v-col>
                    </v-row>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "WordCount",
        data() {
            return {
                wordCount: {
                    min: null,
                    max: null
                }
            };
        },
        methods: {
            updateRangeInput(attribute, min, max) {
                delete this.$store.state.SClient.filtersApplied[attribute];
                if (min !== "" && parseInt(min) > 0) {
                    this.$store.commit("setFiltersApplied", {
                        value: min,
                        attribute: attribute,
                        operator: ">"
                    });
                }
                if (max !== "" && parseInt(max) > 0) {
                    this.$store.commit("setFiltersApplied", {
                        value: max,
                        attribute: attribute,
                        operator: "<="
                    });
                }
                this.$store.dispatch("refreshFilters");
            }
        }
    }
</script>