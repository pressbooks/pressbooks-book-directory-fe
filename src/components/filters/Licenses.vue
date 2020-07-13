<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
        id="filter-licenses"
    >
        <template v-slot:activator>
            <v-list-item-title>LICENSE</v-list-item-title>
        </template>
        <template>
            <ais-refinement-list
                attribute="license_name"
                :searchable="false"
                operator="or"
                :limit="15"
                :sort-by="['name:asc']"
            >
                <div
                    slot-scope="{
                        items,
                        refine
                    }"
                >
                    <v-list-item
                        v-for="item in items" :key="item.value"
                    >
                        <v-list-item-content>
                            {{ cleanLicense(item) }}
                        </v-list-item-content>
                        <v-list-item-action
                            :id="item.value.split(' ').join('-').toLowerCase()"
                        >
                            <div>
                                <v-btn icon @click="applyFilter(refine, items, item.value, false)">
                                    <v-icon color="green">mdi-check</v-icon>
                                </v-btn>
                                <v-btn icon @click="applyFilter(refine, items, item.value, true)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </v-list-item-action>
                    </v-list-item>
                </div>
            </ais-refinement-list>
        </template>
        <v-list-item>
            <ais-clear-refinements  :included-attributes="['license_name']">
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
        name: "Licenses",
        methods: {
            applyFilter(refine, items, itemValue, exclude) {
                if (exclude) {
                    items.forEach((i) => {
                        if (i.value !== itemValue) {
                            refine(i.value);
                        }
                    })
                    return true;
                }
                refine(itemValue);
            },
            cleanLicense(item) {
                let parts = item.value.split(' (');
                if(parts.length > 1) {
                    return parts[0] + ' (' + item.count + ')';
                }
                return item.value + ' (' + item.count + ')';
            }
        }
    }
</script>
