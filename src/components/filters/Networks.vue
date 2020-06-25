<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>NETWORK</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="networkName"
            :searchable="false"
            operator="or"
            :limit="5"
            show-more
            :show-more-limit="500"
            :sort-by="['name:asc']"
        >
            <v-list-item
                slot="item"
                slot-scope="{ item, refine }"
            >
                <v-list-item-action @click.prevent="refine(item.value)">
                    <v-checkbox
                        v-model="item.isRefined"
                        :label="item.value + ' (' + item.count + ')'"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
        <v-list-item>
            <ais-clear-refinements  :included-attributes="['networkName']">
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
        name: "Networks"
    }
</script>