<template>
  <footer>
    <div class="container mx-auto py-12 px-8">
      <div class="top">
        <a
          href="https://pressbooks.com"
          aria-label="Pressbooks Homepage"
        >
          <img
            :src="assetsPath + '/logo-color.svg'"
            width="170"
            alt="Pressbooks logo"
            class="inline float-left mr-8"
          >
        </a>
        <a
          href="https://www.algolia.com/"
          aria-label="Search by Algolia"
          target="_blank"
          class="float-left"
        >
          <img
            :src="assetsPath + '/search-by-algolia.svg'"
            width="170"
            alt="Search by Algolia"
            class="inline float-left"
          >
        </a>
      </div>
      <div class="bottom flex flex-row w-full items-end justify-between pt-4">
        <div class="left">
          <div class="text-sm">
            © Pressbooks 2021
          </div>
        </div>
        <div class="right">
          <div class="icons flex flex-row">
            <div class="icon px-2">
              <a
                href="#!"
                class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800"
              >
                <img
                  :src="assetsPath + '/icons/social-twitter.svg'"
                  width="20"
                  alt="Logo"
                >
              </a>
            </div>
            <div class="icon px-2">
              <a
                href="#!"
                class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800"
              >
                <img
                  :src="assetsPath + '/icons/social-in.svg'"
                  width="19"
                  alt="Logo"
                >
              </a>
            </div>
            <div class="icon px-2">
              <a
                href="#!"
                class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800"
              >
                <img
                  :src="assetsPath + '/icons/social-youtube.svg'"
                  width="20"
                  alt="Logo"
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PbFooter',
  data() {
    return {
      assetsPath: '../../src/assets',
    };
  }
};
</script>
