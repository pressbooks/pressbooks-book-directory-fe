<template>
  <div class="v-card__details">
    <div
      v-if="item.author && item.author.length > 0"
      class="author"
    >
      <strong>Author(s): </strong>
      <span
        v-for="(author, index) in item.author"
        :key="index"
      >
        <span v-if="index != 0">, </span>
        <span
          class="v-card--item author"
          v-html="author"
        ></span>
      </span>
    </div>
    <div
      v-if="item.editor && item.editor.length > 0"
      class="editor"
    >
      <strong>Editor(s): </strong>
      <span
        v-for="(editor, index) in item.editor"
        :key="index"
      >
        <span v-if="index != 0">, </span>
        <span class="v-card--item editor" v-html="editor"></span>
      </span>
    </div>
    <div
      v-if="item.about"
      class="subjects"
    >
      <strong>Subject(s): </strong>
      <span
        v-for="(about, index) in item.about"
        :key="index"
        class="v-card--item subject"
      >
        <span v-if="index != 0">, </span>
        <span class="v-card--item subject">{{ about }}</span>
      </span>
    </div>
    <div
      v-if="item.has_lastUpdated"
      class="updated"
    >
      <strong>Updated: </strong>
      <span class="v-card--item updated">{{ unixDateToStandard(item.lastUpdated) }}</span>
    </div>
    <div
      v-if="item.publisher_name"
      class="publisher"
    >
      <strong>Publisher: </strong>
      <span class="v-card--item publisher" v-html="item.publisherName"></span>
    </div>
    <div
      v-show="item.wordCount"
      class="wordcount"
    >
      <strong>Word Count: </strong><span class="v-card--item ais-Hits__books-book-wordcount">{{ item.wordCount }}</span>
    </div>
    <div
      v-if="item.storageSize"
      class="storagesize"
    >
      <strong>Storage Size: </strong><span class="v-card--item ais-Hits__books-book-storagesize">{{ toMB(item.storageSize) }}</span>
    </div>
    <div
      v-if="item.description"
      class="description"
    >
      <strong>Description: </strong><span class="v-card--item description" v-html="item.description"></span>
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
      let month = parseInt(date.getUTCMonth()) + 1, day = parseInt(date.getUTCDate());
      month = month < 10 ? '0' + month : month;
      return month + '-' + day + '-' + date.getUTCFullYear();
    }
  }
};
</script>
