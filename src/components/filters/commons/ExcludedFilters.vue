<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-list-group
    :id="'filter-' + field"
    sub-group
    value="true"
  >
    <template #activator>
      <v-list-item-title>{{ uppercase(title) }}</v-list-item-title>
    </template>
    <v-list-item v-if="searchable">
      <v-text-field
        :id="'search-filter-' + field"
        v-model="stringSearch"
        type="search"
        :label="'Search ' + title"
        @input="searchForItems()"
      >
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <v-icon slot="append">
          mdi-magnify
        </v-icon>
      </v-text-field>
    </v-list-item>
    <template v-if="$store.state.stats.filters[field] !== undefined">
      <v-list-item
        v-for="(item, k) in $store.state.stats.filters[field].slice(0, limited)"
        :key="k"
      >
        <v-list-item-content
          :id="'filter-item-name-' + item.facet.split(' ').join('-')"
          :class="(wasFiltered(item.facet, false) || wasFiltered(item.facet, true)) ? 'v-list-item__content--filtered' : ''"
        >
          {{ showItem(item) }}
        </v-list-item-content>
        <v-list-item-action
          :id="item.facet.split(' ').join('-').toLowerCase()"
        >
          <div>
            <v-btn
              :id="'btn-include-' + field + '-' + item.facet.split(' ').join('-')"
              icon
              :disabled="wasFiltered(item.facet, false)"
              :class="wasFiltered(item.facet, false) ? 'selected include': 'include'"
              @click="applyFilter(item.facet, false)"
            >
              <v-icon>
                mdi-check
              </v-icon>
            </v-btn>
            <v-btn
              :id="'btn-exclude-' + field + '-' + item.facet.split(' ').join('-')"
              icon
              :disabled="wasFiltered(item.facet, true)"
              :class="wasFiltered(item.facet, true) ? 'selected exclude': 'exclude'"
              @click="applyFilter(item.facet, true)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
      <button
        v-show="limited < $store.state.stats.filters[field].length"
        class="ais-RefinementList-showMore"
        @click="showMore"
      >
        Show more
      </button>
      <button
        v-show="limited === $store.state.stats.filters[field].length"
        class="ais-RefinementList-showMore"
        @click="showLess"
      >
        Show less
      </button>
    </template>
    <v-list-item>
      <div class="ais-ClearRefinements">
        <v-btn
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
    name: 'ExcludedFilters',
    props: {
        field: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        searchable: {
            type: Boolean,
            default: true
        },
        limit: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            excluded: false,
            stringSearch: '',
            steps: 5,
            limited: 100,
            max: 5000,
            auxItems: [],
            alias: this.$store.state.SClient.allowedFilters[this.field].alias
        };
    },
    mounted() {
        this.limited = this.limit;
    },
    methods: {
        uppercase(t) {
            return t.toUpperCase();
        },
        searchForItems() {
            if (this.auxItems.length === 0) {
                this.auxItems = [...this.$store.state.stats.filters[this.field]];
            }
            if (this.stringSearch.length > 0 && this.$store.state.stats.filters[this.field] !== undefined) {
                if (this.auxItems.length > 0) {
                    this.$store.state.stats.filters[this.field] = [...this.auxItems];
                }
                let str = this.stringSearch;
                let find = this.$store.state.stats.filters[this.field].filter(
                    v => v.facet.toLowerCase().search(str.toLowerCase()) >= 0
                );
                this.$store.state.stats.filters[this.field] = find;
            } else if (this.auxItems.length > 0 && this.stringSearch.length === 0) {
                this.$store.state.stats.filters[this.field] = [...this.auxItems];
            }
        },
        showMore() {
            this.max = this.$store.state.stats.filters[this.field].length;
            let l = this.limited + this.steps;
            this.limited = (l < this.max) ? l : this.max;
        },
        showLess() {
            let l = this.limited - this.steps;
            this.limited = (l > 0) ? l : 1;
        },
        wasFiltered(value, exc) {
            return typeof(this.$store.state.SClient.filtersExcluded[this.field]) !== 'undefined' &&
                    this.$store.state.SClient.filtersExcluded[this.field].find(v => v.value === value && v.exclude === exc) !== undefined;
        },
        clearFilters() {
            let query = {...this.$route.query};
            delete query[this.alias];
            this.$router.replace({ query });
        },
        applyFilter(itemValue, exclude) {
            let query = {...this.$route.query}, value;
            value = exclude ? '-' + itemValue : itemValue;
            if (typeof(query[this.alias]) === 'undefined') {
                query[this.alias] = value.toString();
            } else {
                let filters = query[this.alias].split('&&');
                for (let i = 0; i < filters.length; i++) {
                    if (
                        (exclude && filters[i][0] !== '-') ||
                        (!exclude && filters[i][0] === '-')
                    ) {
                        query[this.alias] = value.toString();
                        return this.$router.replace({ query });
                    }
                }
                query[this.alias] += '&&' + value.toString();
            }
            this.$router.replace({ query });
        },
        showItem(item) {
            return item.facet + ' (' + item.count + ')';
        }
    }
};
</script>
