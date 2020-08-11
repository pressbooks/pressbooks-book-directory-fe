<template>
  <ais-sort-by
      :items="[
          { value: 'test_Pressbooks_directory', label: 'Title (A-Z)' },
          { value: 'test_Pressbooks_directory_sort_by_wordCount', label: 'Word count ↓' },
          { value: 'test_Pressbooks_directory_sort_by_lastUpdated', label: 'Recently updated' }
      ]"
  >
    <template v-slot="{ items, refine }">
      <v-select
        :items="items"
        item-text="label"
        item-value="value"
        class="ais-SortBy--input"
        dense
        v-model="selected"
        @change="sortBy(selected, refine)"
        label="Sort cards by:"
      >
        <template v-slot:item="{ item }">
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
      selected: ''
    }
  },
  methods: {
    sortBy(sel, refine) {
      refine(sel);
    }
  }
}
</script>