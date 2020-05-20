<template>
  <div>
    <v-subheader>LICENSES</v-subheader>
    <ais-refinement-list
      attribute="license_name"
      :searchable="false"
      operator="or"
    >
      <div slot-scope="{ items }">
        <v-list-item
          v-for="item in items"
          :key="item.value"
          @click.prevent="applyFilters(item.value, 'license_name')"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.value"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </ais-refinement-list>

    <v-subheader>BASED ON</v-subheader>
    <v-list-item @click.prevent="applyFilters(true, 'has_isBasedOn', 1)">
      <v-list-item-content>
        <v-list-item-title>Based on another book</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click.prevent="applyFilters(false, 'has_isBasedOn', 2)">
      <v-list-item-content>
        <v-list-item-title>Original</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click.prevent="applyFilters(null, 'has_isBasedOn', 3)">
      <v-list-item-content>
        <v-list-item-title>Any</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-subheader>WORDS</v-subheader>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="number"
                id="min-wc"
                min="1"
                v-model="wordCount.min"
                @input="
                  updateRangeInput('wordCount', wordCount.min, wordCount.max)
                "
                label="Min"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                id="max-wc"
                min="1"
                v-model="wordCount.max"
                @input="
                  updateRangeInput('wordCount', wordCount.min, wordCount.max)
                "
                label="Max"
              />
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-subheader>STORAGE SIZE</v-subheader>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="number"
                id="min-wc"
                min="1"
                v-model="storageSize.min"
                @input="
                  updateRangeInput(
                    'storageSize',
                    storageSize.min,
                    storageSize.max
                  )
                "
                label="Min"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                id="max-wc"
                min="1"
                v-model="storageSize.max"
                @input="
                  updateRangeInput(
                    'storageSize',
                    storageSize.min,
                    storageSize.max
                  )
                "
                label="Max"
              />
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "book-properties",
  methods: {
    applyFilters(value, attribute, option = null, operator = ":") {
      if (option !== null) {
        this.isBasedOn = option;
      }
      if (value === null) {
        delete this.$store.state.SClient.filtersApplied.has_isBasedOn;
      } else {
        if (
          attribute === "has_isBasedOn" &&
          this.$store.state.SClient.filtersApplied.has_isBasedOn !== undefined
        ) {
          delete this.$store.state.SClient.filtersApplied.has_isBasedOn;
        }
        this.$store.commit("setFiltersApplied", {
          value: value,
          attribute: attribute,
          operator: operator
        });
      }
      this.$store.dispatch("refreshFilters");
    },
    updateRangeInput(attribute, min, max) {
      delete this.$store.state.SClient.filtersApplied[attribute];
      if (min !== "" && parseInt(min) > 0) {
        this.$store.commit("setFiltersApplied", {
          value: min,
          attribute: attribute,
          operator: ">"
        });
      }
      if (max !== "" && parseInt(max) > 0) {
        this.$store.commit("setFiltersApplied", {
          value: max,
          attribute: attribute,
          operator: "<="
        });
      }
      this.$store.dispatch("refreshFilters");
    }
  },
  data() {
    return {
      isBasedOn: 3,
      licenses: [],
      wordCount: {
        min: null,
        max: null
      },
      storageSize: {
        min: null,
        max: null
      }
    };
  }
};
</script>
