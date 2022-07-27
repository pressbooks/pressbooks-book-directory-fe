import {
  clickAccordionHeader,
  fillNumericValue,
  getNumericInput,
  submitNumericFilter
} from '../../support/common';
import Elements from '../../support/elements';

describe('H5p Count Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {
      clickAccordionHeader('h5pActivities');
    });

    it('Filter is applied & URL is updated by entering MIN value',() => {
      fillNumericValue('h5pActivities','min',100);

      submitNumericFilter('h5pActivities');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','h5p=%3E=100');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 52');
    });


    it('Filter is applied & URL is updated by entering MAX value',() => {
      fillNumericValue('h5pActivities', 'max', 10);

      submitNumericFilter('h5pActivities');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','h5p=%3E=0%26%26%3C=10');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 2,038');
    });

    it('Filter is applied & URL is updated by entering MIN and MAX values',() => {
      fillNumericValue('h5pActivities','min',10);

      fillNumericValue('h5pActivities','max',20);

      submitNumericFilter('h5pActivities');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','h5p=%3E=10%26%26%3C=20');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 91');
    });

    it('Filter chips is applied/removed when include/exclude filter is applied/removed',() => {
      fillNumericValue('h5pActivities','min',10);

      fillNumericValue('h5pActivities','max',20);

      submitNumericFilter('h5pActivities');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 1);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 0);
    });

    it('Clicking a filter chip removes value from filter input and updates the URL',() => {
      fillNumericValue('h5pActivities','min',10);

      fillNumericValue('h5pActivities','max',20);

      submitNumericFilter('h5pActivities');

      cy.url()
        .should('include','h5p=%3E=10%26%26%3C=20');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 91');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.get('[data-cy=chip-filter]:nth-of-type(2) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 1);

      cy.url()
        .should('not.include','20');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 297');
    });

    it('Make sure that min does not exceed max and max does not exceed min and no negative numbers are accepted',() => {
      fillNumericValue('h5pActivities','min',-10);

      submitNumericFilter('h5pActivities');

      submitNumericFilter('h5pActivities');

      const min = getNumericInput('h5pActivities','min');

      cy.url()
        .should('not.include', 'h5p=');

      fillNumericValue('h5pActivities','max',-10);

      submitNumericFilter('h5pActivities');

      const max = getNumericInput('h5pActivities','max');

      submitNumericFilter('h5pActivities');

      cy.url()
        .should('not.include', 'h5p=');

      fillNumericValue('h5pActivities','min',100);
      fillNumericValue('h5pActivities','max',6);

      submitNumericFilter('h5pActivities');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.url()
        .should('include','h5p=%3E=100');

      getNumericInput('h5pActivities','max').invoke('text').should('eq','');
    });
  });
});
