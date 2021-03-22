<template>
  <div id="current-filters">
    <v-row class="filters">
      <v-col
        class="filters__head filters__head--red"
        cols="12"
        md="9"
      >
        Active Filters:
        <clear-refinements />
        <ul
          v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0"
          class="ais-CurrentRefinements-list"
          :data-test-chip-filters="Object.keys($store.state.SClient.filtersExcluded).length"
        >
          <li
            v-for="iv in $store.state.SClient.filtersExcluded"
            :key="iv[0].attribute+iv[0].value"
            class="ais-CurrentRefinements-item"
          >
            <v-chip
              v-for="value in iv"
              :key="value.value"
              :label="true"
              small
              :class="value.exclude ? 'v-chip--not' : ''"
              @click.prevent="closeExcludeFilter(value)"
            >
              <span v-if="value.exclude">NOT {{ getLabel(value) }}</span>
              <span v-else>{{ getLabel(value) }}</span>
              <v-icon right>
                mdi-close-circle
              </v-icon>
            </v-chip>
          </li>
        </ul>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <stats />
        <per-page />
        <sort-by />
      </v-col>
    </v-row>
    <pagination />
  </div>
</template>

<script>
import ClearRefinements from '@/components/filters/ClearRefinements';
import PerPage from '@/components/PerPage';
import SortBy from '@/components/SortBy';
import Stats from '@/components/Stats';
import Pagination from '@/components/commons/Pagination';
export default {
  name: 'CurrentFilters',
  components: {Pagination, Stats, SortBy, PerPage, ClearRefinements},
  data() {
    return {
      attrAllowed: [],
      allowed: this.$store.state.SClient.allowedFilters,
      attrAllowedEmpty: []
    };
  },
  mounted() {
    this. attrAllowed = Object.keys(this.$store.state.SClient.allowedFilters);
    let allowed = this.allowed;
    this.attrAllowedEmpty = Object.keys(this.allowed).map(key => {
      if (typeof allowed[key].empty !== 'undefined') {
        return allowed[key].empty;
      }
    });
  },
  methods: {
    inputFormatDate(d) {
      let month = (d.getUTCMonth()+1) < 10 ? '0' + (d.getUTCMonth()+1) : (d.getUTCMonth()+1);
      let day = d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate();
      return month + '/' + day + '/' + d.getUTCFullYear();
    },
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
        if (f.attribute === this.$store.state.SClient.allowedFilters[attribute].empty) {
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
      let attrAllowed = this.attrAllowed.concat(this.attrAllowedEmpty);
      let aliasType = this.getAliasType(f);
      if (attrAllowed.indexOf(f.attribute) < 0 || !aliasType) {
        return false;
      }
      for (let attr in currentQuery) {
        if (attr === aliasType.alias) {
          currentQuery[attr] = currentQuery[attr].split('&&');
          for (let i = 0; i < currentQuery[attr].length; i++) {
            let value = (aliasType.type === 'numeric') ?
              currentQuery[attr][i].substr(2) : currentQuery[attr][i];
            if (aliasType.type === 'boolean') {
              value = (currentQuery[attr][i] === 'true').toString();
            } else if(f.exclude) {
              value = currentQuery[attr][i].substr(1);
            }
            if (f.value === value || value === 'empty') {
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
      case 'hasIsBasedOn':
        label = (value.value) ? 'Based on another book' : 'Original';
        break;
      case 'isRecommended':
        label = (value.value) ? 'Recommended' : 'Not recommended';
        break;
      case 'wordCount':
        label = 'Words ' + value.operator + ' ' + value.value;
        break;
      case 'lastUpdated':
        let dateObj = new Date(parseInt(value.value) * 1000);
        let date = this.inputFormatDate(dateObj);
        label = 'Updated ' + value.operator + ' ' + date;
        break;
      case 'storageSize':
        label = 'Storage ' + value.operator + ' ' + parseFloat(mb).toFixed(2) + ' MB';
        break;
      case 'h5pActivities':
        label = 'H5P Activities ' + value.operator + ' ' + value.value;
        break;
      default:
        if (this.attrAllowedEmpty.indexOf(value.attribute) >= 0) {
          let aliasType = this.getAliasType(value);
          label = aliasType.alias + ': Empty';
        } else {
          label = value.value;
        }
      }
      return label;
    }
  }
};
</script>