<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-8">
      <nav class="py-2 md:py-2 flex justify-between items-center">
        <a href="/">
          <img
            src="/assets/logo-pressbooks-directory.svg"
            alt="Pressbooks Directory"
          >
        </a>
        <button
          class="border border-pb-red rounded-full px-8 py-3 text-pb-red text-sm border-2 font-bold"
          @click="$store.commit('showTour')"
        >
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