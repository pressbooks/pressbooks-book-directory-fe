describe('Books per page', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Shows 10 books per page by default', () => {
      cy.intercept('**/indexes/*/queries?*').as('listing');

      cy.visit('/');

      cy.wait('@listing').then(() => {
        cy.get('.book-box').should('have.length', 10);
      });
    });

    it('Changes the amount of books displayed when requested', () => {
      cy.visit('/');

      [10, 20, 50].forEach(length => {
        cy.intercept('**/indexes/*/queries?*').as(`listing-${length}`);

        cy.get('div.books-per-page .vs__dropdown-toggle').click();

        cy.get('li.vs__dropdown-option').contains(`${length} books`).click();

        cy.wait(`@listing-${length}`).then(() => {
          cy.get('.book-box').should('have.length', length);
        });
      })
    });
  });
});
