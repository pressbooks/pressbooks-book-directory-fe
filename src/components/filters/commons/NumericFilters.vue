<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
        :id="'filter-' + field"
    >
        <template v-slot:activator>
            <v-list-item-title>{{title | uppercase}}</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <v-form @submit.prevent="applyFilter">
                        <v-row>
                            <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    :id="'min-' + field"
                                    v-model="number.min"
                                    :min="0"
                                    label="Min"
                                />
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    :id="'max-' + field"
                                    v-model="number.max"
                                    :min="number.min"
                                    label="Max"
                                />
                            </v-col>
                            <v-col cols="4">
                                <v-btn :id="'btn-' + field" type="submit">Go</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <div class="ais-ClearRefinements">
                <v-btn
                    tile
                    @click="clearFilters()"
                    :id="'btn-clear-' + field"
                >
                    CLEAR
                </v-btn>
            </div>
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "numeric-filters",
        props: ['field', 'title'],
        filters: {
            uppercase: function(t) {
                return t.toUpperCase();
            }
        },
        data() {
            return {
                number: {
                    min: 0,
                    max: 0
                }
            };
        },
        methods: {
            clearFilters() {
                this.number.min = 0;
                this.number.max = 0;
                this.$store.commit('deleteExcluded', this.field);
            },
            applyFilter() {
                this.$store.commit('deleteExcluded', this.field);
                let min = this.number.min;
                let max = this.number.max;
                if (this.number.min > this.number.max) {
                    this.$store.commit(
                        'setFiltersExcluded',
                        {
                            attribute: this.field,
                            value: min,
                            operator: '>=',
                            exclude: false
                        }
                    );
                    return;
                }
                let range= {};
                if (min > 0) {
                    range.min = min;
                }
                if (max > 0) {
                    range.max = max;
                }
                this.$store.commit(
                    'setFiltersExcluded',
                    {
                        attribute: this.field,
                        value: min,
                        operator: '>=',
                        exclude: false
                    }
                );
                this.$store.commit(
                    'setFiltersExcluded',
                    {
                        attribute: this.field,
                        value: max,
                        operator: '<=',
                        exclude: false
                    }
                );
            }
        }
    }
</script>