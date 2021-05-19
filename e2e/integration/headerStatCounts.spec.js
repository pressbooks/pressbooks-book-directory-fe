import {search} from '../support/common';
import Elements from '../support/elements';

describe('Welcome header book and network counts', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {

      cy.get(Elements.search.input).as('inputSearch').clear();
      cy.get(Elements.search.button).as('buttonSearch');

      cy.wait('@fetching').then(({response}) => {

        cy.wrap(response.body.nbHits).as('booksIndexed');
        cy.wrap(Object.keys(response.body.facets.networkName).length).as('networksIndexed');

      });

      cy.get('[data-cy=total-books-indexed]').as('totalBooksIndexed');
      cy.get('[data-cy=total-networks-indexed]').as('totalNetworksIndexed');
    });

    it('Shows the amount of books and networks indexed', function () {
      cy.get('@totalBooksIndexed').should('have.text', this.booksIndexed);
      cy.get('@totalNetworksIndexed').should('have.text', this.networksIndexed);
    });

    it('Does not change indexed amount after performing a search', function() {
      search('math science').then(() => {
        cy.get('@totalBooksIndexed').should('have.text', this.booksIndexed);
        cy.get('@totalNetworksIndexed').should('have.text', this.networksIndexed);
      });
    });
  });
});
