<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
        id="filter-basedOn"
    >
        <template v-slot:activator>
            <v-list-item-title>BASED ON</v-list-item-title>
        </template>
        <v-list-item>
            <v-list-item-content
                :class="(wasFiltered('has_isBasedOn', false, false) || wasFiltered('has_isBasedOn', true, false)) ? 'v-list-item__content--filtered' : ''"
            >
                Based on another book
            </v-list-item-content>
            <v-list-item-action id="isBasedOn-another">
                <div>
                    <v-btn
                        icon
                        :id="'btn-include-based-another'"
                        @click="applyFilter(true, false)"
                        :disabled="wasFiltered(true, false)"
                    >
                        <v-icon color="green">mdi-check</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        :id="'btn-exclude-based-another'"
                        @click="applyFilter(true, true)"
                        :disabled="wasFiltered(true, true)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-list-item-action>
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "BasedOn",
        data() {
            return {
                excluded: false,
                field: 'has_isBasedOn'
            };
        },
        methods: {
            applyFilter(itemValue, exclude) {
                let query = {...this.$route.query}, value;
                let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
                value = exclude ? '-' + itemValue : itemValue;
                query[attribute] = value;
                this.$router.replace({ query });
            },
            wasFiltered(value, exc) {
                return typeof(this.$store.state.SClient.filtersExcluded['has_isBasedOn']) !== 'undefined' &&
                    this.$store.state.SClient.filtersExcluded['has_isBasedOn'].find(v => v.value === value && v.exclude === exc) !== undefined;
            }
        }
    }
</script>