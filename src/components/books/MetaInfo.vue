<template>
  <li>
    <strong>{{ title }}</strong>
    <span>{{ text }}</span>
  </li>
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
