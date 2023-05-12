import Elements from '../support/elements';
import {clickAccordionHeader, clickFilter, clickPage, search} from '../support/common';

describe('Book cards', function () {

  context('Desktop resolution', () => {
    it('Check mandatory book card attributes for the first page', () => {
      const mandatoryAttributes =  [
        Elements.bookCards.network,
        Elements.bookCards.title,
        Elements.bookCards.cover,
        Elements.bookCards.wordCount,
        Elements.bookCards.h5pActivities,
        Elements.bookCards.authors,
        Elements.bookCards.lastUpdated,
        Elements.bookCards.language,
        Elements.bookCards.license
      ];

      cy.get(Elements.bookCards.main)
        .each(($bookCardElement) => {
          for (const mandatoryAttribute of mandatoryAttributes) {
            cy.wrap($bookCardElement)
              .find(mandatoryAttribute)
              .should('exist');
          }
        });
    });
    it('Filter by subject and check the subject attribute is present in the book cards', () => {
      const subjectFilter = 'Chemistry';
      const facet = 'about';
      clickAccordionHeader(facet);
      clickFilter(facet, subjectFilter, true);
      // Wait for the subject elements to appear
      cy.get(Elements.bookCards.subjects).should('exist');
      // Iterate over each subject element and validate the subject attribute
      cy.get(Elements.bookCards.subjects).each(($subjectElement) => {
        cy.wrap($subjectElement)
          .invoke('text')
          .then((subjectText) => {
            expect(subjectText).to.contain(subjectFilter);
          });
      });
    });
    it('Filter by publisher and check the publisher attribute is present in the book cards', () => {
      const publisherFilter = 'Open SUNY Textbooks', facet = 'publisherName';
      clickAccordionHeader(facet);
      clickFilter(facet, publisherFilter, true);
      cy.get(Elements.bookCards.publisher)
        .each(($publisherElement) => {
          cy.wrap($publisherElement)
            .should('exist')
            .contains(publisherFilter);
        });
    });
    it('Filter by license and check that the license description is present in the book cards', () => {
      const licenseFilter = {
        name: 'CC BY-NC',
        facet: 'licenseCode'
      };
      clickAccordionHeader(licenseFilter.facet);
      clickFilter(licenseFilter.facet, licenseFilter.name, true);
      cy.get(Elements.bookCards.license)
        .each(($licenseElement) => {
          cy.wrap($licenseElement)
            .should('exist')
            .contains(licenseFilter.name);
        });
    });
    it('Search a book with editors and check if the editor field is present in the book cards', () => {
      search('Nursing Pharmacology').then(()=>{
        cy.get(Elements.bookCards.editors)
          .first()
          .should('include.text', 'Elizabeth Christman, MSN, RN, CNE and Kimberly Ernstmeyer');
      });
    });
    it('Search a book with description and check it is present in the book cards', () => {
      search('Prior Learning Portfolio Development');
      cy.get(Elements.bookCards.description)
        .first()
        .should('include.text','Written specifically for students in Boise State University’s Bachelor of Applied Science');
    });
    it('Check all book cards attributes from a particular book', () => {
      const attributesToCheck =  [
        {
          element: Elements.bookCards.network,
          fixtureProperty: 'network'
        },
        {
          element: Elements.bookCards.title,
          fixtureProperty: 'title'
        },
        {
          element: Elements.bookCards.cover,
          fixtureProperty: 'cover',
          image: true
        },
        {
          element: Elements.bookCards.wordCount,
          fixtureProperty: 'wordCount'
        },
        {
          element: Elements.bookCards.h5pActivities,
          fixtureProperty: 'h5pActivities'
        },
        {
          element: Elements.bookCards.authors,
          fixtureProperty: 'authors'
        },
        {
          element: Elements.bookCards.lastUpdated,
          fixtureProperty: 'lastUpdated'
        },
        {
          element: Elements.bookCards.subjects,
          fixtureProperty: 'subjects'
        },
        {
          element: Elements.bookCards.language,
          fixtureProperty: 'language'
        },
        {
          element: Elements.bookCards.editors,
          fixtureProperty: 'editors'
        },
        {
          element: Elements.bookCards.publisher,
          fixtureProperty: 'publisher'
        },
        {
          element: Elements.bookCards.description,
          fixtureProperty: 'description'
        },
        {
          element: Elements.bookCards.license,
          fixtureProperty: 'license'
        }
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
      cy.get(Elements.bookCards.description)
        .should('contain', 'Read more')
        .should('not.contain', 'While a growing number of literature departments teach Spanish courses with a health focus');
      cy.get('[data-cy=book-read-more-description]')
        .click();
      cy.get(Elements.bookCards.description)
        .should('not.contain', 'Read more')
        .should('contain', 'Seventeen countries are represented, including the United States.');
    });
    it('Fallback to cover image if image is not available', () => {
      search('math');

      cy.get(Elements.bookCards.cover)
        .eq(3).find('img')
        .should('have.attr', 'data-src')
        .should('include', 'Math-for-Trades-Volume-1-COVER-STORE.jpg');
    });
    it('Lazy loading cover images', () => {
      clickPage(3);

      cy.get(Elements.bookCards.cover)
        .eq(2).find('img')
        .should('have.attr', 'src')
        .should('include', '/assets/images/default-book-cover.jpg');

      cy.get('[data-cy=h5p-filter]').scrollIntoView()
        .wait(200);
      cy.get(Elements.bookCards.cover)
        .eq(2).find('img')
        .should('have.attr', 'src')
        .should('not.include', 'default-book-cover.jpg');
    });
  });
});
