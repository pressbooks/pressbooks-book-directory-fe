describe('Filter collections', () => {

  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
        .visit('/')
        .intercept('**/indexes/*/queries?*').as('filtering')
        .get('[data-cy=collection-section]').as('collectionSection');
    });

    it('Check for collections section and review the title section', () => {
      cy.get('@collectionSection')
        .find('.section-title')
        .contains('Featured Collections');
    });

    it('Filter by OpenStax collection clicking in the image collection card', () => {
      cy.get('@collectionSection')
        .find('.text')
        .contains('OpenStax')
        .click();

      cy.get('[data-cy=selected-filters]')
        .find('.text')
        .contains('OpenStax')
        .url().should('include', 'collec=OpenStax')
        .wait('@filtering')
        .wait(2000)
        .get('[data-cy=book-title]')
        .contains('Anatomy & Physiology');
    });

    it('Filter by Interactive OER collection using URL', () => {
      cy.visit('http://localhost:3001/?collec=Interactive%20OER')
        .get('[data-cy=selected-filters]')
        .find('.text')
        .contains('Interactive OER')
        .wait('@filtering')
        .wait(2000)
        .get('[data-cy=book-title]')
        .contains('Business Writing For Everyone');
    });

    it('Filter by Nursing/Healthcare collection using side menu', () => {
      cy.get('[data-cy=collections-filter]').as('collectionsFilter')
        .get('@collectionsFilter')
        .find('[data-cy=filter-header-button]')
        .contains('Collection')
        .click();

      cy.get('@collectionsFilter')
        .find('[data-cy=filter-option]:first-child').as('nursingCollectionFilter')
        .get('@nursingCollectionFilter')
        .contains('Nursing/Healthcare')
        .get('@nursingCollectionFilter')
        .find('[data-cy=filter-include-button]')
        .click();

      cy.get('[data-cy=selected-filters]')
        .find('.text')
        .contains('Nursing/Healthcare')
        .url().should('include', 'collec=Nursing%2FHealthcare')
        .wait('@filtering')
        .wait(1000)
        .get('[data-cy=book-title]')
        .contains('Nursing Pharmacology')
        .get('[data-cy=book-title]')
        .contains('Leadership and Influencing Change in Nursing');
    });
  });
});