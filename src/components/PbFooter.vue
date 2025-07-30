<template>
  <footer class="bg-pb-deep-blue text-white pt-16 pb-4 antialiased">
    <div class="footer-container max-w-[1290px] mx-auto px-6 footer__wrap">
      <div class="footer-upper-container flex-wrap grid lg:grid-cols-[minmax(0,_1fr)_minmax(0,_3fr)]">
      <div class="footer-upper">
      <a
          id="logo"
          href="https://pressbooks.com/"
          title="Pressbooks Home Page"
          data-cy="return-home-button"
          class="flex items-center"
      >
        <img
            src="https://staging.pressbooks.com/app/uploads/2025/07/Pressbooks-Logos-White-01.png"
            alt="Pressbooks logo"
            class="logo h-auto w-[225px] mr-3"
        >
      </a>
      <div class="footer__external-links mt-4 flex gap-6">
        <div class="social-icon">
          <a
              class="bg-pb-red rounded-full w-[54px] h-[54px] inline-flex items-center justify-center"
              href="https://www.youtube.com/pressbooks"
          >
            <svg class="kadence-svg-icon kadence-youtube-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>YouTube</title><path d="M11.109 17.625l7.562-3.906-7.562-3.953v7.859zM14 4.156c5.891 0 9.797 0.281 9.797 0.281 0.547 0.063 1.75 0.063 2.812 1.188 0 0 0.859 0.844 1.109 2.781 0.297 2.266 0.281 4.531 0.281 4.531v2.125s0.016 2.266-0.281 4.531c-0.25 1.922-1.109 2.781-1.109 2.781-1.062 1.109-2.266 1.109-2.812 1.172 0 0-3.906 0.297-9.797 0.297v0c-7.281-0.063-9.516-0.281-9.516-0.281-0.625-0.109-2.031-0.078-3.094-1.188 0 0-0.859-0.859-1.109-2.781-0.297-2.266-0.281-4.531-0.281-4.531v-2.125s-0.016-2.266 0.281-4.531c0.25-1.937 1.109-2.781 1.109-2.781 1.062-1.125 2.266-1.125 2.812-1.188 0 0 3.906-0.281 9.797-0.281v0z"></path>
            </svg>
          </a>
        </div>
        <div class="social-icon">
          <a
              class="bg-pb-red rounded-full w-[54px] h-[54px] inline-flex items-center justify-center"
              href="https://www.linkedin.com/company/pressbooks">
            <svg class="kadence-svg-icon kadence-linkedin-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28"><title>Linkedin</title><path d="M3.703 22.094h3.609v-10.844h-3.609v10.844zM7.547 7.906c-0.016-1.062-0.781-1.875-2.016-1.875s-2.047 0.812-2.047 1.875c0 1.031 0.781 1.875 2 1.875h0.016c1.266 0 2.047-0.844 2.047-1.875zM16.688 22.094h3.609v-6.219c0-3.328-1.781-4.875-4.156-4.875-1.937 0-2.797 1.078-3.266 1.828h0.031v-1.578h-3.609s0.047 1.016 0 10.844v0h3.609v-6.062c0-0.313 0.016-0.641 0.109-0.875 0.266-0.641 0.859-1.313 1.859-1.313 1.297 0 1.813 0.984 1.813 2.453v5.797zM24 6.5v15c0 2.484-2.016 4.5-4.5 4.5h-15c-2.484 0-4.5-2.016-4.5-4.5v-15c0-2.484 2.016-4.5 4.5-4.5h15c2.484 0 4.5 2.016 4.5 4.5z"></path>
            </svg>
          </a>
        </div>
        <div class="social-icon">
          <a
              class="bg-pb-red rounded-full w-[54px] h-[54px] inline-flex items-center justify-center"
              href="https://github.com/pressbooks"
          >
            <svg class="kadence-svg-icon kadence-github-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28"><title>Github</title><path d="M12 2c6.625 0 12 5.375 12 12 0 5.297-3.437 9.797-8.203 11.391-0.609 0.109-0.828-0.266-0.828-0.578 0-0.391 0.016-1.687 0.016-3.297 0-1.125-0.375-1.844-0.812-2.219 2.672-0.297 5.484-1.313 5.484-5.922 0-1.313-0.469-2.375-1.234-3.219 0.125-0.313 0.531-1.531-0.125-3.187-1-0.313-3.297 1.234-3.297 1.234-0.953-0.266-1.984-0.406-3-0.406s-2.047 0.141-3 0.406c0 0-2.297-1.547-3.297-1.234-0.656 1.656-0.25 2.875-0.125 3.187-0.766 0.844-1.234 1.906-1.234 3.219 0 4.594 2.797 5.625 5.469 5.922-0.344 0.313-0.656 0.844-0.766 1.609-0.688 0.313-2.438 0.844-3.484-1-0.656-1.141-1.844-1.234-1.844-1.234-1.172-0.016-0.078 0.734-0.078 0.734 0.781 0.359 1.328 1.75 1.328 1.75 0.703 2.141 4.047 1.422 4.047 1.422 0 1 0.016 1.937 0.016 2.234 0 0.313-0.219 0.688-0.828 0.578-4.766-1.594-8.203-6.094-8.203-11.391 0-6.625 5.375-12 12-12zM4.547 19.234c0.031-0.063-0.016-0.141-0.109-0.187-0.094-0.031-0.172-0.016-0.203 0.031-0.031 0.063 0.016 0.141 0.109 0.187 0.078 0.047 0.172 0.031 0.203-0.031zM5.031 19.766c0.063-0.047 0.047-0.156-0.031-0.25-0.078-0.078-0.187-0.109-0.25-0.047-0.063 0.047-0.047 0.156 0.031 0.25 0.078 0.078 0.187 0.109 0.25 0.047zM5.5 20.469c0.078-0.063 0.078-0.187 0-0.297-0.063-0.109-0.187-0.156-0.266-0.094-0.078 0.047-0.078 0.172 0 0.281s0.203 0.156 0.266 0.109zM6.156 21.125c0.063-0.063 0.031-0.203-0.063-0.297-0.109-0.109-0.25-0.125-0.313-0.047-0.078 0.063-0.047 0.203 0.063 0.297 0.109 0.109 0.25 0.125 0.313 0.047zM7.047 21.516c0.031-0.094-0.063-0.203-0.203-0.25-0.125-0.031-0.266 0.016-0.297 0.109s0.063 0.203 0.203 0.234c0.125 0.047 0.266 0 0.297-0.094zM8.031 21.594c0-0.109-0.125-0.187-0.266-0.172-0.141 0-0.25 0.078-0.25 0.172 0 0.109 0.109 0.187 0.266 0.172 0.141 0 0.25-0.078 0.25-0.172zM8.937 21.438c-0.016-0.094-0.141-0.156-0.281-0.141-0.141 0.031-0.234 0.125-0.219 0.234 0.016 0.094 0.141 0.156 0.281 0.125s0.234-0.125 0.219-0.219z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="newsletter_subscription">
        <p class="text-[20px] font-bold pt-8 pb-4">Subscribe to our newsletter</p>
          <a href="https://share.hsforms.com/1S9AV3-V2QtafgEuZ-V376Qnvuho" target="_blank" class="inline-block leading-[1.6] text-[18px] py-3 px-11 text-center bg-pb-red rounded-[3px] hover:bg-pb-dark-red w-auto">Subscribe</a>
      </div>
        </div>
      <div class="footer__upper flex">
        <nav
          aria-label="footer-nav"
          class="footer__nav--main w-full"
        >
          <div class="menu-footer-new-container break-inside-avoid">
            <ul
              id="footer-menu"
              class="navbar-item grid lg:grid-cols-5 gap-4"
            >
              <li
                id="menu-item-1"
                class="menu-item menu-item-has-children menu-item-1"
              >
                <h2 class="text-[20px] leading-[1.2] font-bold">Enterprise</h2>
                <ul class="sub-menu text-[14px] mt-[14px]">
                  <li
                    id="menu-item-2"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/enterprise/">Enterprise Networks</a>
                  </li>
                  <li
                    id="menu-item-3"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/enterprise/pressbooks-enterprise-networks-plans-and-pricing/">Plans and pricing</a>
                  </li>
                  <li
                    id="menu-item-4"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/pressbooks-results-hub/">Pressbooks Results</a>
                  </li>
                  <li
                      id="menu-item-5"
                      class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/product-showcase/">Product Showcase</a>
                  </li>
                </ul>
              </li>
              <li
                id="menu-item-6"
                class="menu-item menu-item-has-children"
              >
                <h2 class="text-[20px] leading-[1.2] font-bold">Self-Publisher</h2>
                <ul class="sub-menu text-[14px] mt-[14px]">
                  <li
                    id="menu-item-7"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/pressbooks-self-publisher/">Pressbooks Self-Publisher</a>
                  </li>
                  <li
                      id="menu-item-8"
                      class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/pressbooks-self-publisher/self-publisher-plans-and-pricing/">Plans and Pricing</a>
                  </li>
                </ul>
              </li>
              <li
                id="menu-item-9"
                class="menu-item menu-item-has-children"
              >
                <h2 class="text-[20px] leading-[1.2] font-bold">Resources</h2>
                <ul class="sub-menu text-[14px] mt-[14px]">
                  <li
                    id="menu-item-10"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/accessibility/">Accessibility</a>
                  </li>
                  <li
                    id="menu-item-11"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/blog">Blog</a>
                  </li>
                  <li
                    id="menu-item-12"
                    class="menu-item my-[14px]"
                  >
                    <a href="#">Pressbooks Directory</a>
                  </li>
                  <li
                      id="menu-item-13"
                      class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/collections-hub/">Featured Collections</a>
                  </li>
                  <li
                      id="menu-item-14"
                      class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/open-education-reference-guide/">Open Ed Guide</a>
                  </li>
                  <li
                      id="menu-item-15"
                      class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/adapt-open-textbooks/">Adapt Open Textbooks</a>
                  </li>
                </ul>
              </li>
              <li
                id="menu-item-16"
                class="menu-item menu-item-has-children"
              >
                <h2 class="text-[20px] leading-[1.2] font-bold">Support</h2>
                <ul class="sub-menu text-[14px] mt-[14px]">
                  <li
                    id="menu-item-17"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/support/">Support Resources</a>
                  </li>
                  <li
                    id="menu-item-18"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/webinars/">Webinars</a>
                  </li>
                </ul>
              </li>
              <li
                id="menu-item-19"
                class="menu-item menu-item-has-children"
              >
                <h2 class="text-[20px] leading-[1.2] font-bold">About</h2>
                <ul class="sub-menu text-[14px] mt-[14px]">
                  <li
                    id="menu-item-20"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/about/">About Pressbooks</a>
                  </li>
                  <li
                    id="menu-item-21"
                    class="menu-item my-[14px]"
                  >
                    <a href="https://pressbooks.com/partnerships]">Partnerships</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      </div>
      <div class="footer__lower pt-[44px] text-[14px] w-full flex flex-col lg:flex-row lg:justify-between lg:items-end">
        <div class="copyright">
          <p>© 2025 Pressbooks
              <a
                  rel="privacy-policy"
                  href="https://docs.google.com/document/d/e/2PACX-1vQZyYrAm2Y3OjfMfz_TQCf5-HZBMiOmVJUiqbDpugsGip8JP8SliQGvq-hSy7pwGPSQUWR3GnlzNVT3/pub"
                  class="underline pl-3"
                >Privacy Policy</a> |
              <a
                    rel="copyright-policy"
                    href="https://pressbooks.com/copyright-policy/"
                    class="underline"
                >Copyright Policy</a>
            </p>
          </div>
      <ais-powered-by theme="dark" class="text-center inline-block" />
     </div>
    </div>
  </footer>
</template>
<script setup>
</script>