<template>
  <section class="section-cover">
    <div class="container mx-auto w-full md:w-2/3 pt-8 px-8">
      <h1 class="section-title text-5xl mb-8 font-bold text-center">
        Welcome to Pressbooks Directory
      </h1>

      <p class="font-serif text-gray-700 leading-7 text-xl">
        This directory provides an index of <strong data-cy="total-books-indexed">{{ totalBooksIndexed }}</strong> books published across <strong data-cy="total-networks-indexed">{{ totalNetworksIndexed }}</strong> Pressbooks
        networks. Learn to use the Directory by taking the self-guided tour in the top nav bar or reading
        <a
          :href="guide"
          class="pb-dark-blue underline"
          target="_blank"
          rel="noopener"
        >our guide</a>.
      </p>

      <p class="mt-4 font-serif text-gray-700 leading-7 text-xl">
        Pressbooks Directory is more powerful when paired with a PressbooksEDU Authoring & Editing Platform, which allows you to clone, revise, remix, and redistribute all of the openly licensed content found through this Directory.
      </p>

      <div class="flex items-center justify-center mt-4 mx-auto">
        <a
          :href="site"
          target="_blank"
          rel="noopener"
          class="inline-block text-center text-lg py-3 px-6 border-2 border-red-700 text-white bg-red-700 font-semibold capitalize rounded-full"
          data-cy="learn-about-pressbooks"
        >
          Learn more about PressbooksEDU
        </a>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'PbWelcomeHeader',
  computed: {
    guide() {
      return this.$store.state.config.urls.guide;
    },
    site() {
      return this.$store.state.config.urls.pressbooks;
    },
    totalBooksIndexed() {
      return this.$store.state.stats.numberOfBooksIndexed;
    },
    totalNetworksIndexed() {
      return this.$store.state.stats.numberOfNetworksIndexed;
    },
  }
};
</script>
