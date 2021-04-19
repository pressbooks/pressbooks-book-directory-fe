<template>
  <header class="bg-white">
    <div class="container mx-auto px-8">
      <nav class="py-2 md:py-2 flex justify-between items-center">
        <img
          :src="assetsPath + '/logo.png'"
          alt="Logo"
        >
        <button class="border border-red-700 rounded-full px-8 py-3 text-red-700 text-sm">
          Take the tour
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PbNavbar',
  data() {
    return {
      assetsPath: '../../src/assets',
    };
  }
};
</script>