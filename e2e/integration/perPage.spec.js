import { perPage } from '../support/common';

describe('Books per page', () => {
  context('Desktop resolution', () => {

    it('Shows 10 books per page by default', () => {
      cy.get('[data-cy=book-card]').should('have.length', 10);
    });

    it('Changes the amount of books displayed when requested', () => {
      [20, 50].forEach(length => {
        cy.intercept('**/indexes/*/queries?*').as(`listing${length}`);

        cy.algoliaQueryRequest('listing');

        perPage(length);

        cy.wait(`@listing${length}`).then(() => {
          cy.get('[data-cy=book-card]').should('have.length', length);
        });
        cy.url().should('include', `per_page=${length}`);
      });
    });

    it('Changes the amount of books displayed when requested by URL', () => {
      [20, 50].forEach(length => {
        cy.intercept('**/indexes/*/queries?*').as(`listing${length}`);
        cy.visit(`/?sort=updated&per_page=${length}`);
        cy.algoliaQueryRequest('listing');
        cy.wait(`@listing${length}`).then(() => {
          cy.get('[data-cy=book-card]').should('have.length', length);
        });
        cy.url().should('include', `per_page=${length}`);
      });
    });
  });
});
