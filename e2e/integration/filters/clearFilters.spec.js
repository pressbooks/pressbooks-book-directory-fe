import {
  clickAccordionClearFilter,
  clickAccordionHeader,
  clickFilter,
  perPage,
  search,
} from '../../support/common';
import Elements from '../../support/elements';

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
        .should('include','license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.url()
        .should('include','license=CC%20BY-NC-SA%26%26All%20Rights%20Reserved');
    });

    it('Clear all refinements', () => {
      cy.url()
        .should('include','license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=clear-all-filters]').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

      cy.url()
        .should('not.contain','&');
    });

    it('Clear all refinements should not reset search, per page, and sorting', () => {
      perPage(20);
      search('education');

      cy.url()
        .should('contain', 'q=')
        .should('contain', 'per_page=')
        .should('contain', 'sort=')
        .should('contain', 'license=');

      cy.get('[data-cy=clear-all-filters]').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

      cy.url()
        .should('contain', 'q=')
        .should('contain', 'per_page=')
        .should('contain', 'sort=')
        .should('not.contain', 'license=');
    });

    it('Clear applied filters for specific facet when clicking "Clear filter" button inside the facet', () => {
      clickAccordionHeader('about');

      cy.get(Elements.filterChips)
        .should(($filtersApplied) => expect($filtersApplied).to.have.length(3));

      clickFilter('about','education', 'include');
      clickFilter('about','open-learning-distance-education', 'include');

      cy.get(Elements.filterChips)
        .should(($filtersApplied) => expect($filtersApplied).to.have.length(5));

      clickAccordionClearFilter('licenseCode');

      cy.get(Elements.filterChips)
        .should(($filtersApplied) => expect($filtersApplied).to.have.length(2));
    });
  });
});
