<template>
    <v-list-group value="true">
        <template v-slot:activator>
            <v-list-item-title>STORAGE SIZE</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <ais-range-input attribute="storageSize">
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
                                    v-model="storage.min"
                                    :min="0"
                                    :max="storage.max"
                                    @input="applyFilter(refine, range)"
                                    label="Min"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    id="max-wc"
                                    v-model="storage.max"
                                    :min="storage.min"
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
        name: "StorageSize",
        data() {
            return {
                storage: {
                    min: 0,
                    max: 0
                }
            };
        },
        methods: {
            applyFilter(refine, range) {
                if (this.storage.min > this.storage.max) {
                    if (this.storage.max == 0) {
                        refine({min: this.storage.min, max: range.max});
                        return;
                    }
                    this.storage.max = this.storage.min + 1;
                }
                refine({min: this.storage.min, max: this.storage.max});
            }
        }
    }
</script>