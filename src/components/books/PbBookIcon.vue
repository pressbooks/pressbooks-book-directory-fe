<template>
  <li
    :data-cy="dataCy"
    class="w-full p-2 block"
  >
    <img
      :src="icon"
      :alt="alt"
      class="h-6"
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
    dataCy: {
      type: String,
      default: ''
    },
  }
};
</script>
