// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import Elements from './elements';

beforeEach(() => {
  cy.viewport(1280, 720);
  cy.intercept('**/indexes/*/query?*').as('fetching');
  cy.visit('/');
  cy.get(Elements.search.input).as('inputSearch').clear();
  cy.get(Elements.search.button).as('buttonSearch');
});
