<template>
  <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
    <div class="text text-sm leading-none">
      {{ name }}
    </div>
    <div>
      <button class="text block ml-2">
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbSelectedFilter',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>