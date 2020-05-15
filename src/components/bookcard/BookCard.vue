<template>
  <section>
    <div
      class="book-image"
      :style="`background-image: url('${item.image}');`"
    ></div>
    <div class="book-data">
      <icons-filter :item="item"></icons-filter>
      <book-details :item="item"></book-details>
    </div>
  </section>
</template>

<script>
import "../../App.css";
import IconsFilter from "./IconsFilter";
import BookDetails from "./BookDetails";

export default {
  name: "book-card",
  components: {
    BookDetails,
    IconsFilter
  },
  props: ["item"],
  methods: {
    applyFilters(item, attribute, index = null) {
      let params = {
        item: item,
        attribute: attribute,
        index: index
      };
      this.$store.dispatch('applyFilters', [params]);
    }
  }
};
</script>
