<template>
    <v-row class="filters">
        <v-col class="filters__head filters__head--red" cols="12" md="9">
            Active Filters:
            <ais-clear-refinements class="all-filters"/>
            <ais-current-refinements>
                <template slot="item" slot-scope="{ item, refine }">
                    <v-chip
                            v-for="iref in item.refinements"
                            :key="iref.attribute + iref.value"
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
        <v-col cols="12" md="3">
            <ais-stats>
                <div slot-scope="{ nbHits }" class="filters__stats">
                    <div class="filters__stats__results">
                        <span class="container__results">Results: </span>
                        <span class="container__results-hits" > {{ nbHits }} / {{ $store.state.stats.totalBooks }} shown</span>
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