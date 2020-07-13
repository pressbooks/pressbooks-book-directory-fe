<template>
    <div class="filters">
        <div class="filters__head filters__head--red">
            Active Filters:
        </div>
        <ais-stats>
            <div slot-scope="{ nbHits }" class="filters__stats">
                <div class="filters__stats__results">
                    <span class="container__results">Results: </span>
                    <span class="container__results-hits" > {{ nbHits }} / {{ $store.state.stats.totalBooks }} shown</span>
                </div>
                <a href="https://www.algolia.com/" aria-label="Search by Algolia" target="_blank" class="filters__stats-algolia-logo"> </a>
            </div>
        </ais-stats>
        <ais-current-refinements>
            <template slot="item" slot-scope="{ item, refine }">
                <v-chip
                    v-for="iref in item.refinements"
                    :key="iref.attribute + iref.value"
                    :label="true"
                    @click.prevent="closeFilter(iref, refine, false, {})"
                    small
                    v-show="$store.state.SClient.filtersByExcluded.indexOf(iref.value) < 0"
                >
                    {{ getLabel(item, iref) }}
                    <v-icon right>mdi-close-circle</v-icon>
                </v-chip>
                <span
                    v-for="iv in $store.state.SClient.filtersExcluded"
                    :key="iv.join('-')"
                >
                    <v-chip
                        v-for="value in iv"
                        :key="value.value"
                        :label="true"
                        @click.prevent="closeFilter(value, refine, true, item.refinements)"
                        small
                        color="red"
                    >
                        NOT {{ value.value }}
                        <v-icon right>mdi-close-circle</v-icon>
                    </v-chip>
                </span>
            </template>
        </ais-current-refinements>
    </div>
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
            closeFilter(iref, refine, closingExclude, refinements) {
                if (!closingExclude) {
                    let filter = {attribute: iref.attribute, value: iref.label};
                    if (typeof(iref.operator) !== 'undefined') {
                        filter.operator = iref.operator;
                    }
                    this.$store.commit('setFiltersClosed', filter);
                    return refine(iref);
                }
                refinements.forEach((ir) => {
                    if (ir.attribute === iref.attribute) {
                        if (ir.attribute === iref.attribute) {
                            refine(ir);
                            this.$store.commit('deleteFiltersByExcluded', ir.value);
                        }
                        this.$store.commit('deleteFiltersExcluded', iref.attribute);
                    }
                });
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