import {
  clickAccordionHeader,
  clickFilter,
} from '../../support/common';

describe('Clear Filters When Click On a Curated Collection',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      cy.get("[data-cy=active-filters]").then($activeFilter => {
        if ($activeFilter.find("[data-cy=clear-all-filters]").length > 0) {
          cy.get('[data-cy=clear-all-filters]').click();
          cy.algoliaQueryRequest('algoliaRequest');
         
        }
      });

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

      cy.algoliaQueryRequest('algoliaRequest');

    });

    it('Add some filters and then click on one curated collection', () => {

      clickAccordionHeader('licenseCode');
      clickFilter('licenseCode','cc-by', 'include');
      clickFilter('licenseCode','cc-by-nc-sa', 'include');
      clickFilter('licenseCode','all-rights-reserved', 'include');
      
      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=collection-section] li').first().click();

      cy.get('[data-cy=chip-filter]').should('have.length', 1);

      cy.algoliaQueryRequest('algoliaRequest');
      
    });

    it('Click on more than one curated collection', () => {

      cy.get('[data-cy=collection-section] li').first().click();

      cy.get('[data-cy=chip-filter]').should('have.length', 1);
      
      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=collection-section] li').last().click();

      cy.get('[data-cy=chip-filter]').should('have.length', 1);
      
      cy.algoliaQueryRequest('algoliaRequest');

    });

    it('Click on a collection then add some filters', () => {
      
      cy.get('[data-cy=collection-section] li').first().click();

      cy.get('[data-cy=chip-filter]').should('have.length', 1);
      
      cy.algoliaQueryRequest('algoliaRequest');

      clickAccordionHeader('licenseCode');
      clickFilter('licenseCode','cc-by', 'include');
      clickFilter('licenseCode','cc-by-nc-sa', 'include');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=collection-section] li').last().click();

      cy.get('[data-cy=chip-filter]').should('have.length', 1);
      
      cy.algoliaQueryRequest('algoliaRequest');

    });
    
  });
});
