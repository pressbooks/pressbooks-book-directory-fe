<template>
  <p>
    <strong>{{ title }}</strong>
    <span>{{ text }}</span>
  </p>
</template>

<script>
export default {
  name: 'MetaInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
};
</script>
