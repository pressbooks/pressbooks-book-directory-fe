import {search} from '../support/common';

describe('Share Query', () => {

  context('Desktop resolution', () => {

    it('Takes the URL and populate the input field to share', ()=>{

      cy.algoliaQueryRequest('loading');

      cy.get('button[data-cy=share-button]').click();

      cy.get('div[data-cy=share-box]').should('be.visible');

      cy.get('input[data-cy=share-input]').as('share-input').invoke('val').then(val=>{
        cy.url().should('include', val);
      });

      cy.get('button[data-cy=share-copy-button]').click();

      cy.get('@share-input').invoke('val').then(val=>{
        cy.url().should('include', val);
      });

      search('health');

      cy.get('button[data-cy=share-button]').click();

      cy.get('input[data-cy=share-input]').as('share-input').invoke('val').then(val=>{
        cy.url().should('include', val);
      });

    });

  });

});
