<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>SUBJECT</v-list-item-title>
        </template>
        <template>
            <ais-refinement-list
                attribute="about"
                :searchable="true"
                operator="or"
                :limit="5"
                show-more
                :show-more-limit="10"
                :sort-by="['name:asc']"
            >
                <div
                    slot-scope="{
                        items,
                        refine,
                        searchForItems,
                        toggleShowMore,
                        canToggleShowMore,
                        isShowingMore
                    }"
                >
                    <v-list-item>
                        <v-text-field
                            type="search"
                            v-model="stringSearch"
                            label="Search subject"
                            @input="searchForItems(stringSearch)"
                        >
                            <v-icon slot="append">mdi-magnify</v-icon>
                        </v-text-field>
                    </v-list-item>
                    <v-list-item
                        v-for="item in items" :key="item.value"
                    >
                        <v-list-item-action @click.prevent="refine(item.value)">
                            <v-checkbox
                                    v-model="item.isRefined"
                                    :label="item.value + ' (' + item.count + ')'"
                            ></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                    <button
                        @click="toggleShowMore"
                        v-show="canToggleShowMore"
                        class="ais-RefinementList-showMore"
                    >
                        {{ !isShowingMore ? 'Show more' : 'Show less'}}
                    </button>
                </div>
            </ais-refinement-list>
        </template>
        <v-list-item>
            <ais-clear-refinements  :included-attributes="['about']">
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
        name: "Subjects",
        data() {
            return {
                stringSearch: ''
            };
        }
    }
</script>
