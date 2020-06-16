<template>
    <v-list-group value="true">
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
                :class="item.isRefined ? 'red darken-4' : ''"
            >
                <v-list-item-action @click.prevent="refine(item.value)">
                    <v-checkbox
                        v-if="item.value == 'true'"
                        color="white"
                        v-model="item.isRefined"
                        :label="'Based on another book (' + item.count + ')'"
                    ></v-checkbox>
                    <v-checkbox
                        v-if="item.value == 'false'"
                        color="white"
                        v-model="item.isRefined"
                        :label="'Original (' + item.count + ')'"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
        <ais-clear-refinements  :included-attributes="['has_isBasedOn']">
            <div slot-scope="{ canRefine, refine }">
                <v-btn
                    color="white"
                    width="150"
                    tile
                    @click.prevent="refine()"
                >
                    CLEAR
                </v-btn>
            </div>
        </ais-clear-refinements>
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