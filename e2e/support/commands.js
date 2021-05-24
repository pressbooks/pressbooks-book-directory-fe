Cypress.Commands.add('algoliaQueryRequest', (alias='algoliaQuery') => {
  cy.get('#nprogress').should('not.exist').as(alias);
});
