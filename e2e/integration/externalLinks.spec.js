const externalLinks = require('../fixtures/externalLinks.json');

describe('No external links are broken', function () {
  for (const link in externalLinks) {
    it(`${link} is not broken`, () => {
      const { navigate, url } = externalLinks[link];
      cy.get(`[data-cy=${link}]`)
        .should('have.attr', 'href', url)
        .should('have.attr', 'rel', 'noopener')
        .then((element) => {
          if (navigate) {
            cy.request(element.prop('href')).its('status').should('eq', 200);
          }
        });
    });
  }
});
