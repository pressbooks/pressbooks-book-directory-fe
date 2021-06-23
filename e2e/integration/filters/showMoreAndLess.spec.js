describe('Show more/less facet filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      cy.get('div[data-cy=license-filter]').as('licenseAccordion');
      cy.get('div[data-cy=subject-filter]').as('subjectAccordion');
      cy.get('div[data-cy=language-filter]').as('languageAccordion');
      cy.get('div[data-cy=network-filter]').as('networkAccordion');
    });

    it('Show more and show less will not be visible if there are not enough options', () => {
      cy.get('@licenseAccordion')
        .click()
        .find('[data-cy=filter-licenseCode-option]')
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
        .find('[data-cy=filter-about-option]')
        .should('have.length', 10);

      cy.get('@subjectAccordion')
        .find('button[data-cy=show-more-about]')
        .should('contain.text', 'Show more (90)')
        .click()
        .should('contain.text', 'Show more (80)');

      cy.get('@subjectAccordion')
        .find('[data-cy=filter-about-option]')
        .should('have.length', 20);
    });

    it('Reaching the end of the list will remove show more and add show less button', () => {
      cy.get('@languageAccordion')
        .click()
        .find('[data-cy=filter-languageName-option]')
        .should('have.length', 10);

      cy.get('@languageAccordion')
        .find('button[data-cy=show-less-languageName]')
        .should('not.exist');

      cy.get('@languageAccordion')
        .find('button[data-cy=show-more-languageName]')
        .should('contain.text', 'Show more (2)')
        .click();

      cy.algoliaQueryRequest();

      cy.get('@languageAccordion')
        .find('button[data-cy=show-more-languageName]')
        .should('not.exist');

      cy.get('@languageAccordion')
        .find('button[data-cy=show-less-languageName]')
        .should('exist');

      cy.get('@languageAccordion')
        .find('[data-cy=filter-languageName-option]')
        .should('have.length', 12);
    });

    it('Clicking on show less will reset the amount of items displayed', () => {
      cy.get('@networkAccordion')
        .click()
        .find('[data-cy=filter-networkName-option]')
        .should('have.length', 10);

      cy.get('@networkAccordion')
        .find('button[data-cy=show-more-networkName]')
        .should('contain.text', 'Show more (86)');

      [...Array(9)].forEach(
        () => cy.get('@networkAccordion').find('button[data-cy=show-more-networkName]').click()
      );

      cy.algoliaQueryRequest();

      cy.get('@networkAccordion')
        .find('[data-cy=filter-networkName-option]')
        .should('have.length', 96);

      cy.get('@networkAccordion')
        .find('button[data-cy=show-less-networkName]')
        .click();

      cy.algoliaQueryRequest();

      cy.get('@networkAccordion')
        .find('[data-cy=filter-networkName-option]')
        .should('have.length', 10);
    });
  });
});
