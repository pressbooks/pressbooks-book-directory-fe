<template>
  <section aria-labelledby="welcome-section-title">
    <div class="container mx-auto w-full md:w-2/3 p-8">
      <h1
        id="welcome-section-title"
        class="section-title text-4xl mb-8 font-bold text-center"
      >
        Welcome to Pressbooks Directory
      </h1>

      <p class="font-serif leading-7 text-lg">
        Pressbooks Directory provides a free, searchable index of <strong data-cy="total-books-indexed">{{ numberFormat(totalBooksIndexed) }}</strong> open access books published across <strong data-cy="total-networks-indexed">{{ numberFormat(totalNetworksIndexed) }}</strong> Pressbooks
        networks. It's easy to copy, revise, remix, and redistribute any openly licensed content found here using Pressbooks' publishing platform.
      </p>

      <div class="flex items-center justify-center mt-4 mx-auto">
        <button
          class="border-pb-red rounded-full text-lg py-3 px-6 text-pb-red border-2 font-semibold mr-6"
          @click="startTour"
        >
          Tour the Directory
        </button>
        <a
          :href="site"
          target="_blank"
          rel="noopener"
          class="inline-block text-center text-lg py-3 px-6 border-2 border-red-700 text-white bg-red-700 font-semibold rounded-full"
          data-cy="learn-about-pressbooks"
          @click="sendWelcomeCTAInsight"
        >
          Learn more about Pressbooks
        </a>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'PbWelcomeHeader',
  data() {
    return {
      numberFormat: this.$filters.numberFormat,
    };
  },
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
  },
  methods: {
    startTour() {
      this.sendInsight(
        ['tour:opened'],
        'Start Tour Button Clicked'
      );
      this.$store.commit('showTour');
    },
    sendWelcomeCTAInsight() {
      this.sendInsight({
        insightsMethod: 'convertedObjectIDs',
        payload: {
          eventName: 'Welcome CTA Clicked',
          objectIDs: [
            `link:${this.site}`
          ]
        },
      });
    },
  }
};
</script>
