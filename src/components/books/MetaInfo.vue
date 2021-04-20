<template>
  <li>
    <strong class="font-pbBold">{{ title }}</strong>
    <span class="font-pbRegular text-red-600">{{ text }}</span>
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