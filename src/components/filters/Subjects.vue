<template>
    <v-list-group value="true">
        <template v-slot:activator>
            <v-list-item-title>SUBJECT</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="about"
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
                        :label="item.value + ' (' + item.count + ')'"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
        <ais-clear-refinements  :included-attributes="['about']">
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
        name: "Subjects"
    }
</script>

<style scoped>

</style>