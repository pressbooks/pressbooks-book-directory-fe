describe('Books per page', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);

      cy.intercept('**/indexes/*/queries?*').as('listing');

      cy.visit('/');
    });

    it('Shows 10 books per page by default', () => {
      cy.wait('@listing').then(() => {
        cy.get('[data-cy=book-card]').should('have.length', 10);
      });
    });

    it('Changes the amount of books displayed when requested', () => {
      [20, 50].forEach(length => {
        cy.intercept('**/indexes/*/queries?*').as(`listing${length}`);

        cy.get('[data-cy=books-per-page] .vs__dropdown-toggle').click();

        cy.get('[data-cy=books-per-page] .vs__dropdown-option').contains(`${length} books`).click();

        cy.wait(`@listing${length}`).then(() => {
          cy.get('[data-cy=book-card]').should('have.length', length);
        });
      })
    });
  });
});
