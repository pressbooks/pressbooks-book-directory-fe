describe('Clear Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('article[data-cy=license-filter]').as('licenseAccordion');

      cy.get('@licenseAccordion').click();

      cy.get('[data-cy=filter-licenseCode-cc-by-include-button]')
        .click()
        .get('[data-cy=filter-licenseCode-cc-by-nc-sa-include-button]')
        .click()
        .get('[data-cy=filter-licenseCode-all-rights-reserved-include-button]')
        .click();
    });

    it('Clear chip refinement', () => {
      cy.wait('@algoliaRequest');

      cy.url()
        .should('include','?license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.url()
        .should('include','?license=CC%20BY-NC-SA%26%26All%20Rights%20Reserved');

    });

    it('Clear all refinements', () => {
      cy.wait('@algoliaRequest');

      cy.url()
        .should('include','?license=CC%20BY');

      cy.get('[data-cy=chip-filter]').should('have.length', 3);

      cy.get('[data-cy=clear-all-filters]').click();

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

      cy.url()
        .should('not.contain','?');
    });
  });
});
