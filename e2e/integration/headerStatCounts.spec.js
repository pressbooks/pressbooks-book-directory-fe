describe('Welcome header book and network counts', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);

      cy.intercept('**/indexes/*/query?*').as('fetching');

      cy.visit('/');

      cy.wait('@fetching').then(({response}) => {
        cy.wrap(response.body.nbHits).as('booksIndexed');
        cy.wrap(Object.keys(response.body.facets.networkName).length).as('networksIndexed');
      });

      cy.get('[data-cy=total-books-indexed]').as('totalBooksIndexed');
      cy.get('[data-cy=total-networks-indexed]').as('totalNetworksIndexed');
      cy.get('[data-cy=book-input-search]').as('searchInput').clear();
      cy.get('[data-cy=book-button-search]').as('searchButton');
    });

    it('Shows the amount of books and networks indexed', function () {
      cy.get('@totalBooksIndexed').should('have.text', this.booksIndexed);
      cy.get('@totalNetworksIndexed').should('have.text', this.networksIndexed);
    });

    it('Does not change indexed amount after performing a search', function() {
      cy.algoliaQueryRequest('searchResults');

      cy.get('@searchInput').type('math science');
      cy.get('@searchButton').click();

      cy.wait(['@searchResults']).then(() => {
        cy.get('@totalBooksIndexed').should('have.text', this.booksIndexed);
        cy.get('@totalNetworksIndexed').should('have.text', this.networksIndexed);
      });
    });
  });
});
