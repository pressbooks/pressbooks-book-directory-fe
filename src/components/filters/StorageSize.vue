<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
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
                                    @input="applyFilter(refine)"
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
            applyFilter(refine) {
                let min = this.storage.min * 1024 * 1024;
                let max = this.storage.max * 1024 * 1024;
                if (this.storage.min > this.storage.max) {
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
                    if (typeof(newClient.filtersClosed.storageSize) !== 'undefined') {
                        newClient.filtersClosed.storageSize.forEach((filter, index) => {
                            if(filter.operator === '>=') {
                                this.storage.min = 0;
                            } else {
                                this.storage.max = 0;
                            }
                            this.$store.state.SClient.filtersClosed.storageSize.splice(index, 1);
                            if (this.$store.state.SClient.filtersClosed.storageSize.length === 0) {
                                delete this.$store.state.SClient.filtersClosed.storageSize;
                            }
                        });
                    }
                }
            }
        }
    }
</script>