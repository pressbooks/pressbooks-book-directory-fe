<template>
  <li class="mb-2">
    <strong class="font-pbBold">{{ `${title} ` }}</strong>
    <span class="font-pbRegular text-red-600 ricardo">{{ text }}</span>
  </li>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  title: String,
  text: String
});
</script>