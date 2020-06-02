<template>
  <div>
    <strong>Author(s): </strong>
    <span v-for="(author, index) in item.author" v-bind:key="index">
      <span v-if="index != 0">, </span>
      <span class="cursor-pointer" @click="applyFilters(item, 'author', index)">
        {{ author }}
      </span>
    </span>
    <div v-if="item.editor && item.editor.length > 0">
      <strong>Editor(s): </strong>
      <span v-for="(editor, index) in item.editor" v-bind:key="index">
        <span v-if="index != 0">, </span>
        <span
          class="v-card__subtitle--cursor-pointer"
          @click="applyFilters(item, 'editor', index)"
        >
          {{ editor }}
        </span>
      </span>
    </div>
    <div v-if="item.subject">
      <strong>Subject(s): </strong> {{ item.subject }}
    </div>
    <div
      v-if="item.publisher_name"
      class="v-card__subtitle--cursor-pointer"
      @click="applyFilters(item, 'publisher_name')"
    >
      <strong>Publisher: </strong>
      <span class="v-card__subtitle--cursor-pointer">{{ item.publisherName }}</span>
    </div>
    <div
      v-if="item.inLanguage"
      @click="applyFilters(item, 'inLanguage')"
      class="v-card__subtitle--cursor-pointer"
    >
      <strong>Language: </strong> {{ item.inLanguage | upperCase }}
    </div>
    <div v-if="item.h5pActivities">
      <strong>H5P Activities: </strong> {{ item.h5pActivities }}
    </div>
    <div v-if="item.has_isBasedOn">
      <strong>Based On: </strong> {{ item.isBasedOn }}
    </div>
    <div v-if="item.wordCount">
      <strong>Word Count: </strong> {{ item.wordCount }}
    </div>
    <div v-if="item.storageSize">
      <strong>Storage Size: </strong> {{ item.storageSize }}
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
