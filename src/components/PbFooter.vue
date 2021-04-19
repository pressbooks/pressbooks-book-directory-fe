<template>
  <footer>
    <div class="container mx-auto py-12 px-8">
      <div class="top">
        <img
          :src="assetsPath + '/logo-simple.png'"
          width="170"
          alt="Logo"
        >
      </div>
      <div class="bottom flex flex-row w-full items-end justify-between pt-4">
        <div class="left">
          <div class="text-sm">
            © Pressbooks Directory 2021
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
