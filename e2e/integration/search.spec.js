describe('Search', () => {

  context('Desktop resolution', () => {

    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit('/');
      cy.get('[data-cy="book-input-search"]').as('inputSearch').clear();
      cy.get('[data-cy="book-button-search"]').as('buttonSearch');
    });

    it('Search for specific book', () => {

      cy.intercept('**/indexes/*/queries?*').as('searchResults');

      cy.get('@inputSearch').type('math science');
      cy.get('@buttonSearch').click();

      cy.wait(['@searchResults']).then(()=>{
        cy.get('[data-cy="book-card"]').should('have.length', 2);
      });

      cy.url()
        .should('include','?q=math%20science');

    });

    it('Search button will be disabled if < 3 characters', () => {

      cy.get('@inputSearch').type('fo');
      cy.get('@buttonSearch').should('be.disabled');

    });

    it('Search button will be enabled if >= 3 characters', () => {

      cy.get('@inputSearch').type('foo');
      cy.get('@buttonSearch').should('be.enabled');

    });

  });

});