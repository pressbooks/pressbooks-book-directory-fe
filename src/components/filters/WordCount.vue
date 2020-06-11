<template>
    <v-list-group value="true">
        <template v-slot:activator>
            <v-list-item-title>WORDS</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <ais-range-input attribute="wordCount">
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
                                    v-model="wordCount.min"
                                    :min="0"
                                    :max="wordCount.max"
                                    @input="applyFilter(refine, range)"
                                    label="Min"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    id="max-wc"
                                    v-model="wordCount.max"
                                    :min="wordCount.min"
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
        name: "WordCount",
        data() {
            return {
                wordCount: {
                    min: 0,
                    max: 0
                }
            };
        },
        methods: {
            applyFilter(refine, range) {
                if (this.wordCount.min > this.wordCount.max) {
                    if (this.wordCount.max == 0) {
                        refine({min: this.wordCount.min, max: range.max});
                        return;
                    }
                    this.wordCount.max = this.wordCount.min + 1;
                }
                refine({min: this.wordCount.min, max: this.wordCount.max});
            }
        }
    }
</script>