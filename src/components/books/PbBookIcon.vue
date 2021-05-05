<template>
  <li>
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
  }
};
</script>
