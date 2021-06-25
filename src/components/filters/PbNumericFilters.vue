<template>
  <pb-accordion
    :open="typeof($store.state.SClient.filtersExcluded[field]) !== 'undefined'"
    :data-cy-button="`${field}`"
  >
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
              <span class="sr-only">{{ `Minimum ${title} value` }}</span>
              <span aria-hidden="true">Min</span>  
            </label>
            <div class="border-b border-gray-300 flex flex-row w-full items-center focus-within:border-red-700">
              <input
                :id="`${field}-min`"
                v-model.trim.number="number.min"
                :min="0"
                type="number"
                class="w-full border-0 text-sm p-1 focus:outline-none focus:ring-0"
                :data-cy-input="`${field}-min`"
              >
            </div>
          </div>
          <div>
            <label
              class="block text-sm"
              :for="`${field}-max`"
            >
              <span class="sr-only">{{ `Maximum ${title} value` }}</span>
              <span aria-hidden="true">Max</span>  
            </label>
            <div class="border-b border-gray-300 flex flex-row w-full items-center focus-within:border-red-700">
              <input
                :id="`${field}-max`"
                v-model.trim.number="number.max"
                :min="0"
                type="number"
                class="w-full border-0 text-sm p-1 focus:outline-none focus:ring-0"
                :data-cy-input="`${field}-max`"
              >
            </div>
          </div>

          <div :data-cy-button="`${field}`">
            <t-button
              type="submit"
              :disabled="!number.min && !number.max"
            >
              <span class="sr-only">{{ `Apply ${title}` }}</span>
              <span aria-hidden="true">Go</span>
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
        min: null,
        max: null,
      },
      itemsFiltered: false
    };
  },
  computed: {
    alias() {
      return this.$store.state.SClient.allowedFilters[this.field].alias;
    },
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
  methods: {
    clearFilters() {
      this.number.min = 0;
      this.number.max = 0;
      let query = {...this.$route.query};
      delete query[this.alias];
      this.$router.replace({ query });
    },
    applyFilter() {
      let queryString = null;
      let query = {...this.$route.query};
      let min = parseInt(this.min);
      let max = parseInt(this.max);

      if (min > max) {
        this.number.max = 0;
        queryString = `>=${min}`;
      } else {
        queryString = `>=${min}&&<=${max}`;
      }

      if (!queryString) {
        return;
      }

      if (query[this.alias] === queryString) {
        return;
      }

      this.sendClickEvent();

      return this.$router.replace({
        query: {
          ...query,
          [this.alias]: queryString
        }
      });
    },
    sendClickEvent() {
      let values = [
        this.min ? `${this.alias}:>=${this.min}` : null,
        this.max ? `${this.alias}:<=${this.max}` : null
      ];

      this.sendFilterAppliedEvent({
        filters: values.filter(v => v)
      });
    },
  }
};
</script>
