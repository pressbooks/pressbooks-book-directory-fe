<template>
  <div>
    <div class="font-semibold text-lg mb-3">
      Active Filters
    </div>
    <div v-if="Object.keys($store.state.SClient.filtersExcluded).length > 0">
      <div
        v-for="(iv, key) in $store.state.SClient.filtersExcluded"
        :key="key"
        class="active-filters flex flex-row flex-wrap"
      >
        <pb-selected-filter
          v-for="value in iv"
          :key="value.value"
          :name="getLabel(value)"
          :value="value"
          :attributes-allowed="attrAllowed"
          :attributes-allow-empty="attrAllowedEmpty"
        />
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
      this.$router.replace({ query: {} });
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
