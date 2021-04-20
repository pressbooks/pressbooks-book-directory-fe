<template>
  <div>
    <vue-select
      :options="options"
      :placeholder="placeholder"
      :searchable="searchable"
      :clearable="false"
    />
  </div>
</template>

<script>

export default {
  name: 'PbDropdown',
  props: {
    options: Array,
    placeholder: {
      type: String,
      default: 'Options'
    },
    searchable: {
      type: Boolean,
      default: false,
    }
  }
};
</script>