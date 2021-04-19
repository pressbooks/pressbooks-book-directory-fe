<template>
  <div class="w-full md:w-1/4 md:pr-10 mb-12">
    <div class="font-semibold text-xl mb-8 md:mb-4">
      Filters:
    </div>
    <div class="filters border border-gray-300">
      <div class="filter-group border-b border-gray-300">
        <div class="heading px-5 py-3 bg-gray-200">
          <div class="flex flex-row items-center justify-between">
            <div class="title font-pbRegular">
              License
            </div>
            <div class="action">
              <a href="#!">
                <img
                  :src="assetsPath + '/icons/chev-up.png'"
                  width="16"
                  alt=""
                >
              </a>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-gray-600 w-full">
                Education (20)
              </div>
              <div class="action w-6 flex flex-row justify-end">
                <img
                  :src="assetsPath + '/icons/check.png'"
                  width="15"
                  alt=""
                >
              </div>
            </a>
          </div>
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-gray-600 w-full">
                Open learning, distance education (144)
              </div>
              <div class="action w-6 flex flex-row justify-end">
                <img
                  :src="assetsPath + '/icons/check.png'"
                  width="15"
                  alt=""
                >
              </div>
            </a>
          </div>
          <div class="border-t border-gray-200">
            <a
              href="#!"
              class="flex flex-row items-center justify-between px-5 py-3"
            >
              <div class="title text-sm text-gray-600 w-full">
                Chemistry (22)
              </div>
              <div class="action w-6 flex flex-row justify-end" />
            </a>
          </div>
          <div class="flex flex-row items-center justify-between px-5 py-3 border-t border-gray-200">
            <div class="action w-full text-sm text-red-800">
              <a
                href="#!"
                class=" uppercase py-2 block text-center"
              >
                view more
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="filter-group border-b border-gray-300">
        <div class="heading px-5 py-3">
          <div class="flex flex-row items-center justify-between">
            <div class="title font-pbRegular">
              Subject
            </div>
            <div class="action">
              <a href="#!">
                <img
                  :src="assetsPath + '/icons/chev-down.png'"
                  width="16"
                  alt=""
                >
              </a>
            </div>
          </div>
        </div>
        <div class="body hidden">
          <div class="flex flex-row items-center justify-between px-5 py-3 border-t border-gray-200">
            <div class="title text-sm text-gray-600 w-full">
              Education (20)
            </div>
            <div class="action w-6 flex flex-row justify-end">
              <a
                href="#!"
                class=""
              >
                <img
                  :src="assetsPath + '/icons/check.png'"
                  width="15"
                  alt=""
                >
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-group border-b border-gray-300">
        <div class="heading px-5 py-3">
          <div class="flex flex-row items-center justify-between">
            <div class="title font-pbRegular">
              Network
            </div>
            <div class="action">
              <a href="#!">
                <img
                  :src="assetsPath + '/icons/chev-down.png'"
                  width="16"
                  alt=""
                >
              </a>
            </div>
          </div>
        </div>
        <div class="body hidden">
          <div class="flex flex-row items-center justify-between px-5 py-3 border-t border-gray-200">
            <div class="title text-sm text-gray-600 w-full">
              Education (20)
            </div>
            <div class="action w-6 flex flex-row justify-end">
              <a
                href="#!"
                class=""
              >
                <img
                  :src="assetsPath + '/icons/check.png'"
                  width="15"
                  alt=""
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PbFilters',
  data() {
    return {
      assetsPath: '../src/assets'
    };
  }
};
</script>