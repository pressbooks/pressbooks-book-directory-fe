<template>
    <v-container class="mt-2 ml-5">
        <v-row>
            <v-col cols="10">
                <div class="float-left headerwelcome_red-font-pressbooks font-weight-bold">
                    Active Filters:
                </div>
                <ais-current-refinements>
                    <template slot="item" slot-scope="{ item, refine }">
                        <v-chip
                            class="ma-2"
                            color="#169db3"
                            text-color="white"
                            :label="true"
                            @click.prevent="refine(item.value)"
                            small
                        >
                            {{ getLabel(item) }}
                            <v-icon right>mdi-close-circle</v-icon>
                        </v-chip>
                    </template>
                </ais-current-refinements>
            </v-col>
            <v-col cols="2">
                <ais-stats>
                    <p slot-scope="{ nbHits }">
                        <span class="container__results">RESULTS: </span>
                        <span class="container__results_hits" > {{ nbHits }} / {{ totalBooks }} shown</span>
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
            this.index.search('').then(function (response) {
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
            getLabel(item) {
                let label;
                switch (item.attribute) {
                    case 'has_isBasedOn':
                        label = (item.label === 'true') ? 'Based on another book' : 'Original';
                        break;
                    case 'wordCount':
                        label = 'Words ' + item.label;
                        break;
                    case 'storageSize':
                        label = 'Storage ' + item.label;
                        break;
                    case 'h5pActivities':
                        label = 'H5P Activities ' + item.label;
                        break;
                    default:
                        label = item.label;
                }
                return label;
            }
        }
    }
</script>