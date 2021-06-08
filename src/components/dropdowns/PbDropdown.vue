<template>
  <div>
    <vue-select
      v-model="itemSelected"
      :options="options"
      :placeholder="placeholder"
      :searchable="searchable"
      :clearable="clearable"
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
  emits: ['input'],
  data() {
    return {
      itemSelected: ''
    };
  },
  mounted() {
    this.itemSelected = this.options.filter((item) => {
      if (item.default) {
        return item.value;
      }
    });
  },
  methods: {
    select({ value }) {
      this.$emit('input', value);
    }
  }
};
</script>
