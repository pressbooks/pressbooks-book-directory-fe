describe('Books per page', () => {
  context('Desktop resolution', () => {

    it('Shows 10 books per page by default', () => {
      cy.get('[data-cy=book-card]').should('have.length', 10);
    });

    it('Changes the amount of books displayed when requested', () => {
      [20, 50].forEach(length => {
        cy.intercept('**/indexes/*/queries?*').as(`listing${length}`);

        cy.algoliaQueryRequest('listing');

        cy.get('[data-cy=books-per-page] .vs__dropdown-toggle').click();

        cy.get('[data-cy=books-per-page] .vs__dropdown-option').contains(`${length} books`).click();

        cy.wait(`@listing${length}`).then(() => {
          cy.get('[data-cy=book-card]').should('have.length', length);
        });
      });
    });
  });
});
