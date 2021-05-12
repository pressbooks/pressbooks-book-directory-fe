<template>
  <pb-accordion :open="typeof($store.state.SClient.filtersExcluded[field]) !== 'undefined'">
    <template #title>
      <span class="title font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <form @submit.prevent="applyFilter">
        <div class="flex items-center space-x-4 py-2 px-4">
          <div>
            <label
              class="block text-sm"
              :for="`${field}-min`"
            >
              Min.
            </label>
            <div class="border-b border-gray-300 flex flex-row w-full items-center focus-within:border-red-700">
              <input
                :id="`${field}-min`"
                v-model.trim.number="number.min"
                :min="0"
                type="number"
                class="w-full border-0 text-sm p-1 focus:outline-none focus:ring-0"
              >
            </div>
          </div>
          <div>
            <label
              class="block text-sm"
              :for="`${field}-max`"
            >
              Max.
            </label>
            <div class="border-b border-gray-300 flex flex-row w-full items-center focus-within:border-red-700">
              <input
                :id="`${field}-max`"
                v-model.trim.number="number.max"
                :min="0"
                type="number"
                class="w-full border-0 text-sm p-1 focus:outline-none focus:ring-0"
              >
            </div>
          </div>

          <div>
            <t-button
              type="submit"
              :disabled="number.min === 0 && number.max === 0"
            >
              Go
            </t-button>
          </div>
        </div>
      </form>
    </template>
  </pb-accordion>
</template>

<script>
import PbAccordion from '../PbAccordion.vue';

export default {
  name: 'PbNumericFilters',
  components: {
    PbAccordion
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      number: {
        min: 0,
        max: 0,
        alias: ''
      },
      itemsFiltered: false
    };
  },
  computed: {
    min() {
      return this.number.min.length === 0 ? 0 : this.number.min;
    },
    max() {
      return this.number.max.length === 0 ? 0 : this.number.max;
    }
  },
  watch: {
    '$store.state.SClient.filtersExcluded': {
      deep: true,
      handler(filters) {
        if (
          typeof(filters[this.field]) !== 'undefined' &&
          filters[this.field].length > 0
        ) {
          this.itemsFiltered = true;
          this.number.min = 0;
          this.number.max = 0;
          for (let i = 0; i < filters[this.field].length; i++) {
            if (filters[this.field][i].operator === '>=') {
              this.number.min = filters[this.field][i].value;
            } else {
              this.number.max = filters[this.field][i].value;
            }
          }
        } else {
          this.number.min = 0;
          this.number.max = 0;
          this.itemsFiltered = false;
        }
      }
    }
  },
  mounted() {
    this.alias = this.$store.state.SClient.allowedFilters[this.field].alias;
  },
  methods: {
    clearFilters() {
      this.number.min = 0;
      this.number.max = 0;
      let query = {...this.$route.query};
      delete query[this.alias];
      this.$router.replace({ query });
    },
    applyFilter() {
      let query = {...this.$route.query};
      let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
      let min = parseInt(this.min);
      let max = parseInt(this.max);
      if (min > max) {
        this.number.max = 0;
        query[attribute] = '>=' + min;
        this.$router.replace({ query });
        return;
      }
      query[attribute] = '>=' + min + '&&' + '<=' + max;
      this.$router.replace({ query });
    }
  }
};
</script>
