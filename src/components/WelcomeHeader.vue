<template>
  <section class="section-cover">
    <div class="container mx-auto w-full md:w-3/5 pt-12 px-8">
      <h1 class="section-title text-5xl mb-6 font-headings font-bold text-center">
        Welcome to Pressbooks Directory
      </h1>
      <p class="section-summary font-pbRegular text-gray-700 leading-7 text-xl">
        This directory provides an index of <strong>8888</strong> books published across <strong>95</strong> Pressbooks
        networks. Learn to use the Directory by taking the self-guided tour in the top nav bar or reading
        <a href="https://networkmanagerguide.pressbooks.com/chapter/how-to-use-the-pressbooks-directory/">our guide</a>.
      </p>

      <p class="mt-4 section-summary font-pbRegular text-gray-700 leading-7 text-xl">
        Pressbooks Directory is more powerful when paired with a PressbooksEDU Authoring & Editing Platform, which allows you to clone, revise, remix, and redistribute all of the openly licensed content found through this Directory.
      </p>

      <div class="flex items-center justify-center pt-12 mx-auto">
        <a
          :href="site"
          target="_blank"
          rel="noopener"
          class="inline-block text-center text-lg py-3 px-6 border-2 border-red-700 text-white bg-red-700 font-extrabold capitalize rounded-full"
        >
          Learn more about PressbooksEDU
        </a>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'WelcomeHeader',
  data() {
    return {
      site: import.meta.env.VITE_PRESSBOOKS_SITE,
    }
  }
};
</script>
