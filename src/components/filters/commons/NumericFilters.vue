<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-list-group
    :id="'filter-' + field"
    sub-group
    :value="itemsFiltered"
  >
    <template #activator>
      <v-list-item-title>{{ uppercase(title) }}</v-list-item-title>
    </template>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-form @submit.prevent="applyFilter">
            <v-row>
              <v-col cols="4">
                <v-text-field
                  :id="'min-' + field"
                  v-model="number.min"
                  type="number"
                  :min="0"
                  label="Min"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :id="'max-' + field"
                  v-model="number.max"
                  type="number"
                  :min="number.min"
                  label="Max"
                />
              </v-col>
              <v-col cols="4">
                <v-btn
                  :id="'btn-' + field"
                  type="submit"
                  :disabled="number.min === 0 && number.max === 0"
                >
                  Go
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <div class="ais-ClearRefinements">
        <v-btn
          :id="'btn-clear-' + field"
          tile
          @click="clearFilters()"
        >
          CLEAR
        </v-btn>
      </div>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'NumericFilters',
  filters: {
    uppercase(t) {
      return t.toUpperCase();
    }
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
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
  watch: {
    '$store.state.SClient.filtersExcluded': {
      deep: true,
      handler(filters) {
        if (
          typeof(filters[this.field]) !== 'undefined' &&
          filters[this.field].length > 0
        ) {
          this.itemsFiltered = true;
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
    uppercase(t) {
      return t.toUpperCase();
    },
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
      let min = parseInt(this.number.min);
      let max = parseInt(this.number.max);
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