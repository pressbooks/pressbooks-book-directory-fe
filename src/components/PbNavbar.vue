<template>
  <header
    id="header"
    class="header shadow"
  >
    <nav
      aria-label="primary-nav"
      class="bg-white border-gray-200 max-w-[1140px] m-auto px-8"
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-[30px]">
        <a
          href="https://pressbooks.com/"
          title="Pressbooks Home Page"
          data-cy="return-home-button"
          class="flex items-center"
        >
          <img
            src="/assets/images/logo-color.svg"
            alt="Pressbooks logo"
            class="logo h-[29px] w-auto mr-3"
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
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          id="navbar-top"
          class="hidden w-full lg:block lg:w-auto"
        >
          <ul class="font-medium flex items-start lg:items-center gap-4 flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:mt-0 lg:border-0 lg:bg-white">
            <li
              class="group relative"
              role="menu"
              @mouseleave="hideSubmenu('products')"
            >
              <a
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
                class="flex gap-0.5 items-center py-2 pl-3 pr-4 text-pb-dark-blue rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pb-red lg:p-0 font-semibold text-[18px]"
                @keydown.enter.prevent="toggleSubmenu('products')"
                @keydown.space.prevent="toggleSubmenu('products')"
                @focus="showSubmenu('products')"
                @mouseover="showSubmenu('products')"
              >
                Products
                <span class="ml-1">
                  <svg
                    class="size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <g />
                    <path
                      d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
                      fill="#000000"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('products')"
                id="products"
                ref="products"
                class="absolute bg-white shadow-lg -mt-1 rounded-lg p-4 space-y-2 z-50 min-w-60"
                role="menu"
              >
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/enterprise/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Enterprise</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/self-publisher/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Self-Publisher</a>
                </li>
                <li role="menuitem">
                  <a
                    href="/"
                    class="text-gray-500 font-semibold text-[18px]"
                    @blur="hideSubmenu('products')"
                  >Pressbooks Directory</a>
                </li>
              </ul>
            </li>
            <li
              class="group relative"
              @mouseleave="hideSubmenu('plans')"
            >
              <a
                aria-haspopup="true"
                aria-expanded="false"
                href="https://pressbooks.com/plans-pricing/"
                class="flex gap-0.5 items-center py-2 pl-3 pr-4 text-pb-dark-blue rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pb-red lg:p-0 font-semibold text-[18px]"
                @keydown.enter.prevent="toggleSubmenu('plans')"
                @keydown.space.prevent="toggleSubmenu('plans')"
                @focus="showSubmenu('plans')"
                @mouseover="showSubmenu('plans')"
              >
                Plans & Pricing
                <span class="ml-1">
                  <svg
                    class="size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <g />
                    <path
                      d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
                      fill="#000000"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('plans')"
                id="plans"
                ref="plans"
                class="absolute group-hover:block bg-white shadow-lg -mt-1 rounded-lg p-4 space-y-2 z-50 min-w-60"
                role="menu"
              >
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/educational-institutions-plans-and-pricing/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Enterprise Networks</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/self-publisher-plans-and-pricing/"
                    class="text-gray-500 font-semibold text-[18px]"
                    @blur="hideSubmenu('plans')"
                  >Self-Publisher Plans</a>
                </li>
              </ul>
            </li>
            <li
              class="group relative"
              @mouseleave="hideSubmenu('resources')"
            >
              <a
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
                class="flex gap-0.5 items-center py-2 pl-3 pr-4 text-pb-dark-blue rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pb-red lg:p-0 font-semibold text-[18px]"
                @keydown.enter.prevent="toggleSubmenu('resources')"
                @keydown.space.prevent="toggleSubmenu('resources')"
                @focus="showSubmenu('resources')"
                @mouseover="showSubmenu('resources')"
              >
                Resources
                <span class="ml-1">
                  <svg
                    class="size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <g />
                    <path
                      d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
                      fill="#000000"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('resources')"
                id="resources"
                ref="resources"
                class="absolute group-hover:block bg-white shadow-lg -mt-1 rounded-lg p-4 space-y-2 z-50 min-w-60"
                role="menu"
              >
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/collections-hub/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Collections Hub</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/category/success-stories/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Success Stories</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/pressbooks-blog/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Blog</a>
                </li>
                <li role="menuitem">
                  <a
                    href="/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Pressbooks Directory</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/support/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Support Guides</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/webinars/"
                    class="text-gray-500 font-semibold text-[18px]"
                    @blur="hideSubmenu('resources')"
                  >Events & Webinars</a>
                </li>
              </ul>
            </li>
            <li
              class="group relative"
              @mouseleave="hideSubmenu('about')"
            >
              <a
                aria-haspopup="true"
                aria-expanded="false"
                href="https://pressbooks.com/about/"
                class="flex gap-0.5 items-center py-2 pl-3 pr-4 text-pb-dark-blue rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pb-red lg:p-0 font-semibold text-[18px]"
                @keydown.enter.prevent="toggleSubmenu('about')"
                @keydown.space.prevent="toggleSubmenu('about')"
                @focus="showSubmenu('about')"
                @mouseover="showSubmenu('about')"
              >
                About
                <span class="ml-1">
                  <svg
                    class="size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <g />
                    <path
                      d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
                      fill="#000000"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('about')"
                id="about"
                ref="about"
                class="absolute group-hover:block bg-white shadow-lg -mt-1 rounded-lg p-4 space-y-2 z-50 min-w-60"
                role="menu"
              >
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/about/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >About Pressbooks</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/pressbooks-team/"
                    class="text-gray-500 font-semibold text-[18px]"
                  >Our Team</a>
                </li>
                <li role="menuitem">
                  <a
                    href="https://pressbooks.com/category/inside-pressbooks/"
                    class="text-gray-500 font-semibold text-[18px]"
                    @blur="hideSubmenu('about')"
                  >Inside Pressbooks</a>
                </li>
              </ul>
            </li>
            <!-- Request a Demo Button -->
            <li class="lg:inline-block lg:text-center lg:border-2 lg:border-red-700 lg:text-white lg:bg-red-700 lg:rounded-full lg:leading-[20px] lg:ml-24">
              <a
                href="https://pressbooks.com/request-a-pressbooks-demo/"
                class="block py-2 pl-3 pr-4 lg:text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:py-3 lg:px-6 font-semibold"
              >Request a Demo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {ref} from 'vue';

const submenus = ref({
  products: false,
  plans: false,
  resources: false,
  about: false
});

const isSubmenuVisible = (id) => {
  return submenus.value[id];
};

const showSubmenu = (id) => {
  submenus.value[id] = true;
};

const hideSubmenu = (id) => {
  submenus.value[id] = false;
};

const toggleSubmenu = (id) => {
  submenus.value[id] = !submenus.value[id];
};

import {Collapse} from 'flowbite';
const $targetEl = document.getElementById('navbar-top');
const $triggerEl = document.getElementById('toggle-navbar-top');
new Collapse($targetEl, $triggerEl);
</script>