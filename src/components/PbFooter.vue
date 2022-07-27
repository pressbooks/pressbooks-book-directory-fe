<template>
  <footer class="bg-pb-blue">
    <div class="container mx-auto p-8 lg:p-16 space-y-4">
      <div class="flex pb-8 border-b border-grey">
        <ul
          role="list"
          aria-label="Links"
          class="flex flex-col font-bold lg:flex-row w-full items-center justify-between space-y-8 lg:space-y-0"
        >
          <li
            v-for="(link, index) in links"
            :key="index"
            class="nav-item"
          >
            <a
              v-bind="link"
              target="_blank"
              rel="noopener"
              @click="sendClickInsight(link)"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
      <div class="flex w-full items-center justify-between">
        <div class="mt-1 text-sm">
          © Pressbooks 2022
          <br>
          <ais-powered-by class="inline-block" />
        </div>

        <div class="flex space-x-4">
          <pb-social-link
            v-for="(socialLink, key) in socialLinks"
            :key="key"
            v-bind="socialLink"
            @social-clicked="sendClickInsight(socialLink)"
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
      links: [
        { href: this.$store.state.config.urls.pressbooks, text: 'Pressbooks', 'aria-label': 'Pressbooks Homepage', 'data-cy': 'pressbooks-homepage' },
        { href: this.$store.state.config.urls.collections, text: 'OER Collections Hub', 'aria-label': 'OER Collections Hub', 'data-cy': 'pressbooks-collections' },
        { href: this.$store.state.config.urls.blog, text: 'Blog', 'aria-label': 'Pressbooks Blog', 'data-cy': 'pressbooks-blog' },
        { href: this.$store.state.config.urls.opensource, text: 'Pressbooks Open Source', 'aria-label': 'Pressbooks Open Source', 'data-cy': 'pressbooks-opensource' },
        { href: this.$store.state.config.urls.contact, text: 'Contact', 'aria-label': 'Contact', 'data-cy': 'pressbooks-contact' },
        { href: this.$store.state.config.urls.jobs, text: 'Work with us', 'aria-label': 'Work with us', 'data-cy': 'pressbooks-jobs' },
        { href: this.$store.state.config.urls.procurement, text: 'EDU Procurement Helpers', 'aria-label': 'EDU Procurement Helpers', 'data-cy': 'pressbooks-procurement' },
      ],
      socialLinks: [
        { href: this.$store.state.config.urls.twitter, icon: 'social-twitter.svg', name: 'Twitter'},
        { href: this.$store.state.config.urls.linkedin, icon: 'social-in.svg', name: 'Linkedin'},
        { href: this.$store.state.config.urls.youtube, icon: 'social-youtube.svg', name: 'Youtube'},
      ]
    };
  },
  methods: {
    sendClickInsight(link) {
      this.sendInsight({
        insightsMethod: 'convertedObjectIDs',
        payload: {
          eventName: 'Footer Link Clicked',
          objectIDs: [
            `link:${link.href}`
          ]
        },
      });
    }
  }
};
</script>
