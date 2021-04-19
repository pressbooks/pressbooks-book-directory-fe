<template>
  <div class="book-box mt-4">
    <div class="flex flex-row flex-wrap items-center border border-gray-300 px-8 py-8 shadow-md">
      <div class="w-full md:w-2/3 md:pr-4">
        <div class="data">
          <div class="flex mb-5">
            <div class="tag bg-red-800 border leading-none border-red-900 mb-3 text-white px-4 py-2 uppercase rounded font-pbBold">
              Recommended
            </div>
          </div>
          <div class="supername leading-tight uppercase font-pbBold mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing
          </div>
          <div class="name leading-tight text-gray uppercase text-red-800 text-xl font-pbBold mb-2">
            1, 2, 3 Write!
          </div>
          <div class="complement leading-tight uppercase font-pbBold mb-2">
            39557 words | 96.89 MB
          </div>
          <ul class="py-4">
            <meta-info
              title="Author(s):"
              text="Gay Monteverde"
            />
            <meta-info
              title="Subject(s):"
              text="Language learning writting skills"
            />
            <meta-info
              title="Updated:"
              text="01-22-2021"
            />
            <meta-info
              title="Publisher:"
              text="MMHCC Library Pages"
            />
            <meta-info
              title="Language:"
              text="English"
            />
          </ul>
          <div class="text leading-loose font-pbRegular">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis dolorem
            doloribus eveniet expedita explicabo fugit, incidunt ipsa laudantium non quidem quisquam
            quos ratione reiciendis suscipit unde voluptates? Earum harum ipsum laboriosam laborum
            libero magnam natus omnis vel? Architecto culpa.
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 md:pl-8">
        <div class="image">
          <img
            src="https://idaho.pressbooks.pub/app/plugins/pressbooks/assets/dist/images/default-book-cover.jpg"
            width="100%"
            alt=""
          >
        </div>
        <ul class="tags pt-3 flex flex-row justify-around">
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/licenses/allrights.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/is-base.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/licenses/by-nc-sa.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
          <li>
            <a href="#!">
              <img
                src="https://pressbooks.directory/assets/images/h5p.png"
                class="h-5"
                alt=""
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import MetaInfo from './MetaInfo.vue';
</script>