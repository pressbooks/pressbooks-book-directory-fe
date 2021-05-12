describe('Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
        .visit('/')
        .algoliaQueryRequest('algoliaRequest');

      cy.get('article[data-cy=license-filter]').as('licenseAccordion')
        .get('article[data-cy=subject-filter]').as('subjectAccordion');

      cy.get('@licenseAccordion').click()
        .get('@subjectAccordion').click();

      cy.get('@licenseAccordion')
        .find('[data-cy=filter-licenseCode-option]:nth-child(3)')
        .as('licenseThirdOption')
        .find('span')
        .should('contain.text', 'All Rights Reserved (430)');

      cy.get('@subjectAccordion')
        .find('[data-cy=filter-search]:first-child input')
        .as('subjectSearch');

      cy.get('@subjectAccordion')
        .find('[data-cy=filter-about-option]:nth-child(2)') // It's the second one because we have the search as a child
        .as('subjectFirstItem')
        .find('span')
        .should('contain.text', 'Education (97)');
    });

    it('When applying a filter, others are updated to match with the applied one', () => {
      cy.get('[data-cy=filter-licenseCode-all-rights-reserved-include-button]')
        .click();

      cy.get('@subjectFirstItem')
        .find('span')
        .should('contain.text', 'Education (5)');

      cy.get('button[data-cy=filter-licenseCode-all-rights-reserved-exclude-button]')
        .click();

      cy.get('@subjectFirstItem')
        .find('span')
        .should('contain.text', 'Education (92)');
    });

    it('When searching a facet, applying a filter does not reset the filter', () => {
      cy.get('@subjectSearch')
        .type('psychology');

      cy.get('@subjectFirstItem')
        .find('span')
        .should('contain.text', 'Psychology (32)');

      cy.get('[data-cy=filter-licenseCode-all-rights-reserved-include-button]')
        .click();

      cy.get('@subjectFirstItem')
        .find('span')
        .should('contain.text', 'Psychology (1)');
    });
  });
});
