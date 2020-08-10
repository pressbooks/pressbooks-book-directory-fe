<template>
    <div>
      <v-row class="filters">
        <v-col class="filters__head filters__head--red" cols="12" md="9">
          Active Filters:
          <clear-refinements></clear-refinements>
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
          <stats></stats>
          <per-page></per-page>
          <sort-by></sort-by>
        </v-col>
      </v-row>
      <pagination></pagination>
    </div>
</template>

<script>
import ClearRefinements from "@/components/filters/ClearRefinements";
import PerPage from "@/components/PerPage";
import SortBy from "@/components/SortBy";
import Stats from "@/components/Stats";
import Pagination from "@/components/commons/Pagination";
export default {
    components: {Pagination, Stats, SortBy, PerPage, ClearRefinements},
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