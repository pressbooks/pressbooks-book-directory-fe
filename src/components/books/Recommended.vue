<template>
  <div
    data-cy="book-recommended"
    class="inline-block leading-none border border-red-900 py-2 px-3 uppercase text-sm tracking-widest font-bold rounded mb-5 mr-2"
    :class="enabled ? 'bg-red-700 text-white': 'text-pb-red border-pb-red'"
  >
    Recommended
  </div>
</template>

<script>
export default {
  name: 'Recommended',
  props: {
    enabled: {
      type: Boolean,
      default() {
        return false
      }
    },
  }
};
</script>
