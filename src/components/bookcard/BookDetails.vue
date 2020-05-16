<template>
    <div class="book-data-row">
        <div class="book-title">
            {{ item.name }}
        </div>
        <div class="book-details">
            <div class="book-data-details-row">
                <strong>Author(s): </strong>
                <span v-for="(author, index) in item.author" v-bind:key="index">
              <span v-if="index != 0">, </span>
              <span
                  class="cursor-pointer"
                  @click="applyFilters(item, 'author', index)"
              >
                {{ author }}
              </span>
            </span>
            </div>
            <div
                class="book-data-row"
                v-if="item.editor && item.editor.length > 0"
            >
                <strong>Editor(s): </strong>
                <span v-for="(editor, index) in item.editor" v-bind:key="index">
              <span v-if="index != 0">, </span>
              <span
                  class="cursor-pointer"
                  @click="applyFilters(item, 'editor', index)"
              >
                {{ editor }}
              </span>
            </span>
            </div>
            <div class="book-details-row" v-if="item.subject">
                <strong>Subject(s): </strong> {{ item.subject }}
            </div>
            <div
                v-if="item.publisher_name"
                @click="applyFilters(item, 'publisher_name')"
            >
                <strong>Publisher: </strong>
                <span class="book-details-row cursor-pointer">{{
              item.publisherName
            }}</span>
            </div>
            <div class="book-details-row" v-if="item.wordCount">
                <strong>Word Count: </strong> {{ item.wordCount }}
            </div>
            <div class="book-details-row" v-if="item.storageSize">
                <strong>Storage Size: </strong> {{ item.storageSize }}
            </div>
            <div class="book-details-row" v-if="item.description">
                <strong>Description: </strong> {{ item.description }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "book-details",
    props: ["item"],
    methods: {
        applyFilters(item, attribute, operator = ':') {
            let filters = [];
            item[attribute] = (item[attribute] !== undefined) ? item[attribute] : false;
            filters.push({
                attribute: attribute,
                item: item
            });
            this.$store.commit('setFiltersApplied', {value: item[attribute], attribute: attribute, operator: operator});
            this.$store.dispatch('applyFilters', filters);
        },
    }
}
</script>