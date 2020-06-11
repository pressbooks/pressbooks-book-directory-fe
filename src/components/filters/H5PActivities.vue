<template>
    <v-list-group value="true">
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
                                    id="min-wc"
                                    v-model="activities.min"
                                    :min="0"
                                    :max="activities.max"
                                    @input="applyFilter(refine, range)"
                                    label="Min"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    id="max-wc"
                                    v-model="activities.max"
                                    :min="activities.min"
                                    :max="range.max"
                                    @input="applyFilter(refine, range)"
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
            applyFilter(refine, range) {
                if (this.activities.min > this.activities.max) {
                    if (this.activities.max == 0) {
                        refine({min: this.activities.min, max: range.max});
                        return;
                    }
                    this.activities.max = this.activities.min + 1;
                }
                refine({min: this.activities.min, max: this.activities.max});
            }
        }
    }
</script>

<style scoped>

</style>