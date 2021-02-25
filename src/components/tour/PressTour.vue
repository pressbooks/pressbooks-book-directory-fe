<template>
  <div />
</template>
<script>
const introJS = require('intro.js');

/**
 * This function fixes the introJS scroll by adding padding for some elements to improve the visualization
 * @param index (step number)
 */
function scrollHelper(index) {
  let timeout = 50;
  let top = 0;
  switch (index) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 10:
    top = 80;
    break;
  case 5:
  case 6:
  case 7:
  case 8:
    top = 250;
    break;
  case 9:
    top = 100;
    break;
  case 12:
    top = 120;
    timeout = 500; //this element needs an extra timeout to calculate the scrollY position
    break;
  case 12:
    timeout = 1000;
    top = currentScroll - 200;
    break;
  }

  if(top !== 0) {
    setTimeout(()=>{
      window.scrollTo({
        top: window.scrollY - top,
        behavior: 'smooth',
      });
    },timeout);
  }
}

export default {
  name: 'PressTour',
  props: {
    overlay: {
      type: Number,
      default: 0.5
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    typingSpeed: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      intro: null,
      searchInput: document.getElementById('search-book'),
      h5pActivitiesImage: this.$store.state.config.imagesPath + this.$store.state.config.h5pLogo,
      guideUrl: this.$store.state.config.guideUrl,
      h5pLogoWidth: 100,
      waitForFilter: 300
    };
  },
  mounted() {

    const focusInput = () => {
      this.searchInput.previousElementSibling.classList.add('v-label--active');
    };

    const blurInput = () => {
      this.searchInput.value = '';
      this.searchInput.previousElementSibling.classList.remove('v-label--active');
    };

    const filterUsedForTour = document.querySelector('#filter-license_code .v-list-item');

    const typing = (text, current = 0) => {
      this.searchInput.value+=text[current];
      if (current < text.length-1) {
        current++;
        setTimeout(()=>{typing(text, current);},this.typingSpeed);
      } else {
        this.searchInput.setAttribute('value',this.searchInput.value);
      }
    };

    filterUsedForTour.click();

    //Wait for v-if to show the first filter to bind introJs selectors
    //TODO: Remove the timeout using an observer event or something like that

    setTimeout(()=>{

      const searchInputContainer = document.querySelector('.welcome-header .v-input__control');
      const searchButton = document.getElementById('search-button');

      this.intro = introJS()
        .setOptions({
          hidePrev: true,
          showBullets: false,
          showProgress: true,
          scrollToElement: this.autoScroll,
          overlayOpacity: this.overlay,
          steps: [
            {
              title: 'Take a tour',
              intro: `
              <p>Welcome to Pressbooks Directory. Use the 'next' and 'back' buttons to navigate this tour.</p>
              `,
            },
            {
              title: 'The search bar',
              intro: `
        <p>This search bar allows you to search within all of the metadata fields for the books indexed in Pressbooks Directory (title, author, subject, publisher, description, etc.).</p>
        <p>It does <strong>not</strong> search the <strong>content</strong> of the books.</p>
         `,
              element: searchInputContainer,
            },
            {
              title: 'Searching for multiple words',
              intro: `
        <p>If you enter multiple words, the search will produce results that contain all of those words.</p>
        <p>For example, a search for <strong>open education</strong> will retrieve books that include the words 'open' AND 'education'.</p>
         `,
              element: searchInputContainer,
            },
            {
              title: 'Searching for exact phrases',
              intro: `
        <p>Search for an exact phrase by putting the desired term in quotation marks.</p>
        <p>For example, a search for <strong>teaching "open education"</strong> will retrieve books that include the word 'teaching' AND the exact phrase 'open education'.</p>
         `,
              element: searchInputContainer,
            },
            {
              title: 'Excluding words or phrases',
              intro: `
        <p>To exclude a word or phrase from the results, use the <strong>"-"</strong> sign before the word you want to exclude.</p>
        <p>For example, a search for <strong>"open education" -teaching</strong> will retrieve books that include the exact phrase 'open education' but NOT the word 'teaching'.</p>
         `,
              element: searchInputContainer,
            },
            {
              title: 'Performing a search',
              intro: `
        <p>To see updated search results (after changing or removing a query), select the "Search" button.</p>
         `,
              element: searchButton,
              position: 'left'
            },
            {
              title: 'Viewing search results',
              intro: `
        <p>Once you’ve performed a search, you will see the number of results for your query. This value will be updated each time you perform a new search or change the applied filters.</p>
        <p>You can change the number of results shown per page [10, 20, 50] and the method used to sort your results.</p>
         `,
              element: document.querySelector('.row.filters .col-md-3'),
              position: 'left'
            },
            {
              title: 'Using facet filters',
              intro: `
        <p>Filters allow you to perform faceted search to narrow down your results by license, subject, word count, and more. Faceted searching can be combined with text search or used separately.</p>
         `,
              element: document.querySelector('#filter-license_code'),
              position: 'right'
            },
            {
              title: 'Include filter',
              intro: `
        <p>Click the checkmark to apply that filter and see only those results, or click the X to omit those results. Click the same option again to remove that filter.</p>
        <p>You can apply multiple inclusion or exclusion filters for each facet. If multiple filters are selected within a facet, your results will include books that satisfy any of the active filter conditions.</p>
         `,
              element: document.querySelector('#filter-license_code .v-list-item__action'),
              position: 'right'
            },

            {
              title: 'Clearing filters for a single facet',
              intro: `
         <p>All active filters for a facet can be removed at once by selecting the ‘Clear Filter’ button.</p>
            `,
              element: document.querySelector('#filters .ais-ClearRefinements button'),
              position: 'right'
            },
            {
              title: 'Viewing all active filters',
              intro: `
        <p>All filters that are currently being applied to your results will be displayed here. Exclude filters will display the word NOT before the filtered term.</p>
        <p>Clear individual filters by clicking on them.</p>
         `,
              element: document.querySelector('.filters__head'),
              position: 'bottom'
            },
            {
              title: 'Clearing filters',
              intro: `
        <p>Clear all active filters by clicking on the ‘Clear Active Filters’ button.</p>
         `,
              element: document.querySelector('.filters__head .ais-ClearRefinements-button'),
              position: 'bottom'
            },
            {
              title: 'Interpreting book cards',
              intro: `
        <p>Each book card displays information about the book, when available, including author(s), subject(s), date last updated, publisher, word count, storage size, and description.</p>
        <p>Clicking a book's title or cover will take you to the book’s home page.</p>
         `,
              element: document.querySelector('.v-card__content .col-9'),
              position: 'bottom'
            },
            {
              title: 'Visual icons',
              intro: `
        <p>Beneath the cover image, you will see a set of icons that convey additional information about the book.</p>
         `,
              element: document.querySelector('.ais-Hits__books__container .v-card__content .row'),
              position: 'left'
            },
            {
              title: 'Language',
              intro: `
        <p>This abbreviation denotes a book’s language (e.g. English, French, Spanish).</p>
         `,
              element: document.querySelector('.ais-Hits__books__container .v-card__content .language'),
              position: 'left'
            },
            {
              title: 'Copyright',
              intro: `
        <p>This icon indicates the copyright license selected for the work (All Rights Reserved or one of the Creative Commons licenses). Hovering over the icon will display the license name.</p>
         `,
              element: document.querySelector('.ais-Hits__books__container .v-card__content .copyright'),
              position: 'left'
            },
            {
              title: 'H5P Activities',
              intro: `
        <img src="${this.h5pActivitiesImage}" alt="H5P Logo" width="${this.h5pLogoWidth}" />
        <p>The H5P logo is displayed when a book contains interactive H5P elements (like quizzes or flashcards). Hovering over the icon will display the number of H5P activities present in that book.</p>
         `,
              element: document.querySelector('.ais-Hits__books__container .v-card__content .row'),
              position: 'left'
            },
            {
              title: 'Visit the guide',
              intro: `
        <p>You’ve concluded the Pressbooks Directory tour! For more details on using the Directory to find books of interest to you, please see our <a target="_blank" href="${this.guideUrl}">guide chapter</a>.</p>
         `
            }
          ]
        }).start();

      this.intro.onexit(() => {
        this.searchInput.value = '';
        this.$store.commit('showTour');
        //Restore filters accordion to the initial state
        filterUsedForTour.click();
      });

      this.intro.onafterchange((targetElement) => {

        blurInput();

        if (targetElement.classList.contains('v-input__control') && this.intro._currentStep > 1) {

          let value = '';

          switch (this.intro._currentStep) {
          case 2:
            value = 'open education';
            break;
          case 3:
            value = 'teaching "open education"';
            break;
          case 4:
            value = '"open education" -teaching ';
            break;
          }
          if (value) {

            focusInput();
            typing(value); //simulate typing

          } else {

            this.searchInput.value = '';

          }

        } else {

          this.searchInput.value = '';

        }

        scrollHelper(this.intro._currentStep);

      });

    },this.waitForFilter);



  }
};
</script>
<style lang="sass">
@import 'node_modules/intro.js/introjs'
@import 'src/styles/tour'
</style>