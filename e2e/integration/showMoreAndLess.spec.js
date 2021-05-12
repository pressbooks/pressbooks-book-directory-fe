describe('Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {
      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('article[data-cy=license-filter]').as('licenseAccordion');
      cy.get('article[data-cy=subject-filter]').as('subjectAccordion');
      cy.get('article[data-cy=language-filter]').as('languageAccordion');
      cy.get('article[data-cy=network-filter]').as('networkAccordion');
    });

    it('Show more and show less will not be visible if there are not enough options', () => {
      cy.get('@licenseAccordion')
        .click()
        .find('[data-cy=filter-option]')
        .should('have.length', 9);

      cy.get('@licenseAccordion')
        .find('button[data-cy=show-more-licenseCode]')
        .should('not.exist');

      cy.get('@licenseAccordion')
        .find('button[data-cy=show-less-licenseCode]')
        .should('not.exist');
    });

    it('Clicking on show more will update the amount of items displayed', () => {
      cy.get('@subjectAccordion')
        .click()
        .find('[data-cy=filter-option]')
        .should('have.length', 10);

      cy.get('@subjectAccordion')
        .find('button[data-cy=show-more-about]')
        .should('contain.text', 'Show more (746)')
        .click()
        .should('contain.text', 'Show more (736)');

      cy.get('@subjectAccordion')
        .find('[data-cy=filter-option]')
        .should('have.length', 20);
    });

    it('Reaching the end of the list will remove show more and add show less button', () => {
      cy.get('@languageAccordion')
        .click()
        .find('[data-cy=filter-option]')
        .should('have.length', 10);

      cy.get('@languageAccordion')
        .find('button[data-cy=show-less-languageName]')
        .should('not.exist');

      cy.get('@languageAccordion')
        .find('button[data-cy=show-more-languageName]')
        .should('contain.text', 'Show more (2)')
        .click();

      cy.get('@languageAccordion')
        .find('button[data-cy=show-more-languageName]')
        .should('not.exist');

      cy.get('@languageAccordion')
        .find('button[data-cy=show-less-languageName]')
        .should('exist');

      cy.get('@languageAccordion')
        .find('[data-cy=filter-option]')
        .should('have.length', 12);
    });

    it('Clicking on show less will reset the amount of items displayed', () => {
      cy.get('@networkAccordion')
        .click()
        .find('[data-cy=filter-option]')
        .should('have.length', 10);

      cy.get('@networkAccordion')
        .find('button[data-cy=show-more-networkName]')
        .should('contain.text', 'Show more (86)');

      [...Array(9)].forEach(
        () => cy.get('@networkAccordion').find('button[data-cy=show-more-networkName]').click()
      );

      cy.get('@networkAccordion')
        .find('[data-cy=filter-option]')
        .should('have.length', 96);

      cy.get('@networkAccordion')
        .find('button[data-cy=show-less-networkName]')
        .click();

      cy.get('@networkAccordion')
        .find('[data-cy=filter-option]')
        .should('have.length', 10);
    });
  });
});
