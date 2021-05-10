<template>
  <footer class="bg-pb-blue">
    <div class="container mx-auto py-12 px-8 space-y-4">
      <div class="flex items-center space-x-6">
        <a
          :href="site"
          aria-label="Pressbooks Homepage"
          class="inline-block"
          target="_blank"
          rel="noopener"
          data-cy="pressbooks-homepage"
        >
          <img
            src="/assets/logo-color.svg"
            alt="Pressbooks logo"
            class="w-40"
          >
        </a>
        <ais-powered-by class="inline-block" />
      </div>
      <div class="flex w-full items-center justify-between">
        <div class="mt-1 text-sm">
          © Pressbooks 2021
        </div>
        <div class="flex space-x-4">
          <pb-social-link
            v-for="(socialLink, key) in socialLinks"
            :key="key"
            :href="socialLink.href"
            :icon="socialLink.icon"
            :name="socialLink.name"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import PbSocialLink from './PbSocialLink.vue';

export default {
  name: 'PbFooter',
  components: {PbSocialLink},
  data() {
    return {
      socialLinks: [
        { href: this.$store.state.config.urls.twitter, icon: 'social-twitter.svg', name: 'Twitter'},
        { href: this.$store.state.config.urls.linkedin, icon: 'social-in.svg', name: 'Linkedin'},
        { href: this.$store.state.config.urls.youtube, icon: 'social-youtube.svg', name: 'Youtube'},
      ]
    };
  },
  computed: {
    site() {
      return this.$store.state.config.urls.pressbooks;
    }
  }
};
</script>
