<template>
  <li
    :data-cy="testId"
    class="w-full p-2 block"
  >
    <img
      :src="icon"
      :alt="alt"
      class="h-5"
    >
  </li>
</template>

<script>
export default {
  name:'PbBookIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    testId: {
      type: String,
      default: ''
    },
  }
};
</script>