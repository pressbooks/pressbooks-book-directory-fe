<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4 sm:px-8">
      <nav class="py-4 flex justify-between items-center space-x-4">
        <a href="#">
          <img
            src="/assets/logo-pressbooks-directory.svg"
            alt="Pressbooks Directory"
            class="h-full w-auto"
          >
        </a>
        <!-- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 focus:ring-opacity-75 -->
        <button class="border border-red-700 bg-white font-semibold rounded-full py-3 px-4 text-sm text-red-700 sm:px-6">
          Take the tour
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PbNavbar'
};
</script>
