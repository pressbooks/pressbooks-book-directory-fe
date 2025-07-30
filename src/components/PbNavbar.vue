<template>
  <header
    id="header"
    class="header border-b border-[#ddd] antialiased"
  >
    <nav
      aria-label="primary-nav"
      class="bg-white max-w-[1290px] m-auto px-6 py-3"
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto min-h-[80px] leading-[1.2]">
        <a
          id="logo"
          href="https://pressbooks.com/"
          title="Pressbooks Home Page"
          data-cy="return-home-button"
          class="flex items-center"
        >
          <img
            src="/assets/images/logo-color.svg"
            alt="Pressbooks logo"
            class="logo h-auto w-[225px] mr-3"
          >
        </a>
        <button
          id="toggle-navbar-top"
          data-collapse-toggle="navbar-top"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm pb-deep-blue rounded-lg lg:hidden hover:bg-gray-100 "
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
          <ul class="font-medium flex items-start lg:items-center flex-col p-4 lg:p-0 mt-4 border border-gray-100 bg-gray-50 lg:flex-row lg:mt-0 lg:border-0 lg:bg-white">
            <li
              class="group relative"
              role="menuitem"
              @mouseleave="hideSubmenu('enterprise')"
            >
              <a
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
                class="flex items-center p-3 text-pb-deep-blue lg:hover:bg-pb-light-blue lg:border-0 lg:hover:text-pb-dark-red text-[20px]"
                @keydown.enter.prevent="toggleSubmenu('enterprise')"
                @keydown.space.prevent="toggleSubmenu('enterprise')"
                @focus="showSubmenu('enterprise')"
                @mouseover="!isTouchDevice.value && showSubmenu('enterprise')"
                @keydown.shift.tab.prevent="closeAndFocusPrev('enterprise')"
                @click.prevent="isTouchDevice.value && toggleSubmenu('enterprise')"
              >
                Enterprise
                <span class="ml-1">
                  <svg
                    class="size-3 fill-pb-deep-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g />
                    <path
                      d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('enterprise')"
                id="enterprise"
                ref="enterprise"
                class="absolute bg-white shadow-lg z-50"
                role="menu"
              >
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="https://pressbooks.com/enterprise/"
                    class="block w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                    @keydown.shift.tab.prevent="focusParent('enterprise')"
                  >Enterprise Networks</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/enterprise/pressbooks-enterprise-networks-plans-and-pricing/"
                      class="block w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('enterprise')"
                  >Plans and Pricing</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/pressbooks-results-hub/"
                      class="block w-[210px] p-[15px]block w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('enterprise')"
                  >Pressbooks Results</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/product-showcase/"
                      class="block w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('enterprise')"
                  >Product Showcase</a>
                </li>
              </ul>
            </li>
            <li
              class="group relative"
              @mouseleave="hideSubmenu('selfpublisher')"
            >
              <a
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
                class="flex items-center p-3 text-pb-deep-blue lg:hover:bg-pb-light-blue lg:border-0 lg:hover:text-pb-dark-red text-[20px]"
                @keydown.enter.prevent="toggleSubmenu('selfpublisher')"
                @keydown.space.prevent="toggleSubmenu('selfpublisher')"
                @focus="showSubmenu('selfpublisher')"
                @mouseover="!isTouchDevice.value && showSubmenu('selfpublisher')"
                @keydown.shift.tab.prevent="closeAndFocusPrev('selfpublisher')"
                @click.prevent="isTouchDevice.value && toggleSubmenu('selfpublisher')"
              >
                Self-Publisher
                <span class="ml-1">
                  <svg
                    class="size-3 fill-pb-deep-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g />
                    <path
                      d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('selfpublisher')"
                id="selfpublisher"
                ref="selfpublisher"
                class="absolute group-hover:block bg-white shadow-lg z-50"
                role="menu"
              >
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/pressbooks-self-publisher/"
                      class="block w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Pressbooks Self-Publisher</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="https://pressbooks.com/pressbooks-self-publisher/self-publisher-plans-and-pricing/"
                    class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                    @blur="hideSubmenu('self-publisher')"
                  >Plans and Pricing</a>
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
                class="flex items-center p-3 text-pb-deep-blue lg:hover:bg-pb-light-blue lg:border-0 lg:hover:text-pb-dark-red text-[20px]"
                @keydown.enter.prevent="toggleSubmenu('resources')"
                @keydown.space.prevent="toggleSubmenu('resources')"
                @focus="showSubmenu('resources')"
                @mouseover="!isTouchDevice.value && showSubmenu('resources')"
                @keydown.shift.tab.prevent="closeAndFocusPrev('resources')"
                @click.prevent="isTouchDevice.value && toggleSubmenu('resources')"
              >
                Resources
                <span class="ml-1">
                  <svg
                    class="size-3 fill-pb-deep-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g />
                    <path
                      d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('resources')"
                id="resources"
                ref="resources"
                class="absolute group-hover:block bg-white shadow-lg z-50"
                role="menu"
              >
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/accessibility/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Accessibility</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="https://pressbooks.com/pressbooks-blog/"
                    class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Blog</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="/"
                    class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Pressbooks Directory</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/collections-hub/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('resources')"
                  >Featured Collections</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/open-education-reference-guide/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('resources')"
                  >Open Ed Guide</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/adapt-open-textbooks/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @keydown.shift.tab.prevent="focusParent('resources')"
                  >Adapt Open Textbooks</a>
                </li>
              </ul>
            </li>
            <li
                class="group relative"
                @mouseleave="hideSubmenu('support')"
            >
              <a
                  aria-haspopup="true"
                  aria-expanded="false"
                  href="#"
                  class="flex items-center p-3 text-pb-deep-blue lg:hover:bg-pb-light-blue lg:border-0 lg:hover:text-pb-dark-red text-[20px]"
                  @keydown.enter.prevent="toggleSubmenu('support')"
                  @keydown.space.prevent="toggleSubmenu('support')"
                  @focus="showSubmenu('support')"
                  @mouseover="!isTouchDevice.value && showSubmenu('support')"
                  @keydown.shift.tab.prevent="closeAndFocusPrev('support')"
                  @click.prevent="isTouchDevice.value && toggleSubmenu('support')"
              >
                Support
                <span class="ml-1">
                  <svg
                      class="size-3 fill-pb-deep-blue"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                  >
                    <g />
                    <path
                        d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                        fill="#142c31"
                    />
                  </svg>
                </span>
              </a>
              <ul
                  v-show="isSubmenuVisible('support')"
                  id="support"
                  ref="support"
                  class="absolute group-hover:block bg-white shadow-lg z-50"
                  role="menu"
              >
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/support/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Support Resources</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                      href="https://pressbooks.com/webinars/"
                      class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                      @blur="hideSubmenu('support')"
                  >Webinars</a>
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
                href="#"
                class="flex items-center p-3 text-pb-deep-blue lg:hover:bg-pb-light-blue lg:border-0 lg:hover:text-pb-dark-red text-[20px]"
                @keydown.enter.prevent="toggleSubmenu('about')"
                @keydown.space.prevent="toggleSubmenu('about')"
                @focus="showSubmenu('about')"
                @mouseover="!isTouchDevice.value && showSubmenu('about')"
                @keydown.shift.tab.prevent="closeAndFocusPrev('about')"
                @click.prevent="isTouchDevice.value && toggleSubmenu('about')"
              >
                About
                <span class="ml-1">
                  <svg
                    class="size-3 fill-pb-deep-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g />
                    <path
                      d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                    />
                  </svg>
                </span>
              </a>
              <ul
                v-show="isSubmenuVisible('about')"
                id="about"
                ref="about"
                class="absolute group-hover:block bg-white shadow-lg z-50"
                role="menu"
              >
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="https://pressbooks.com/about/"
                    class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                    @keydown.shift.tab.prevent="focusParent('about')"
                  >About Pressbooks</a>
                </li>
                <li role="menuitem" class="lg:hover:bg-pb-light-blue lg:active:bg-pb-light-blue">
                  <a
                    href="https://pressbooks.com/partnerships/"
                    class="block box-border w-[210px] p-[15px] pb-deep-blue text-[15px] lg:hover:text-pb-dark-red"
                  >Partnerships</a>
                </li>
              </ul>
            </li>
            <!-- Request a Demo Button -->
            <li class="lg:inline-block lg:text-center lg:text-white lg:bg-pb-red rounded-[3px] lg:hover:bg-pb-dark-red lg:ml-6">
              <a
                  href="https://pressbooks.com/request-a-pressbooks-demo/"
                  class="leading-[1.6] block py-2 pl-3 pr-4 text-[18px] lg:text-white hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:py-3 lg:px-6"
              >Request a Demo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const isTouchDevice = ref(false);

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const submenus = ref({
  enterprise: false,
  selfpublisher: false,
  resources: false,
  support: false,
  about: false
});

const closeAllSubmenus = () => {
  Object.keys(submenus.value).forEach((key) => {
    submenus.value[key] = false;
  });
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeAllSubmenus();
  }
};

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

const focusParent = (id) => {
  const parentMenu = document.querySelector(`#${id}`).previousElementSibling;
  if (parentMenu) {
    parentMenu.focus();
  }
  hideSubmenu(id);
};

const closeAndFocusPrev = (id) => {
  if (id === 'enterprise') {
    document.getElementById('logo').focus();
  }
  hideSubmenu(id);
  const prevMenu = document.querySelector(`#${id}`).closest('li').previousElementSibling?.querySelector('a');
  if (prevMenu) {
    prevMenu.focus();
  }
};

import {Collapse} from 'flowbite';

const $targetEl = document.getElementById('navbar-top');
const $triggerEl = document.getElementById('toggle-navbar-top');
new Collapse($targetEl, $triggerEl);
</script>