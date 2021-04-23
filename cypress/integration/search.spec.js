describe('Search', () => {
  it('Search for specific books', () => {
    cy.visit('/');
    cy.get('div.input input').type('music');
    cy.get('form button[type="submit"]').click();
    cy.url()
      .should('include','?q=music');
  });
});