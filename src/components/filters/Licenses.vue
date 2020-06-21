<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>LICENSE</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="license_name"
            :searchable="false"
            operator="or"
            :limit="5"
            show-more
        >
            <v-list-item
                slot="item"
                slot-scope="{ item, refine }"
                :class="item.isRefined ? 'red darken-4' : ''"
            >
                <v-list-item-action @click.prevent="refine(item.value)">
                    <v-checkbox
                        color="white"
                        v-model="item.isRefined"
                        :label="cleanLicense(item)"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
        <v-list-item>
            <ais-clear-refinements  :included-attributes="['license_name']">
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
        </v-list-item>
    </v-list-group>
</template>

<script>
    export default {
        name: "Licenses",
        methods: {
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
