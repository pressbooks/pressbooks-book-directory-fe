<template>
    <ais-hits-per-page
        :items="[
            { label: '10 books', value: 10, default: true },
            { label: '20 books', value: 20 },
            { label: '50 books', value: 50 },
        ]"
    >
      <template v-slot="{ items, refine }">
        <v-select
          :items="items"
          item-text="label"
          item-value="value"
          dense
          class="ais-HitsPerPage--input"
          v-model="selected"
          @change="perPage(selected, refine)"
          label="Cards per page:"
        >
          <template v-slot:item="{ item }">
            <div :id="'sort-by-' + item.value">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                  <span :id="'per-page-' + item.value">
                    {{ item.label }}
                  </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </template>
        </v-select>
      </template>
    </ais-hits-per-page>
</template>

<script>
export default {
  name: 'PerPage',
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    perPage(sel, refine) {
      refine(sel);
    }
  }
}
</script>