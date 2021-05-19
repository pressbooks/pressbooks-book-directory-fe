Cypress.Commands.add('algoliaQueryRequest', (alias='algoliaQuery', waitMs = 700) => {
  cy.intercept('**/indexes/*/queries?*')
    .as(alias);
});
