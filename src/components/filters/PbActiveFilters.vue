<template>
  <div data-cy="active-filters">
    <div class="font-semibold text-lg mb-1">
      Active Filters
    </div>
    <div
      v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0 || $store.state.config.showTour === true"
      class="flex flex-col md:flex-row justify-between items-start"
    >
      <div class="active-filters flex flex-col flex-wrap flex-1 md:flex-row">
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
      </div>
      <div
        class="flex-shrink-0 justify-center align-middle flex flex-col clear-filters"
      >
        <button
          v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0 || $store.state.config.showTour === true"
          type="reset"
          class="font-bold text-pb-red text-right uppercase"
          data-cy="clear-all-filters"
          @click.prevent="removeFilters()"
        >
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    inputFormatDate(d) {
      let month = (d.getUTCMonth()+1) < 10 ? '0' + (d.getUTCMonth()+1) : (d.getUTCMonth()+1);
      let day = d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate();
      return month + '/' + day + '/' + d.getUTCFullYear();
    },
    removeFilters() {
      if (Object.keys(this.$route.query).length !== 0) {
        this.$router.replace({ query: {} });
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
      return (value.exclude) ? 'NOT ' + label : label;
    }
  }
};
</script>
