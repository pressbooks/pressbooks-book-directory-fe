<template>
  <header
    id="header"
    class="header shadow"
  >
    <nav class="bg-white border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto items-center w-[calc(100%-160px)] max-w-[1180px] lg:max-w-[1440px] py-[30px]">
        <a
          href="https://pressbooks.com/"
          title="Pressbooks Home Page"
          data-cy="return-home-button"
          class="flex items-center"
        >
          <img
            src="https://pressbooks.com/wp-content/themes/pressbooks/dist/images/svg/logos/pressbooks_logo.svg"
            alt="Pressbooks logo"
            class="logo h-[27px] w-auto mr-3"
          >
        </a>
        <button
          id="toggle-navbar-top"
          data-collapse-toggle="navbar-top"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-9 h-9"
            aria-hidden="true"
            fill="black"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          /></svg>
        </button>
        <div
          id="navbar-top"
          class="hidden w-full lg:block lg:w-auto"
        >
          <ul class="font-medium flex items-center flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white">
            <li>
              <a
                href="https://pressbooks.com/our-products"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:underline lg:p-0 font-bold text-[17px]"
              >Products</a>
            </li>
            <li>
              <a
                href="https://pressbooks.com/plans-pricing/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:underline lg:p-0 font-bold text-[17px]"
              >Plans & Pricing</a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:underline lg:p-0 font-bold text-[17px]"
              >Pressbooks Directory</a>
            </li>
            <li>
              <a
                href="https://pressbooks.com/about/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:underline lg:p-0 font-bold text-[17px]"
              >About</a>
            </li>
            <li class="lg:inline-block lg:text-center lg:border-2 lg:border-red-700 lg:text-white lg:bg-red-700 lg:rounded-full lg:leading-[17px] lg:hover:bg-red-900 lg:hover:border-red-900">
              <a
                href="https://pressbooks.com/request-a-pressbooks-demo/"
                class="block py-2 pl-3 pr-4 lg:text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:underline lg:py-3 lg:px-6 font-bold text-[17px]"
              >Get a demo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { Collapse } from 'flowbite';

const $targetEl = document.getElementById('navbar-top');
const $triggerEl = document.getElementById('toggle-navbar-top');
const collapse = new Collapse($targetEl, $triggerEl);
</script>
