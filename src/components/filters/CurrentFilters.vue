<template>
    <v-container class="mt-2 ml-5 filters">
        <v-row>
            <v-col cols="10">
                <div class="filters__header filters__header--red">
                    Active Filters:
                </div>
                <ais-current-refinements>
                    <template slot="item" slot-scope="{ item, refine }">
                        <v-chip
                            v-for="iref in item.refinements"
                            :key="iref.attribute + iref.value"
                            class="ma-2"
                            color="#169db3"
                            text-color="white"
                            :label="true"
                            @click.prevent="closeFilter(iref, refine)"
                            small
                        >
                            {{ getLabel(item, iref) }}
                            <v-icon right>mdi-close-circle</v-icon>
                        </v-chip>
                    </template>
                </ais-current-refinements>
            </v-col>
            <v-col cols="2">
                <ais-stats>
                    <p slot-scope="{ nbHits }">
                        <span class="container__results">RESULTS: </span>
                        <span class="container__results_hits" > {{ nbHits }} / {{ $store.state.stats.totalBooks }} shown</span>
                    </p>
                </ais-stats>
            </v-col>
        </v-row>
    </v-container>
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
            closeFilter(iref, refine) {
                let filter = {attribute: iref.attribute, value: iref.label};
                if (typeof(iref.operator) !== 'undefined') {
                    filter.operator = iref.operator;
                }
                this.$store.commit('setFiltersClosed', filter);
                refine(iref);
            },
            getLabel(item, iref) {
                let label;
                let mb = parseInt(iref.value) / 1024 / 1024;
                console.log(iref)
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