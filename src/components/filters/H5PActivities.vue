<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>H5P ACTIVITIES</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <ais-range-input attribute="h5pActivities">
                        <v-row
                            slot-scope="{
                                currentRefinement,
                                range,
                                refine,
                            }"
                        >
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    id="min-h5pactivities"
                                    v-model="activities.min"
                                    :min="0"
                                    :max="activities.max"
                                    @input="applyFilter(refine)"
                                    label="Min"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    id="max-h5pactivities"
                                    v-model="activities.max"
                                    :min="activities.min"
                                    :max="range.max"
                                    @input="applyFilter(refine)"
                                    label="Max"
                                />
                            </v-col>
                        </v-row>
                    </ais-range-input>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "H5PActivities",
        data() {
            return {
                activities: {
                    min: 0,
                    max: 0
                }
            };
        },
        methods: {
            applyFilter(refine) {
                let min = this.activities.min;
                let max = this.activities.max;
                if (this.activities.min > this.activities.max) {
                    refine({min: min});
                    return;
                }
                let range= {};
                if (min > 0) {
                    range.min = min;
                }
                if (max > 0) {
                    range.max = max;
                }
                refine(range);
            }
        },
        watch: {
            '$store.state.SClient': {
                deep: true,
                handler(newClient) {
                    if (typeof(newClient.filtersClosed.h5pActivities) !== 'undefined') {
                        newClient.filtersClosed.h5pActivities.forEach((filter, index) => {
                            if(filter.operator === '>=') {
                                this.activities.min = 0;
                            } else {
                                this.activities.max = 0;
                            }
                            this.$store.state.SClient.filtersClosed.h5pActivities.splice(index, 1);
                            if (this.$store.state.SClient.filtersClosed.h5pActivities.length === 0) {
                                delete this.$store.state.SClient.filtersClosed.h5pActivities;
                            }
                        });
                    }
                }
            }
        }
    }
</script>
