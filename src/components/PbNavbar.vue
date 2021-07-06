<template>
  <header class="shadow">
    <div class="container mx-auto px-4 sm:px-8">
      <nav class="py-4 flex justify-between items-center space-x-4">
        <a
          href="/"
          title="Home Page"
          data-cy="return-home-button"
        >
          <img
            src="/assets/logo-pressbooks-directory.svg"
            alt="Pressbooks Directory"
            class="h-full w-auto"
          >
        </a>
        <button
          class="border-pb-red rounded-full px-8 py-3 text-pb-red text-sm border-2 font-bold"
          @click="startTour"
        >
          Take the tour
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PbNavbar',
  methods: {
    startTour() {
      this.sendFilterAppliedInsight(
        ['tour:opened'],
        'Start Tour Button Clicked'
      );
      this.$store.commit('showTour');
    },
  }
};
</script>
