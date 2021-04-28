describe('Search', () => {

  context('Desktop resolution', () => {

    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Search for specific book', () => {
      cy.visit('/');

      cy.get('div.input input').type('math science');
      cy.get('form button[type="submit"]').click();

      cy.url()
        .should('include','?q=math%20science');

      cy.intercept('**/indexes/*/queries?*').then(()=>{
        cy.get('.book-box').should('have.length', 2);
      });

    });

    it('Search button will be disabled if < 3 characters', () => {

      cy.visit('/');

      cy.get('div.input input').clear().type('fo');
      cy.get('form button[type="submit"]').should('be.disabled');

    });

    it('Search button will be enabled if >= 3 characters', () => {

      cy.visit('/');

      cy.get('div.input input').clear().type('foo');
      cy.get('form button[type="submit"]').should('be.enabled');

    });

  });

});