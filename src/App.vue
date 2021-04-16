<template>
  <header class="bg-white">
    <div class="container mx-auto px-8">
      <nav class="py-2 md:py-2 flex justify-between items-center">
        <img src="src/assets/logo.png" alt="Logo">
        <button class="border border-red-700 rounded-full px-8 py-3 text-red-700 text-sm">Take the tour</button>
      </nav>
    </div>
  </header>

  <section class="section-cover">
    <div class="container mx-auto w-full md:w-3/5 py-20 px-8 text-center">
      <div class="section-title text-5xl mb-6">
        Welcome to Pressbooks Directory
      </div>
      <div class="section-summary font-pbRegular text-gray-700 mb-8 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus eaque nihil qui quia. A alias at
        atque,
        distinctio doloribus est incidunt obcaecati pariatur reprehenderit rerum. Aspernatur consectetur
        corporis
        dolorum ea, facere incidunt iusto, obcaecati odit perspiciatis porro quia, reiciendis reprehenderit?
      </div>
      <div class="searcher bg-white p-4 shadow">
        <div class="flex flex-row items-end">
          <div class="w-2/3 md:w-4/5 pr-6 flex flex-row items-end">
            <div class="border-b border-gray-300 flex flex-row w-full items-center">
              <div class="icon">
                <img src="src/assets/icons/search.png" width="22" alt="">
              </div>
              <div class="input w-full pr-30">
                <input type="text" class="w-full text-sm py-3 px-4 focus:outline-none"
                       placeholder="Find a book">
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
    </div>
  </section>

  <section class="section-cover">
    <div class="container mx-auto px-8">
      <div class="border-t border-gray-300">
        <div class="w-full mx-auto py-20 text-center">
          <div class="section-title text-4xl mb-12">
            Featured Collection
          </div>
          <div class="items flex flex-row flex-wrap items-center">
            <div class="item w-full mb-6 md:mb-0 md:w-1/5 px-3">
              <a href="#!" class="flex flex-col items-center">
                <div class="image">
                  <img src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg" width="100%" alt="">
                </div>
                <div class="text py-4 px-2 font-semibold">
                  Lorem ipsum dolor sit amet, adipisicing...
                </div>
              </a>
            </div>
            <div class="item w-full mb-6 md:mb-0 md:w-1/5">
              <a href="#!" class="flex flex-col items-center">
                <div class="image">
                  <img src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg" width="100%" alt="">
                </div>
                <div class="text py-4 px-2 font-semibold">
                  Lorem ipsum dolor sit amet, adipisicing...
                </div>
              </a>
            </div>
            <div class="item w-full mb-6 md:mb-0 md:w-1/5 px-3">
              <a href="#!" class="flex flex-col items-center">
                <div class="image">
                  <img src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg" width="100%" alt="">
                </div>
                <div class="text py-4 px-2 font-semibold">
                  Lorem ipsum dolor sit amet, adipisicing...
                </div>
              </a>
            </div>
            <div class="item w-full mb-6 md:mb-0 md:w-1/5 px-3">
              <a href="#!" class="flex flex-col items-center">
                <div class="image">
                  <img src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg" width="100%" alt="">
                </div>
                <div class="text py-4 px-2 font-semibold">
                  Lorem ipsum dolor sit amet, adipisicing...
                </div>
              </a>
            </div>
            <div class="item w-full mb-6 md:mb-0 md:w-1/5 px-3">
              <a href="#!" class="flex flex-col items-center">
                <div class="image">
                  <img src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg" width="100%" alt="">
                </div>
                <div class="text py-4 px-2 font-semibold">
                  Lorem ipsum dolor sit amet, adipisicing...
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
                    <img src="src/assets/icons/search.png" width="22" alt="">
                  </div>
                  <div class="input w-full pr-30">
                    <input type="text" class="w-full text-sm py-3 px-4 focus:outline-none"
                           placeholder="Find a book">
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
                        <img src="src/assets/icons/chev-down.png" width="16" alt="">
                      </a>
                    </div>
                  </div>
                  <div class="dropdown-body hidden z-20 bg-white shadow-lg border border-gray-300 absolute top-0 left-0 w-full mt-16 text-sm">
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                    </a>
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
                      Lorem ipsum dolor
                    </a>
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
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
                        <img src="src/assets/icons/chev-down.png" width="16" alt="">
                      </a>
                    </div>
                  </div>
                  <div class="dropdown-body hidden z-20 bg-white shadow-lg border border-gray-300 absolute top-0 left-0 w-full mt-16 text-sm">
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                    </a>
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
                      Lorem ipsum dolor
                    </a>
                    <a class="flex py-3 px-4 border-b border-gray-300" href="#!">
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
                      <img src="src/assets/icons/chev-up.png" width="16" alt="">
                    </a>
                  </div>
                </div>
              </div>
              <div class="body">
                <div class="border-t border-gray-200">
                  <a href="#!" class="flex flex-row items-center justify-between px-5 py-3">
                    <div class="title text-sm text-gray-600 w-full">
                      Education (20)
                    </div>
                    <div class="action w-6 flex flex-row justify-end">
                      <img src="src/assets/icons/check.png" width="15" alt="">
                    </div>
                  </a>
                </div>
                <div class="border-t border-gray-200">
                  <a href="#!" class="flex flex-row items-center justify-between px-5 py-3">
                    <div class="title text-sm text-gray-600 w-full">
                      Open learning, distance education (144)
                    </div>
                    <div class="action w-6 flex flex-row justify-end">
                      <img src="src/assets/icons/check.png" width="15" alt="">
                    </div>
                  </a>
                </div>
                <div class="border-t border-gray-200">
                  <a href="#!" class="flex flex-row items-center justify-between px-5 py-3">
                    <div class="title text-sm text-gray-600 w-full">
                      Chemistry (22)
                    </div>
                    <div class="action w-6 flex flex-row justify-end">

                    </div>
                  </a>
                </div>
                <div class="flex flex-row items-center justify-between px-5 py-3 border-t border-gray-200">
                  <div class="action w-full text-sm text-red-800">
                    <a href="#!" class=" uppercase py-2 block text-center">
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
                      <img src="src/assets/icons/chev-down.png" width="16" alt="">
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
                    <a href="#!" class="">
                      <img src="src/assets/icons/check.png" width="15" alt="">
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
                      <img src="src/assets/icons/chev-down.png" width="16" alt="">
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
                    <a href="#!" class="">
                      <img src="src/assets/icons/check.png" width="15" alt="">
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
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
                <a href="#!" class="text block ml-2">
                  <img src="src/assets/icons/times.png" width="14" alt="">
                </a>
              </div>
            </div>
            <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
              <div class="text text-sm leading-none">
                Lorem ipsum dolor sit
              </div>
              <div>
                <a href="#!" class="text block ml-2">
                  <img src="src/assets/icons/times.png" width="14" alt="">
                </a>
              </div>
            </div>
            <div class="tag flex flex-row items-center bg-gray-200 px-3 py-3 rounded-full mr-2 mb-2">
              <div class="text text-sm leading-none">
                Lorem ipsum dolor sit amet, consectetur
              </div>
              <div>
                <a href="#!" class="text block ml-2">
                  <img src="src/assets/icons/times.png" width="14" alt="">
                </a>
              </div>
            </div>
          </div>
          <BookCard/>
          <BookCard/>
          <BookCard/>
          <div class="pagination">
            <div class="container mx-auto py-16">
              <div class="flex flex-row w-full items-center md:w-1/2 justify-center text-gray-600">
                <div class="action pr-4 w-12">
                  <a href="#!" class="block">
                    <img src="src/assets/icons/arrow-left.png" width="100%" alt="">
                  </a>
                </div>
                <div class="page font-bold text-gray-900">
                  <a href="!" class="block px-2">
                    1
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    2
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    3
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    4
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    5
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    6
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    7
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    8
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    9
                  </a>
                </div>
                <div class="page">
                  <a href="!" class="block px-2">
                    10
                  </a>
                </div>
                <div class="action pl-4 w-12">
                  <a href="#!" class="block">
                    <img src="src/assets/icons/arrow-right.png" width="100%" alt="">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container mx-auto py-12 px-8">
      <div class="top">
        <img src="src/assets/logo-simple.png" width="170" alt="Logo">
      </div>
      <div class="bottom flex flex-row w-full items-end justify-between pt-4">
        <div class="left">
          <div class="text-sm"> © Pressbooks Directory 2021</div>
        </div>
        <div class="right">
          <div class="icons flex flex-row">
            <div class="icon px-2">
              <a href="#!"
                 class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800">
                <img src="src/assets/icons/social-twitter.svg" width="20" alt="Logo">
              </a>
            </div>
            <div class="icon px-2">
              <a href="#!"
                 class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800">
                <img src="src/assets/icons/social-in.svg" width="19" alt="Logo">
              </a>
            </div>
            <div class="icon px-2">
              <a href="#!"
                 class="flex w-8 h-8 bg-red-700 items-center justify-center rounded-full hover:bg-red-800">
                <img src="src/assets/icons/social-youtube.svg" width="20" alt="Logo">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>


</template>

<script setup>
import BookCard from "./components/BookCard.vue";
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>