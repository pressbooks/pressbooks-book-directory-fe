<template>
  <v-list-group value="true">
    <template v-slot:activator>
      <v-list-item-title>LANGUAGE</v-list-item-title>
    </template>
    <ais-refinement-list
          attribute="languageName"
          :searchable="false"
          operator="or"
    >
      <v-list-item
          slot="item"
          slot-scope="{ item, refine }"
          :class="item.isRefined ? 'red lighten-1' : ''"
      >
        <v-list-item-action @click.prevent="refine(item.value)">
          <v-checkbox
            color="white"
            v-model="item.isRefined"
            :label="item.value + ' (' + item.count + ')'"
          ></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </ais-refinement-list>
  </v-list-group>
</template>

<script>
export default {
  name: "language-subject"
};
</script>
