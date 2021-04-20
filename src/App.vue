<template>
  <div>
    <ais-instant-search
      :index-name="$store.state.SClient.indexName"
      :search-client="$store.state.SClient.searchClient"
    >
      <pb-navbar />
      <welcome-header />
      <pb-collections />
      <section class="section-books bg-white">
        <div class="content container mx-auto px-8 py-12">
          <div class="py-12">
            <div class="section-title text-4xl mb-12 text-center mb-10">
              Find a book
            </div>
            <div class="flex flex-row flex-wrap items-end">
              <div class="left w-full md:w-3/5 mb-8">
                <div class="flex flex-row items-end">
                  <div class="w-2/3 md:w-4/5 pr-6 flex flex-row items-end">
                    <div class="border-b border-gray-300 flex flex-row w-full items-center">
                      <div class="icon">
                        <img
                          :src="assetsPath + '/icons/search.png'"
                          width="22"
                          alt=""
                        >
                      </div>
                      <div class="input w-full pr-30">
                        <input
                          type="text"
                          class="w-full text-sm py-3 px-4 focus:outline-none"
                          placeholder="Find a book"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="w-1/3 md:w-1/5">
                    <button class="w-full py-3 text-sm rounded-full text-white bg-red-700">
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div class="topFilters right w-full md:w-2/5 flex flex-row flex-wrap md:pl-10 md:mb-4">
                <div class="w-full md:w-1/2 mb-4">
                  <div class="topFilter flex flex-row w-full md:pr-4">
                    <div class="dropdown relative w-full px-5 py-4 border border-gray-300">
                      <div class="dropdown-head flex flex-row items-center justify-between w-full">
                        <div class="title text-sm">
                          Sort books by
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
                      <div class="dropdown-body hidden z-20 bg-white shadow-lg border border-gray-300 absolute top-0 left-0 w-full mt-16 text-sm">
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                        </a>
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor
                        </a>
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolor dolorum eius expedita
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/2 md:mb-4">
                  <div class="topFilter flex flex-row w-full md:pl-4">
                    <div class="dropdown relative w-full px-5 py-4 border border-gray-300">
                      <div class="dropdown-head flex flex-row items-center justify-between w-full">
                        <div class="title text-sm">
                          Sort books by
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
                      <div class="dropdown-body hidden z-20 bg-white shadow-lg border border-gray-300 absolute top-0 left-0 w-full mt-16 text-sm">
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                        </a>
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor
                        </a>
                        <a
                          class="flex py-3 px-4 border-b border-gray-300"
                          href="#!"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolor dolorum eius expedita
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-wrap">
            <!-- Filters  Start -->
            <pb-filters />
            <!-- Filters  End -->
            <div class="md:flex-col w-full md:w-3/4">
              <div class="font-semibold text-2xl mb-8">
                Results: 1889 books
              </div>
              <div class="font-semibold text-lg mb-3">
                Active Filters
              </div>
              <div class="tags flex flex-row flex-wrap">
                <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
                  <div class="text text-sm leading-none">
                    Education
                  </div>
                  <div>
                    <a
                      href="#!"
                      class="text block ml-2"
                    >
                      <img
                        :src="assetsPath + '/icons/times.png'"
                        width="14"
                        alt=""
                      >
                    </a>
                  </div>
                </div>
                <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
                  <div class="text text-sm leading-none">
                    Lorem ipsum dolor sit
                  </div>
                  <div>
                    <a
                      href="#!"
                      class="text block ml-2"
                    >
                      <img
                        :src="assetsPath + '/icons/times.png'"
                        width="14"
                        alt=""
                      >
                    </a>
                  </div>
                </div>
                <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
                  <div class="text text-sm leading-none">
                    Lorem ipsum dolor sit amet, consectetur
                  </div>
                  <div>
                    <a
                      href="#!"
                      class="text block ml-2"
                      width="14"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <books />
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
            </div>
          </div>
        </div>
      </section>
      <pb-footer />
    </ais-instant-search>
  </div>
</template>

<script>
import Books from './components/books/Books.vue';
import WelcomeHeader from './components/WelcomeHeader.vue';
import PbFooter from './components/PbFooter.vue';
import PbCollections from './components/collections/PbCollections.vue';
import PbNavbar from './components/PbNavbar.vue';
import PbFilters from './components/filters/PbFilters.vue';

export default {
  components: {
    PbFilters,
    Books,
    WelcomeHeader,
    PbFooter,
    PbCollections,
    PbNavbar
  },
  data() {
    return {
      assetsPath: '../src/assets'
    };
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>