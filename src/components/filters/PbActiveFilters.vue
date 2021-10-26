<template>
  <div data-cy="active-filters">
    <h2
      id="active-filters"
      class="font-semibold text-lg mb-1"
    >
      Active Filters
    </h2>
    <div
      v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0 || $store.state.config.showTour === true"
      class="flex flex-col md:flex-row justify-between items-start"
    >
      <ul
        class="active-filters flex flex-col flex-wrap flex-1 md:flex-row"
        role="list"
        aria-labelledby="active-filters"
      >
        <template
          v-for="(iv, keyFiltersExcluded) in $store.state.SClient.filtersExcluded"
        >
          <pb-selected-filter
            v-for="(value, keyFiltersApplied) in iv"
            :key="keyFiltersExcluded.toString() + keyFiltersApplied.toString()"
            :name="getLabel(value)"
            :value="value"
            :attributes-allowed="attrAllowed"
            :attributes-allow-empty="attrAllowedEmpty"
          />
        </template>
      </ul>
      <div
        class="flex-shrink-0 justify-center align-middle flex flex-col clear-filters"
      >
        <button
          v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0 || $store.state.config.showTour === true"
          type="reset"
          class="font-bold text-pb-red text-right uppercase"
          data-cy="clear-all-filters"
          @click.prevent="removeFilters"
        >
          <span class="sr-only">Clear all active filters</span>
          <span aria-hidden="true">Clear all</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import PbSelectedFilter from './PbSelectedFilter.vue';

export default {
  name: 'PbActiveFilters',
  components: {
    PbSelectedFilter
  },
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
    removeFilters() {
      if (Object.keys(this.$route.query).length !== 0) {
        const { q, per_page } = this.$route.query;

        this.$router.replace({
          query: { q, per_page }
        });
      }
    },
    getLabel(value) {
      let label;
      let mb = (value.attribute === 'storageSize') ? parseInt(value.value) : 0;
      switch (value.attribute) {
      case 'hasIsBasedOn':
        label = (value.value) ? 'Based on another book' : 'Original';
        break;
      case 'wordCount':
        label = 'Words ' + value.operator + ' ' + value.value;
        break;
      case 'lastUpdated':
        let date = dayjs.unix(value.value).utc().format('MM-DD-YYYY');
        label = `Updated ${value.operator} ${date}`;
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
      return (value.exclude) ? 'NOT ' + label : label;
    }
  }
};
</script>
