describe('Books per page', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Shows 10 books per page by default', () => {
      cy.visit('/');

      cy.get('.book-box').should('have.length', 10);
    });

    it('Changes the amount of books displayed when requested', () => {
      cy.visit('/');

      cy.get('div.books-per-page .vs__dropdown-toggle').click().then(() => {
        cy.get('li.vs__dropdown-option').contains('20 books').click();
        cy.get('.book-box').should('have.length', 20);
      });
    });
  });
});
