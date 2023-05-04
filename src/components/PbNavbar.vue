<template>
    <header id="header" class="header shadow">
        <div class="header__wrap flex items-center justify-between mx-auto w-[calc(100%-160px)] max-w-[1180px] lg:max-w-[1440px] py-[30px]">
            <div class="header__logo">
                <a
                        href="https://pressbooks.com/"
                        title="Pressbooks Home Page"
                        data-cy="return-home-button"
                >
                    <img
                            src="https://pressbooks.com/wp-content/themes/pressbooks/dist/images/svg/logos/pressbooks_logo.svg"
                            alt="Pressbooks logo"
                            class="logo h-[27px] w-auto"
                    >
                </a>
            </div>
            <div class="header__nav block">
                <nav class="flex justify-between items-center space-x-4" aria-labelledby="menu-main">
                    <div class="menu-primary-container">
                        <ul id="menu-main" class="header-nav items-center flex font-bold text-[17px]">
                            <li id="menu-item-1" class="menu-item menu-item-1 mr-[25px]"><a href="https://pressbooks.com/our-products/">Products</a></li>
                            <li id="menu-item-2" class="menu-item menu-item-2 mx-[25px]"><a href="https://pressbooks.com/plans-pricing/">Plans &amp; pricing</a></li>
                            <li id="menu-item-3" class="menu-item menu-item-3 mx-[25px]"><a href="#">Pressbooks Directory</a></li>
                            <li id="menu-item-4" class="menu-item menu-item-4 mx-[25px]"><a href="https://pressbooks.com/about/">About</a></li>
                            <li id="menu-item-5" class="menu-item menu-item-5 mx-[25px] inline-block text-center py-3 px-6 border-2 border-red-700 text-white bg-red-700 rounded-full leading-[17px]"><a class="py-[10px]" href="https://pressbooks.com/request-a-pressbooks-demo/">Get a demo</a></li>
                        </ul></div>			</nav>
            </div>
        </div>
    </header>
</template>
<script setup>
</script>