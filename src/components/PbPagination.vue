<template>
  <div class="pagination">
    <div class="container mx-auto py-16">
      <div class="flex flex-row w-full items-center md:w-1/2 justify-center text-gray-600">
        <div class="action pr-4 w-12">
          <a
            href="#!"
            class="block"
          >
            <img
              :src="assetsPath + '/icons/arrow-left.png'"
              width="100%"
              alt=""
            >
          </a>
        </div>
        <div class="page font-bold text-gray-900">
          <a
            href="!"
            class="block px-2"
          >
            1
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            2
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            3
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            4
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            5
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            6
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            7
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            8
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            9
          </a>
        </div>
        <div class="page">
          <a
            href="!"
            class="block px-2"
          >
            10
          </a>
        </div>
        <a
          href="#!"
          class="block"
        >
          <img
            :src="assetsPath + '/icons/arrow-right.png'"
            width="100%"
            alt=""
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbPagination',
  data() {
    return {
      assetsPath: '../src/assets'
    };
  }
};
</script>