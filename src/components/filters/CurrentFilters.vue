<template>
    <v-row class="filters">
        <v-col class="filters__head filters__head--red" cols="12" md="9">
            Active Filters:
            <button
                type="reset"
                @click.prevent="removeFilters()"
                :class="Object.keys($store.state.SClient.filtersExcluded).length > 0 ? 'ais-ClearRefinements-button ais-ClearRefinements-button' : 'ais-ClearRefinements-button ais-ClearRefinements-button--disabled'"
                :disabled="Object.keys($store.state.SClient.filtersExcluded).length === 0"
            >
                Clear refinements
            </button>
            <ul
                v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0"
                class="ais-CurrentRefinements-list"
            >
                <li
                    class="ais-CurrentRefinements-item"
                    v-for="iv in $store.state.SClient.filtersExcluded"
                    :key="iv[0].attribute+iv[0].value"
                >
                    <v-chip
                        v-for="value in iv"
                        :key="value.value"
                        :label="true"
                        @click.prevent="closeExcludeFilter(value)"
                        small
                        :class="value.exclude ? 'v-chip--not' : ''"
                    >
                        <span v-if="value.exclude">NOT {{ getLabel(value) }}</span>
                        <span v-else>{{ getLabel(value) }}</span>

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
      methods: {
          removeFilters() {
            this.$router.replace({ query: {} });
          },
          getAliasType(f) {
            for (let attribute in this.$store.state.SClient.allowedFilters) {
              if (f.attribute === attribute) {
                return {
                  alias: this.$store.state.SClient.allowedFilters[attribute].alias,
                  type: this.$store.state.SClient.allowedFilters[attribute].type
                };
              }
            }
            return false;
          },
          closeExcludeFilter(f) {
            let currentQuery = {...this.$route.query};
            let attrAllowed = Object.keys(this.$store.state.SClient.allowedFilters);
            let aliasType = this.getAliasType(f);
            if (attrAllowed.indexOf(f.attribute) < 0 || !aliasType) {
                return false;
            }
            for (let attr in currentQuery) {
                if (attr === aliasType.alias) {
                    currentQuery[attr] = currentQuery[attr].split('&&');
                    for (let i = 0; i < currentQuery[attr].length; i++) {
                        let value = (aliasType.type === 'numeric') ? currentQuery[attr][i].substr(2) : currentQuery[attr][i];
                        if (f.value === value) {
                           currentQuery[attr].splice(i, 1);
                           if (currentQuery[attr].length === 0) {
                              delete currentQuery[attr];
                           } else {
                              currentQuery[attr] = currentQuery[attr].join('&&');
                           }
                           return this.$router.replace({ query: currentQuery });
                        }
                    }
                }
            }
          },
          getLabel(value) {
              let label;
              let mb = (value.attribute === 'storageSize') ? parseInt(value.value) : 0;
              switch (value.attribute) {
                  case 'has_isBasedOn':
                      label = (value.value) ? 'Based on another book' : 'Original';
                      break;
                  case 'wordCount':
                      label = 'Words ' + value.operator + ' ' + value.value;
                      break;
                  case 'storageSize':
                      label = 'Storage ' + value.operator + ' ' + parseFloat(mb).toFixed(2) + ' MB';
                      break;
                  case 'h5pActivities':
                      label = 'H5P Activities ' + value.operator + ' ' + value.value;
                      break;
                  default:
                      label = value.value;
              }
              return label;
          }
      }
  }
</script>