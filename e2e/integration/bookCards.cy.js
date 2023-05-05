import Elements from '../support/elements';
import {clickAccordionHeader, clickFilter, clickPage, search} from '../support/common';
import helpers from '../../src/store/helpers';

describe('Book cards', function () {

  context('Desktop resolution', () => {
    it('Check mandatory book card attributes for the first page', () => {
      const mandatoryAttributes =  [
        Elements.booksCards.network,
        Elements.booksCards.title,
        Elements.booksCards.cover,
        Elements.booksCards.wordCount,
        Elements.booksCards.size,
        Elements.booksCards.h5pActivities,
        Elements.booksCards.authors,
        Elements.booksCards.lastUpdated,
        Elements.booksCards.language,
        Elements.booksCards.license
      ];

      cy.get(Elements.booksCards.main)
        .each(($bookCardElement) => {
          for (const mandatoryAttribute of mandatoryAttributes) {
            cy.wrap($bookCardElement)
              .find(mandatoryAttribute)
              .should('exist');
          }
        });
    });
    it('Filter by subject and check the subject attribute is present in the book cards', () => {
      const subjectFilter = 'Chemistry', facet = 'about';
      clickAccordionHeader(facet);
      clickFilter(facet, subjectFilter, true);
      cy.get(Elements.booksCards.subjects)
        .each(($subjectElement) => {
          cy.wrap($subjectElement)
            .should('exist')
            .contains(subjectFilter);
        });
    });
    it('Filter by publisher and check the publisher attribute is present in the book cards', () => {
      const publisherFilter = 'Open SUNY Textbooks', facet = 'publisherName';
      clickAccordionHeader(facet);
      clickFilter(facet, publisherFilter, true);
      cy.get(Elements.booksCards.publisher)
        .each(($publisherElement) => {
          cy.wrap($publisherElement)
            .should('exist')
            .contains(publisherFilter);
        });
    });
    it('Filter by license and test the icon is displayed properly', () => {
      const licenseFilter = {
        name: 'CC BY-NC',
        icon: helpers.functions.getLicenseIconAndAltByLicenseName('CC BY-NC (Attribution-Noncommercial)').image,
        facet: 'licenseCode'
      };
      clickAccordionHeader(licenseFilter.facet);
      clickFilter(licenseFilter.facet, licenseFilter.name, true);
      cy.get(Elements.booksCards.license)
        .each(($licenseElement) => {
          cy.wrap($licenseElement)
            .find('img')
            .should('have.attr', 'src')
            .should('include', licenseFilter.icon);
        });
    });
    it('Search a book with editors and check if the editor field is present in the book cards', () => {
      search('Nursing Pharmacology').then(()=>{
        cy.get(Elements.booksCards.editors)
          .first()
          .should('include.text', 'Elizabeth Christman, MSN, RN, CNE and Kimberly Ernstmeyer');
      });
    });
    it('Search a book with description and check it is present in the book cards', () => {
      search('Prior Learning Portfolio Development');
      cy.get(Elements.booksCards.description)
        .first()
        .should('include.text','Written specifically for students in Boise State University’s Bachelor of Applied Science');
    });
    it('Check all book cards attributes from a particular book', () => {
      const attributesToCheck =  [
        {
          element: Elements.booksCards.network,
          fixtureProperty: 'network'
        },
        {
          element: Elements.booksCards.title,
          fixtureProperty: 'title'
        },
        {
          element: Elements.booksCards.cover,
          fixtureProperty: 'cover',
          image: true
        },
        {
          element: Elements.booksCards.wordCount,
          fixtureProperty: 'wordCount'
        },
        {
          element: Elements.booksCards.size,
          fixtureProperty: 'size'
        },
        {
          element: Elements.booksCards.h5pActivities,
          fixtureProperty: 'h5pActivities'
        },
        {
          element: Elements.booksCards.authors,
          fixtureProperty: 'authors'
        },
        {
          element: Elements.booksCards.lastUpdated,
          fixtureProperty: 'lastUpdated'
        },
        {
          element: Elements.booksCards.subjects,
          fixtureProperty: 'subjects'
        },
        {
          element: Elements.booksCards.language,
          fixtureProperty: 'language'
        },
        {
          element: Elements.booksCards.license,
          fixtureProperty: 'license',
          image: true
        },
        {
          element: Elements.booksCards.editors,
          fixtureProperty: 'editors'
        },
        {
          element: Elements.booksCards.publisher,
          fixtureProperty: 'publisher'
        },
        {
          element: Elements.booksCards.description,
          fixtureProperty: 'description'
        },
        {
          element: Elements.booksCards.notOriginal,
          fixtureProperty: 'notOriginal',
          image: true
        },
        {
          element: Elements.booksCards.h5p,
          fixtureProperty: 'h5p',
          image: true
        },
      ];

      search('Significant Statistics');
      cy.fixture('bookCard').then((bookCard) => {
        for(const attribute of attributesToCheck) {
          if ('image' in attribute) {
            cy.get(attribute.element)
              .first()
              .find('img')
              .should('have.attr', 'src')
              .should('include', bookCard[attribute.fixtureProperty]);
            continue;
          }
          cy.get(attribute.element)
            .first()
            .should('include.text', bookCard[attribute.fixtureProperty]);
        }
      });
    });
    it('Read more action for longer description', () => {
      search('Para vivir con salud').wait(1000);
      cy.get(Elements.booksCards.description)
        .should('contain', 'Read more')
        .should('not.contain', 'While a growing number of literature departments teach Spanish courses with a health focus');
      cy.get('[data-cy=book-read-more-description]')
        .click();
      cy.get(Elements.booksCards.description)
        .should('not.contain', 'Read more')
        .should('contain', 'Seventeen countries are represented, including the United States.');
    });
    it('Fallback to cover image if image is not available', () => {
      search('math');

      cy.get(Elements.booksCards.cover)
        .eq(3).find('img')
        .should('have.attr', 'data-src')
        .should('include', 'Math-for-Trades-Volume-1-COVER-STORE.jpg');
    });
    it('Lazy loading cover images', () => {
      clickPage(3);

      cy.get(Elements.booksCards.cover)
        .eq(2).find('img')
        .should('have.attr', 'src')
        .should('include', '/assets/images/default-book-cover.jpg');

      cy.get('[data-cy=storage-filter]').scrollIntoView()
        .wait(200);
      cy.get(Elements.booksCards.cover)
        .eq(2).find('img')
        .should('have.attr', 'src')
        .should('not.include', 'default-book-cover.jpg');
    });
  });
});
