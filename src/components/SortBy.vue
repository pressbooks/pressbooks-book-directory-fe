<template>
  <ais-sort-by
    :items="[
      { value: defaultIndex, label: 'Title (A-Z)' },
      { value: wordCountReplicaIndex, label: 'Word count ↓' },
      { value: lastUpdatedReplicaIndex, label: 'Recently updated' }
    ]"
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
          <div :id="'sort-by-' + item.value">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span :id="'sort-by-' + item.value">
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
      defaultIndex: process.env.VUE_APP_ALGOLIA_INDEX,
      wordCountReplicaIndex: process.env.VUE_APP_ALGOLIA_INDEX_WORD_COUNT_REPLICA,
      lastUpdatedReplicaIndex: process.env.VUE_APP_ALGOLIA_INDEX_LAST_UPDATED_REPLICA
    };
  },
  methods: {
    sortBy(sel, refine) {
      refine(sel);
    }
  }
};
</script>