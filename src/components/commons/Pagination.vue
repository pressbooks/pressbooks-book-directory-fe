<template>
  <div class="text-center">
    <ais-pagination />
  </div>
</template>

<script>
export default {
  name: "pagination",
  methods: {
    updatePage(page) {
      console.log(page)
    }
  }
};
</script>
