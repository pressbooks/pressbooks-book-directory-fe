<template>
  <div class="flex items-center bg-gray-200 py-1 px-2 rounded-full space-x-2 mr-2 mb-2">
    <div class="text-sm">
      {{ name }}
    </div>
    <button
      class="flex items-center"
      @click.prevent="closeExcludeFilter(value)"
    >
      <XCircleIcon class="h-4 w-4"/>
    </button>
  </div>
</template>

<script>
import { XCircleIcon } from '@vue-hero-icons/outline';

export default {
  name: 'PbSelectedFilter',
	components: {
  	XCircleIcon
	},
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default() { return {}; }
    },
    attributesAllowed: {
      type: Array,
      default() { return []; }
    },
    attributesAllowEmpty: {
      type: Array,
      default() { return []; }
    }
  },
  methods: {
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
      let attrAllowed = this.attributesAllowed.concat(this.attributesAllowEmpty);
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
    }
  }
};
</script>
