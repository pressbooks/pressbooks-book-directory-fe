<template>
  <footer class="bg-pb-blue">
    <div class="container mx-auto lg:px-16 py-16 space-y-4">
      <div class="flex pb-8 border-b border-grey">
        <ul class="flex flex-col font-bold lg:flex-row w-full items-center justify-between space-y-8 lg:space-y-0">
          <li class="nav-item">
            <a
                :href="site"
                aria-label="Pressbooks Homepage"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-homepage"
            >
              Pressbooks
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="blog"
                aria-label="Pressbooks blog"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-blog"
            >
              Blog
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="opensource"
                aria-label="Pressbooks Open Source"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-opensource"
            >
              Pressbooks Open Source
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="contact"
                aria-label="Contact"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-contact"
            >
              Contact
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="jobs"
                aria-label="Work with us"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-jobs"
            >
              Work with us
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="accessibility"
                aria-label="Accessibility"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-accessibility"
            >
              Accessibility
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="procurement"
                aria-label="EDU Procurement Helpers"
                target="_blank"
                rel="noopener"
                data-cy="pressbooks-procurement"
            >
              EDU Procurement Helpers
            </a>
          </li>
        </ul>
      </div>
      <div class="flex w-full items-center justify-between">
        <div class="mt-1 text-sm">
          © Pressbooks 2021
        </div>
        <ais-powered-by class="inline-block" />
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
    },
    blog() {
      return this.$store.state.config.urls.blog;
    },
    opensource() {
      return this.$store.state.config.urls.opensource;
    },
    contact() {
      return this.$store.state.config.urls.contact;
    },
    jobs() {
      return this.$store.state.config.urls.jobs;
    },
    accessibility() {
      return this.$store.state.config.urls.accessibility;
    },
    procurement() {
      return this.$store.state.config.urls.procurement;
    }
  }
};
</script>
