<template>
  <div />
</template>
<script>
import introJs from 'intro.js';

/**
 * This function fixes the introJS scroll by adding padding for some elements to improve the visualization
 * @param index (step number)
 */
function scrollHelper(index) {
  let timeout = 50;
  let top = 0;
  switch (index) {
  case 12:
    top = 100;
    timeout = 500; //this element needs an extra timeout to calculate the scrollY position
    break;
  }

  if (top !== 0) {
    setTimeout(() => {
      window.scrollTo({
        top: window.scrollY - top,
        behavior: 'smooth',
      });
    }, timeout);
  }
}

function isMobile()
{
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
}

export default {
  name: 'PbTour',
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
      searchInput: document.querySelector('input[data-cy="book-input-search"]'),
      h5pActivitiesImage: this.$store.state.config.imagesPath + this.$store.state.config.h5pLogo,
      guideUrl: this.$store.state.config.urls.guide,
      h5pLogoWidth: 100,
      waitForFilter: 300
    };
  },
  mounted() {

    const blurInput = () => {
      this.searchInput.value = '';
    };

    const filterUsedForTour = document.querySelector('article[data-cy="license-filter"] button');

    const typing = (text, current = 0) => {
      this.searchInput.value += text[current];
      if (current < text.length - 1) {
        current++;
        setTimeout(() => {
          typing(text, current);
        }, this.typingSpeed);
      } else {
        this.searchInput.setAttribute('value', this.searchInput.value);
      }
    };

    filterUsedForTour.click();

    //Wait for v-if to show the first filter to bind introJs selectors
    //TODO: Remove the timeout using an observer event or something like that

    setTimeout(() => {

      const searchInputContainer = document.querySelector('div[data-cy="search-container"]');

      const searchButton = document.querySelector('button[data-cy="book-button-search"]');

      this.intro = introJs()
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
              element: isMobile() ? document.querySelector('form[data-cy="search-form"]') : searchInputContainer,
            },
            {
              title: 'Searching for multiple words',
              intro: `
        <p>If you enter multiple words, the search will produce results that contain all of those words.</p>
        <p>For example, a search for <strong>open education</strong> will retrieve books that include the words 'open' AND 'education'.</p>
         `,
              element: isMobile() ? document.querySelector('form[data-cy="search-form"]') : searchInputContainer,
            },
            {
              title: 'Searching for exact phrases',
              intro: `
        <p>Search for an exact phrase by putting the desired term in quotation marks.</p>
        <p>For example, a search for <strong>teaching "open education"</strong> will retrieve books that include the word 'teaching' AND the exact phrase 'open education'.</p>
         `,
              element: isMobile() ? document.querySelector('form[data-cy="search-form"]') : searchInputContainer,
            },
            {
              title: 'Excluding words or phrases',
              intro: `
        <p>To exclude a word or phrase from the results, use the <strong>"-"</strong> sign before the word you want to exclude.</p>
        <p>For example, a search for <strong>"open education" -teaching</strong> will retrieve books that include the exact phrase 'open education' but NOT the word 'teaching'.</p>
         `,
              element: isMobile() ? document.querySelector('form[data-cy="search-form"]') : searchInputContainer,
            },
            {
              title: 'Performing a search',
              intro: `
        <p>To see updated search results (after changing or removing a query), select the "Search" button.</p>
         `,
              element: isMobile() ? document.querySelector('form[data-cy="search-form"]') : searchButton,
              position: 'bottom'
            },
            {
              title: 'Viewing search results',
              intro: `
        <p>Once you’ve performed a search, you will see the number of results for your query. This value will be updated each time you perform a new search or change the applied filters.</p>
         `,
              element: document.querySelector('.ais-Stats'),
              position: 'bottom'
            }, {
              title: 'Changing results display',
              intro: `
        <p>You can change the number of results displayed per page and the method used to sort your results using these dropdowns.</p>
         `,
              element: document.querySelector('div[data-cy="top-filters"]'),
              position: 'bottom'
            },
            {
              title: 'Using facet filters',
              intro: `
        <p>Filters allow you to perform faceted search to narrow down your results by license, subject, word count, and more. Faceted searching can be combined with text search or used separately.</p>
         `,
              element: document.querySelector('article[data-cy="license-filter"]'),
              position: 'right'
            },
            {
              title: 'Include filter',
              intro: `
        <p>Click the checkmark to apply that filter and see only those results, or click the X to omit those results. Click the same option again to remove that filter.</p>
        <p>You can apply multiple inclusion or exclusion filters for each facet. If multiple filters are selected within a facet, your results will include books that satisfy any of the active filter conditions.</p>
         `,
              element: document.querySelector('article[data-cy="license-filter"]'),
              position: 'right'
            },
            {
              title: 'Viewing all active filters',
              intro: `
        <p>All filters that are currently being applied to your results will be displayed here. Exclude filters will display the word NOT before the filtered term.</p>
        <p>Clear individual filters by clicking on them.</p>
         `,
              element: document.querySelector('div[data-cy="active-filters"]'),
              position: 'bottom'
            },
            {
              title: 'Clearing filters',
              intro: `
        <p>Clear all active filters by clicking on the ‘Clear all’ button.</p>
         `,
              element: isMobile() ? document.querySelector('div[data-cy="active-filters"]') :document.querySelector('div[data-cy="active-filters"] .clear-filters'),
              position: 'left'
            },
            {
              title: 'Interpreting book cards',
              intro: `
        <p>Each book card displays available information about the book, including title, word count, storage size, author(s), subject(s), date last updated, publisher, and language.</p>
        <p>Clicking a book's title or cover will take you to the book’s home page.</p>
         `,
              element: document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-meta"]'),
            },
            {
              title: 'Visual icons',
              intro: `
        <p>Beneath the cover image, you will see a set of icons that convey additional information about the book.</p>
         `,
              element: document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-icons"]'),
              position: 'left'
            },
            {
              title: 'Copyright',
              intro: `
        <p>This icon indicates the copyright license selected for the work (All Rights Reserved or one of the Creative Commons licenses). Hovering over the icon will display the license name.</p>
         `,
              element: document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-icons"]'),
              position: 'left'
            },
            {
              title: 'H5P Activities',
              intro: `
        <img src="${this.h5pActivitiesImage}" alt="H5P Logo" width="${this.h5pLogoWidth}" />
        <p>The H5P logo is displayed when a book contains interactive H5P elements (like quizzes or flashcards). Hovering over the icon will display the number of H5P activities present in that book.</p>
         `,
              element: document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-icons"]'),
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
        filterUsedForTour.click();
      });

      this.intro.onafterchange((targetElement) => {

        blurInput();

        if ((targetElement.classList.contains('input-wrapper') || targetElement.tagName === 'FORM') && this.intro._currentStep > 1) {

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

            typing(value); //simulate typing

          } else {

            this.searchInput.value = '';

          }

        } else if(this.intro._currentStep === 9) {

          // Facets filter click

          [1,2,3].forEach(function(item, index){
            setTimeout(()=>{
              const filter = document.querySelector('article[data-cy="license-filter"] [data-cy="filter-option"]:nth-of-type('+item+') button[data-cy="filter-include-button"]');
              filter.click();
            }, index * 1000);
          });

          this.intro._introItems[10].element = document.querySelector('div[data-cy="active-filters"]');

        } else if(this.intro._currentStep === 11) {

          // Rebind DOM for remaining steps on the book card

          this.intro._introItems[12].element = document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-meta"]');
          this.intro._introItems[13].element = document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-icons"]');
          this.intro._introItems[14].element = document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-license"]');
          this.intro._introItems[15].element = document.querySelector('.ais-Hits div[data-cy="book-card"]:nth-of-type(1) [data-cy="book-icons"]');

          setTimeout(()=> {
            const clear = document.querySelector('button[data-cy="clear-all-filters"]');
            clear.click();
          },2000);

        } else {

          this.searchInput.value = '';

        }

        scrollHelper(this.intro._currentStep);

      });

    }, this.waitForFilter);


  }
};
</script>
