<template>
    <v-row class="filters">
        <v-col class="filters__head filters__head--red" cols="12" md="9">
            Active Filters:
            <ais-clear-refinements class="all-filters">
                <div slot-scope="{ refine, canRefine }">
                    <button
                        type="reset"
                        @click.prevent="removeFiltersExcluded(refine)"
                        :class="canRefine ? 'ais-ClearRefinements-button ais-ClearRefinements-button' : 'ais-ClearRefinements-button ais-ClearRefinements-button--disabled'"
                        :disabled="!canRefine"
                    >Clear refinements</button>
                </div>
            </ais-clear-refinements>
            <ais-current-refinements>
                <template slot="item" slot-scope="{ item, refine }">
                    <v-chip
                        v-for="iref in item.refinements"
                        :key="iref.attribute + iref.value"
                        :label="true"
                        @click.prevent="closeFilter(iref, refine, false, {})"
                        small
                    >
                        {{ getLabel(item, iref) }}
                        <v-icon right>mdi-close-circle</v-icon>
                    </v-chip>
                </template>
            </ais-current-refinements>
            <ul
                v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0"
                class="ais-CurrentRefinements-list"
            >
                <li
                    class="ais-CurrentRefinements-item"
                    v-for="iv in $store.state.SClient.filtersExcluded"
                    :key="iv.join('-')"
                >
                    <v-chip
                        v-for="value in iv"
                        :key="value.value"
                        :label="true"
                        @click.prevent=""
                        small
                        color="red"
                    >
                        NOT {{ value.value }}
                        <v-icon right>mdi-close-circle</v-icon>
                    </v-chip>
                </li>
            </ul>
        </v-col>
        <v-col cols="12" md="3">
            <ais-stats>
                <div slot-scope="{ nbHits }" class="filters__stats">
                    <div class="filters__stats__results">
                        <span class="container__results">Results: </span>
                        <span class="container__results-hits" >
                            {{ nbHits }} / {{ $store.state.stats.totalBooks }} shown
                        </span>
                    </div>
                </div>
            </ais-stats>
            <ais-hits-per-page
                :items="[
                    { label: '10 books per page', value: 10, default: true },
                    { label: '20 books per page', value: 20 },
                    { label: '50 books per page', value: 50 },
                ]"
            />
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "CurrentFilters",
        mounted() {
            this.index = this.$store.state.SClient.searchClient.initIndex(this.$store.state.SClient.indexName)
            let vm = this;
            this.index.search('', {facets: 'networkName'}).then(function (response) {
                vm.totalBooks = response.nbHits;
            })
        },
        data() {
            return {
                totalBooks: null,
                index: null
            };
        },
        methods: {
            removeFiltersExcluded(refine) {
                this.$store.state.SClient.filtersExcluded = {};
                refine();
            },
            closeFilter(iref, refine, closingExclude, refinements) {
                if (!closingExclude) {
                    return refine(iref);
                }
                if (this.$store.state.SClient.filtersExcluded[iref.attribute].length === 1) {
                    refinements.forEach((ir) => {
                        if (ir.attribute === iref.attribute) {
                            refine(ir);
                        }
                    });
                    delete this.$store.state.SClient.filtersExcluded[iref.attribute];
                    return true;
                }
                for (let i = 0; i < this.$store.state.SClient.filtersExcluded[iref.attribute].length; i++) {
                    if (this.$store.state.SClient.filtersExcluded[iref.attribute][i].value === iref.value) {
                        this.$store.state.SClient.filtersExcluded[iref.attribute].splice(i, 1);
                        if (this.$store.state.SClient.filtersExcluded[iref.attribute].length === 0) {
                            delete this.$store.state.SClient.filtersExcluded[iref.attribute];
                        }
                        this.$store.state.SClient.refineFunctions[iref.attribute](iref.value);
                        return true;
                    }
                }
            },
            getLabel(item, iref) {
                let label;
                let mb = parseInt(iref.value) / 1024 / 1024;
                switch (item.attribute) {
                    case 'has_isBasedOn':
                        label = (item.label === 'true') ? 'Based on another book' : 'Original';
                        break;
                    case 'wordCount':
                        label = 'Words ' + iref.label;
                        break;
                    case 'storageSize':
                        label = 'Storage ' + iref.operator + ' ' + parseFloat(mb).toFixed(2) + ' MB';
                        break;
                    case 'h5pActivities':
                        label = 'H5P Activities ' + iref.label;
                        break;
                    default:
                        label = iref.value;
                }
                return label;
            }
        }
    }
</script>