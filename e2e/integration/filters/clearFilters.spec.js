import {clickAccordionHeader, clickFilter} from '../../support/common';

describe('Clear Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      clickAccordionHeader('licenseCode');

      clickFilter('licenseCode','cc-by', 'include');
      clickFilter('licenseCode','cc-by-nc-sa', 'include');
      clickFilter('licenseCode','all-rights-reserved', 'include');

    });

    it('Clear chip refinement', () => {

      cy.url()
        .should('include','?license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.url()
        .should('include','?license=CC%20BY-NC-SA%26%26All%20Rights%20Reserved');

    });

    it('Clear all refinements', () => {

      cy.url()
        .should('include','?license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=clear-all-filters]').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

      cy.url()
        .should('not.contain','?');
    });
  });
});
