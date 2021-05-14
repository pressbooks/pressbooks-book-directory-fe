
export const search = (term) => {

  cy.algoliaQueryRequest('searchResults');

  cy.get('@inputSearch').type(term);
  cy.get('@buttonSearch').click();

  return cy.wait(['@searchResults']);
};
