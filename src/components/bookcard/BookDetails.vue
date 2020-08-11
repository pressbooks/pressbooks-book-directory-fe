<template>
  <div>
    <div v-if="item.author && item.author.length > 0">
      <strong>Author(s): </strong>
      <span
        v-for="(author, index) in item.author"
        :key="index"
      >
        <span v-if="index != 0">, </span>
        <span class="v-card--item author">{{ author }}</span>
      </span>
    </div>
    <div v-if="item.editor && item.editor.length > 0">
      <strong>Editor(s): </strong>
      <span
        v-for="(editor, index) in item.editor"
        :key="index"
      >
        <span v-if="index != 0">, </span>
        <span class="v-card--item editor">{{ editor }}</span>
      </span>
    </div>
    <div
      v-if="item.about"
      class="subject"
    >
      <strong>Subject(s): </strong>
      <span
        v-for="(about, index) in item.about"
        :key="index"
      >
        <span v-if="index != 0">, </span>
        <span class="v-card--item">{{ about }}</span>
      </span>
    </div>
    <div
      v-if="item.has_lastUpdated"
      class=""
    >
      <strong>Updated: </strong>
      <span class="v-card--item updated">{{ unixDateToStandard(item.lastUpdated) }}</span>
    </div>
    <div v-if="item.publisher_name">
      <strong>Publisher: </strong>
      <span class="v-card--item publisher">{{ item.publisherName }}</span>
    </div>
    <div v-show="item.wordCount">
      <strong>Word Count: </strong><span class="v-card--item ais-Hits__books-book-wordcount">{{ item.wordCount }}</span>
    </div>
    <div v-if="item.storageSize">
      <strong>Storage Size: </strong><span class="v-card--item ais-Hits__books-book-storagesize">{{ toMB(item.storageSize) }}</span>
    </div>
    <div v-if="item.description">
      <strong>Description: </strong><span class="v-card--item description">{{ item.description }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BookDetails',
    props: {
        item: {
            type: Object,
            default () { return {}; }
        }
    },
    methods: {
        upperCase(value) {
            if (!value) return '';
            value = value.toString();
            return value.toUpperCase();
        },
        toMB(value) {
            let v = (parseInt(value) / 1024) / 1024;
            return parseFloat(v).toFixed(2) + ' MB';
        },
        unixDateToStandard(unixDate) {
            let date = new Date(unixDate * 1000);
            let month = parseInt(date.getUTCMonth()) + 1, day = parseInt(date.getUTCDay()) + 1;
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return month + '-' + day + '-' + date.getUTCFullYear();
        },
        applyFilters(item, attribute, index = null, operator = ':') {
            let filters = [];
            item[attribute] = item[attribute] !== undefined ? item[attribute] : false;
            if (index !== null) {
                item[attribute] = item[attribute][index];
            } else {
                filters.push({
                    attribute,
                    item
                });
            }
            this.$store.commit('setFiltersApplied', {
                value: item[attribute],
                attribute,
                operator
            });
            this.$store.dispatch('applyFilters', filters);
        }
    }
};
</script>
