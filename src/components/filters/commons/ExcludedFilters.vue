<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-list-group
        sub-group
        value="true"
        :id="'filter-' + field"
    >
        <template v-slot:activator>
            <v-list-item-title>{{ title | uppercase }}</v-list-item-title>
        </template>
        <template>
            <ais-refinement-list
                :attribute="field"
                operator="or"
                :limit="15"
                show-more
                :show-more-limit="25"
                :sort-by="['name:asc']"
                :transformItems="transformItems"
            >
                <div
                    slot-scope="{
                        items,
                        refine,
                        toggleShowMore,
                        canToggleShowMore,
                        isShowingMore,
                        searchForItems
                    }"
                >
                    <v-list-item v-if="searchable">
                        <v-text-field
                            type="search"
                            v-model="stringSearch"
                            :label="'Search ' + title"
                            @input="searchForItems(stringSearch)"
                        >
                            <v-icon slot="append">mdi-magnify</v-icon>
                        </v-text-field>
                    </v-list-item>
                    <v-list-item
                        v-for="item in items" :key="item.value"
                    >
                        <v-list-item-content>
                            {{ showItem(item) }}
                        </v-list-item-content>
                        <v-list-item-action
                            :id="item.value.split(' ').join('-').toLowerCase()"
                        >
                            <div>
                                <v-btn
                                    icon
                                    :id="'btn-include-' + field + '-' + item.value.split(' ').join('-')"
                                    @click="applyFilter(refine, items, item.value, false)"
                                    :disabled="item.isRefined && typeof($store.state.SClient.filtersExcluded[field]) === 'undefined'"
                                >
                                    <v-icon color="green">mdi-check</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    @click="applyFilter(refine, items, item.value, true)"
                                    :disabled="wasExcluded(item.value)"
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
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
            <ais-clear-refinements  :included-attributes="[field]">
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
        name: "excluded-filters",
        props: ["field", "title", "searchable"],
        data() {
            return {
                included: false,
                excluded: false,
                stringSearch: ''
            };
        },
        filters: {
            uppercase: function(t) {
                return t.toUpperCase();
            }
        },
        methods: {
            transformItems(items) {
                let it = items[0];
                if (Object.keys(this.$store.state.SClient.filtersExcluded).length > 0) {
                    for (const attribute in this.$store.state.SClient.filtersExcluded) {
                        for (let i=0; i<this.$store.state.SClient.filtersExcluded[attribute].length;  i++) {
                            it.value = this.$store.state.SClient.filtersExcluded[attribute][i].value;
                            if (items.find(v => v.value === it.value) === undefined) {
                                it.count = 100;
                                it.isRefined = true;
                                items.unshift(it);
                            }
                        }
                    }
                }
                return items;
            },
            wasExcluded(value) {
                return typeof(this.$store.state.SClient.filtersExcluded[this.field]) !== 'undefined' &&
                        this.$store.state.SClient.filtersExcluded[this.field].find(v => v.value === value) !== undefined;
            },
            cleanFilters(items, refine) {
                items.forEach((i) => {
                    if (i.isRefined) {
                        refine(i.value);
                    }
                });
            },
            applyFilter(refine, items, itemValue, exclude) {
                if (exclude) {
                    if (this.included) {
                        // Remove all filters
                        this.cleanFilters(items, refine);
                    }
                    this.$store.commit('setFiltersExcluded', { attribute: this.field, value: itemValue });
                    this.$store.commit('setRefineFunctions', { attribute: this.field, refine: refine });
                    this.excluded = exclude;
                    this.included = !exclude;
                    this.stringSearch = '';
                    return true;
                }
                if (this.excluded) {
                    this.$store.state.SClient.filtersExcluded = {};
                    this.$store.state.SClient.notFilters = [];
                }
                this.stringSearch = '';
                this.excluded = exclude;
                this.included = !exclude;
                refine(itemValue);
            },
            showItem(item) {
                let parts = item.value.split(' (');
                if(parts.length > 1) {
                    return parts[0] + ' (' + item.count + ')';
                }
                return item.value + ' (' + item.count + ')';
            }
        }
    }
</script>
