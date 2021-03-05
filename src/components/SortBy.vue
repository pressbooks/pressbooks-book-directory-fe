<template>
  <ais-sort-by
    :items="$store.state.SClient.availableIndexes"
  >
    <template #default="{ items, refine }">
      <v-select
        v-model="selected"
        :items="items"
        item-text="label"
        item-value="value"
        class="ais-SortBy--input"
        dense
        label="Sort cards by:"
        @change="sortBy(selected, refine)"
      >
        <template #item="{ item }">
          <div :data-test-sort-item="item.orderedBy">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span>
                    {{ item.label }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </template>
      </v-select>
    </template>
  </ais-sort-by>
</template>

<script>
export default {
  name: 'SortBy',
  data() {
    return {
      selected: '',
      defaultIndex: process.env.VUE_APP_ALGOLIA_INDEX_LAST_UPDATED_REPLICA,
      indexSortedByWordCount: process.env.VUE_APP_ALGOLIA_INDEX_WORD_COUNT_REPLICA,
      indexSortedByName: process.env.VUE_APP_ALGOLIA_INDEX
    };
  },
  methods: {
    sortBy(sel, refine) {
      refine(sel);
    }
  }
};
</script>