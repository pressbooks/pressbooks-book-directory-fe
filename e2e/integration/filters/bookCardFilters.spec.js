import Elements from '../../support/elements';

describe('BookCard Collections Filters',() => {
  context('Desktop Resolution', () => {

    it('Recommended filter toggle',()=>{

      cy.get(Elements.booksCards.recommended).should('have.class','text-pb-red');

      cy.get(Elements.booksCards.recommended).click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.url().should('include','recommended=true');

      cy.get(Elements.booksCards.recommended).should('have.length',10)
        .should('not.have.class','text-pb-red')
        .should('have.class','text-white');

      cy.get(Elements.booksCards.recommended).first().click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.recommended)
        .should('not.have.class','text-white');

    });

    it('Collection filter toggle',()=>{

      cy.visit('/?collec=OpenStax');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().should('have.class','text-pb-red');
      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().next().should('have.class','text-white');

      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().should('have.class','text-white');

      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get(Elements.booksCards.recommended+':nth-of-type(1)').next().should('have.class','text-pb-red');

      cy.url().should('include','?collec=OpenStax');

    });

  });
});
