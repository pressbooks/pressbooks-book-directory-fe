<template>
  <a
    class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800"
    :aria-label="`${name} Page`"
    target="_blank"
    rel="noopener"
    :data-cy="id"
    @click="$emit('social-clicked')"
  >
    <img
      :src="`/assets/icons/${icon}`"
      class="h-5 w-5"
      :alt="`${name} logo`"
    >
  </a>
</template>

<script>
export default {
  name: 'PbSocialLink',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  emits: ['social-clicked'],
  computed: {
    id() {
      return `${this.name.toLowerCase()}-social-link`;
    }
  }
};
</script>
