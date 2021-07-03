import {search} from '../support/common';
import Elements from '../support/elements';

describe('Welcome header book and network counts', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.get('[data-cy=total-books-indexed]').as('totalBooksIndexed');
      cy.get('[data-cy=total-networks-indexed]').as('totalNetworksIndexed');
    });

    it('Shows the amount of books and networks indexed', function () {
      cy.get('@totalBooksIndexed').should('have.text', '2,329');
      cy.get('@totalNetworksIndexed').should('have.text', 89);
    });

    it('Does not change indexed amount after performing a search', function() {
      search('math science').then(() => {
        cy.get('@totalBooksIndexed').should('have.text', '2,329');
        cy.get('@totalNetworksIndexed').should('have.text', 89);
      });
    });
  });
});
