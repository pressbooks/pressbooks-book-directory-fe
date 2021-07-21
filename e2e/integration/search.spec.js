import {search} from '../support/common';
import Elements from '../support/elements';

describe('Search', () => {

  context('Desktop resolution', () => {

    beforeEach(()=>{
      cy.get(Elements.search.input).as('inputSearch').clear();
      cy.get(Elements.search.button).as('buttonSearch');
    });

    it('Search for specific book', () => {

      search('math science');

      cy.get('[data-cy=book-card]').should('have.length', 2);
      cy.url()
        .should('include','q=math%20science');

    });

    it('Search button will be disabled if < 3 characters', () => {

      cy.get('@inputSearch').type('fo');
      cy.get('@buttonSearch').should('be.disabled');

    });

    it('Search button will be enabled if >= 3 characters', () => {

      cy.get('@inputSearch').type('foo');
      cy.get('@buttonSearch').should('be.enabled');

    });


    it('Return to home button clear all filters', () => {

      search('math science');

      cy.get('[data-cy=book-card]').should('have.length', 2);
      cy.url()
        .should('include','q=math%20science');

      cy.get(Elements.returnHomeButton).click();

      cy.url().should('equal','http://localhost:3001/');

    });

  });

});
