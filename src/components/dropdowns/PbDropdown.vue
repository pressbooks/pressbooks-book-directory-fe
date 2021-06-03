<template>
  <div>
    <vue-select
      :options="options"
      :placeholder="placeholder"
      :searchable="searchable"
      :clearable="clearable"
      v-model="itemSelected"
      @input="select"
    />
  </div>
</template>

<script>

export default {
  name: 'PbDropdown',
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() { return []; }
    },
    placeholder: {
      type: String,
      default: 'Options'
    },
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.itemSelected = this.options.filter((item) => {
      if (item.default) {
        return item.value;
      }
    });
  },
  data() {
    return {
      itemSelected: ''
    };
  },
  emits: ['input'],
  methods: {
    select({ value }) {
      this.$emit('input', value);
    }
  }
};
</script>
