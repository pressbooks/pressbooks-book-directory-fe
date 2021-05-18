import Elements from '../support/elements';
import {clickAccordionHeader, clickFilter, search} from '../support/common';
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
      search('Nursing Pharmacology');
      cy.get(Elements.booksCards.editors)
        .first()
        .contains('Elizabeth Christman, MSN, RN, CNE and Kimberly Ernstmeyer, CNE, CHSE, APNP-BC');
    });
    it('Search a book with description and check it is present in the book cards', () => {
      search('Prior Learning Portfolio Development');
      cy.get(Elements.booksCards.description)
        .first()
        .contains('Written specifically for students in Boise State University’s Bachelor of Applied Science ' +
          'and Multidisciplinary Studies Program, but applicable for students at many institutions, this textbook ' +
          'guides students through the process of creating a prior learning portfolio, including creating a prior ' +
          'learning resume, writing an educational narrative, and gathering supporting documentation. Upon completion ' +
          'of the portfolio, BAS & MDS students will be able to challenge for up to 12 upper-division credits in ' +
          'designated courses.Produced in partnership with Boise State University');
    });
    it('Check recommended attribute in the book cards', () => {
      search('Open Music Theory');
      cy.get(Elements.booksCards.recommended)
        .should('include.text', 'Recommended');

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

      search('Significant Statistics').wait(1000);
      cy.fixture('bookCard').then((bookCard) => {
        for(const attribute of attributesToCheck) {
          if ('image' in attribute) {
            cy.get(attribute.element)
              .first()
              .find('img')
              .should('have.attr', 'src')
              .should('contain', bookCard[attribute.fixtureProperty]);
            continue;
          }
          cy.get(attribute.element)
            .first()
            .should('include.text', bookCard[attribute.fixtureProperty]);
        }
      });
    });
  });
});
