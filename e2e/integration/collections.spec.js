describe('See collections cards', () => {

  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit('/');
      cy.intercept('**/indexes/*/queries?*').as('filtering');
    });

    it('Looks for collections section and review the title section', () => {
      cy.get('[data-cy=collection-section]').as('collectionSection');
      cy.get('@collectionSection')
        .find('.section-title')
        .contains('Featured Collections');
    });

    it('Filter by clicking in an image collection card', () => {
      cy.get('@collectionSection')
        .find('.text')
        .contains('OpenStax')
        .click();
      cy.wait('@filtering');
      cy.get('[data-cy=selected-filters]')
        .find('.text')
        .contains('OpenStax')
        .url().should('include', 'collec=OpenStax');
      cy.get('[data-cy=book-title]')
        .contains('Anatomy & Physiology');
    });

    it('Filter collection by URL', () => {
      cy.visit('http://localhost:3001/?collec=Interactive%20OER');
      cy.get('[data-cy=selected-filters]')
        .find('.text')
        .contains('Interactive OER');
      cy.get('[data-cy=book-title]')
        .contains('Business Writing For Everyone');
    });

    it('Filter collection by side menu', () => {
      cy.get('[data-cy=collections-filter]').as('collectionsFilter');
      cy.get('@collectionsFilter')
        .find('[data-cy=filter-header-button]')
        .contains('Collection')
        .click();
      cy.get('@collectionsFilter')
        .find('[data-cy=filter-option]')
        .contains('Nursing/Healthcare')
        .find('[data-cy=filter-include-button]')
        .click();
      cy.wait('@filtering');
      cy.get('[data-cy=selected-filters]')
        .find('.text')
        .contains('Nursing/Healthcare')
        .url().should('include', 'collec=Nursing%2FHealthcare');
    });
  });
});