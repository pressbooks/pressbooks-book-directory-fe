<template>
  <div
    class="relative w-full md:w-1/2 text-right"
    data-cy="share-component"
  >
    <button
      class="inline-flex items-center pl-3 py-0"
      data-cy="share-button"
      @click="toggle"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="#00243a"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      /></svg>
      <span class="ml-3 font-sans text-pb-dark-blue font-bold">Share this query</span>
    </button>
    <div
      v-if="isOpen"
      data-cy="share-box"
      class="bg-pb-dark-blue absolute block z-30 right-0 w-full right-0 p-6 -top-4 shadow-lg"
    >
      <button
        class="absolute right-0 top-0"
        @click="close"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="#fff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        /></svg>
      </button>
      <div class="flex flex-row border-2 w-full">
        <input
          data-cy="share-input"
          class="w-full border-0 text-sm py-3 px-4 focus:outline-none focus:ring-0"
          name="share-query"
          :value="currentUrl"
        >
        <button
          data-cy="share-copy-button"
          class="border-1 border-pb-dark-blue px-3 inline-flex items-center"
          @click="copyToClipboard"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#fff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          /></svg>
          <span class="text-white">{{ copyButtonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbShare',
  data() {
    return {
      isOpen: false,
      isCopied: false,
      btnText: 'Copy'
    };
  },
  computed: {
    currentUrl() {
      return window.location;
    },
    copyButtonText() {
      return this.isCopied? 'Copied' : 'Copy';
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
      this.isCopied = false;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.currentUrl).then(()=> {
        this.isCopied = true;
        setTimeout(()=>{
          this.close();
        },2000);
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }
};
</script>
