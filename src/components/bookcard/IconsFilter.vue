<template>
  <div class="book-icons book-data-row">
    <div
      class="book-language book-icons-row"
      v-if="item.lang"
      @click="applyFilters(item, 'inLanguage')"
    >
      {{ item.lang }}
    </div>
    <div class="book-license book-icons-row">
      <img
        :src="item.licenseIcon"
        :title="item.licenseAlt"
        class="book-img-icons"
        v-if="item.licenseIcon"
        @click="applyFilters(item, 'license_name')"
      />
    </div>
    <div class="book-isclone book-img-icons book-icons-row">
      <img
        :src="baseIcon(item.isBasedOn).img"
        :title="baseIcon(item.isBasedOn).alt"
        class="book-img-icons"
        @click="applyFilters(item, 'has_isBasedOn')"
      />
    </div>
  </div>
</template>

<script>
import "../../App.css";
export default {
  name: "icons-filter",
  props: ["item"],
  methods: {
    applyFilters(item, attribute, comparator = ":") {
      if (this.$store.state.SClient.filtersApplied[attribute] === undefined) {
        let filters = [];
        item[attribute] =
          item[attribute] !== undefined ? item[attribute] : false;
        filters.push({
          attribute: attribute,
          item: item
        });
        this.$store.commit("setFiltersApplied", {
          value: item[attribute],
          attribute: attribute,
          comparator: comparator
        });
        this.$store.dispatch("applyFilters", filters);
      }
    },
    baseIcon(isBasedOn) {
      return {
        img: isBasedOn
          ? this.$store.state.config.imagesPath + "is-child.png"
          : this.$store.state.config.imagesPath + "is-base.png",
        alt: isBasedOn ? "Based on other book" : "Is not based on another book"
      };
    }
  }
};
</script>
