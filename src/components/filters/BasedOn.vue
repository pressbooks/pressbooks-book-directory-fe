<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>BASED ON</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="has_isBasedOn"
            :searchable="false"
            operator="or"
        >
            <v-list-item
                slot="item"
                slot-scope="{ item, refine }"
            >
                <v-list-item-action @click.prevent="refine(item.value)">
                    <v-checkbox
                        v-if="item.value == 'true'"
                        v-model="item.isRefined"
                        :label="'Based on another book (' + item.count + ')'"
                    ></v-checkbox>
                    <v-checkbox
                        v-if="item.value == 'false'"
                        v-model="item.isRefined"
                        :label="'Original (' + item.count + ')'"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
        <v-list-item>
            <ais-clear-refinements  :included-attributes="['has_isBasedOn']">
                <div slot-scope="{ canRefine, refine }">
                    <v-btn
                        tile
                        @click.prevent="refine()"
                    >
                        CLEAR
                    </v-btn>
                </div>
            </ais-clear-refinements>
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "BasedOn",
        methods: {
            applyFilters(value, attribute, operator = ":") {
                this.$store.commit("setFiltersApplied", {
                    value: value,
                    attribute: attribute,
                    operator: operator
                });
                this.$store.dispatch("refreshFilters");
            }
        }
    }
</script>