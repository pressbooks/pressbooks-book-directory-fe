<template>
  <div>
    <v-select
      :model-value="itemSelected"
      :options="options"
      :placeholder="placeholder"
      :searchable="searchable"
      :clearable="clearable"
      :disabled="disabled"
      @update:modelValue="select"
    />
  </div>
</template>

<script>

import vSelect from 'vue-select';

export default {
  name: 'PbDropdown',
  components: {
    vSelect
  },
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: 'Options'
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
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
    select(event)  {
      this.itemSelected = event;
      this.$emit('update:modelValue', event.value);
    }
  },
};
</script>
