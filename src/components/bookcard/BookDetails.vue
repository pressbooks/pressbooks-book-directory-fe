<template>
  <div>
    <div>
    <strong>Author(s): </strong>
    <span v-for="(author, index) in item.author" v-bind:key="index">
      <span v-if="index != 0">, </span>
      <span class="v-card__subtitle--item">
        {{ author }}
      </span>
    </span>
    </div>
    <div v-if="item.editor && item.editor.length > 0">
      <strong>Editor(s): </strong>
      <span v-for="(editor, index) in item.editor" v-bind:key="index">
        <span v-if="index != 0">, </span>
        <span
          class="v-card__subtitle--item"
        >
          {{ editor }}
        </span>
      </span>
    </div>
    <div v-if="item.about">
      <strong>Subject(s): </strong>
      <span v-for="(about, index) in item.about" v-bind:key="index">
        <span v-if="index != 0">, </span>
        <span
          class="v-card__subtitle--item"
        >
          {{ about }}
        </span>
      </span>
    </div>
    <div
      v-if="item.publisher_name"
    >
      <strong>Publisher: </strong>
      <span class="v-card__subtitle--item">{{ item.publisherName }}</span>
    </div>
    <div v-if="item.wordCount">
      <strong>Word Count: </strong>{{ item.wordCount }}
    </div>
    <div v-if="item.wordCount">
      <strong>Storage Size: </strong>{{ item.storageSize | toMB }}
    </div>
    <div v-if="item.description">
      <strong>Description: </strong> {{ item.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "book-details",
  props: ["item"],
  filters: {
    upperCase: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    },
    toMB: function(value) {
      let v = (parseInt(value) / 1024) / 1024;
      return parseFloat(v).toFixed(2) + ' MB';
    }
  },
  methods: {
    applyFilters(item, attribute, index = null, operator = ":") {
      let filters = [];
      item[attribute] = item[attribute] !== undefined ? item[attribute] : false;
      if (index !== null) {
        item[attribute] = item[attribute][index];
      } else {
        filters.push({
          attribute: attribute,
          item: item
        });
      }
      this.$store.commit("setFiltersApplied", {
        value: item[attribute],
        attribute: attribute,
        operator: operator
      });
      this.$store.dispatch("applyFilters", filters);
    }
  }
};
</script>
