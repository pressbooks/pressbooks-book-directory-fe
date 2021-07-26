import Elements from '../../support/elements';

describe('BookCard Collections Filters', () => {
  context('Desktop Resolution', () => {
    it('Collection filter toggle', () => {

      cy.visit('/?sort=updated&collec=OpenStax');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.bookTags)
        .eq(1)
        .find('li:first-child button')
        .should('have.class', 'text-pb-red');

      cy.get(Elements.booksCards.bookTags)
        .eq(1)
        .find('li:nth-of-type(2) button')
        .should('have.class', 'text-white');

      cy.get(Elements.booksCards.bookTags)
        .eq(1)
        .find('li:first-child button')
        .click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.bookTags)
        .eq(1)
        .find('li:first-child button')
        .should('have.class', 'text-white')
        .click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.bookTags)
        .eq(1)
        .find('li:first-child button')
        .should('have.class', 'text-pb-red');

      cy.url().should('include','collec=OpenStax');

    });

  });
});
