describe('Filter collections', () => {

  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.get('[data-cy=collection-section]').as('collectionSection');
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

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .find('.text-sm')
        .contains('OpenStax')
        .url().should('include', 'collec=OpenStax')
        .get('[data-cy=book-title]')
        .contains('Anatomy & Physiology');
    });

    it('Filter by Interactive OER collection using URL', () => {
      cy.visit('http://localhost:3001/?collec=Interactive%20OER')
        .algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .find('.text-sm')
        .contains('Interactive OER')
        .get('[data-cy=book-title]')
        .contains('Business Writing For Everyone');
    });

    it('Filter by Nursing/Healthcare collection using side menu', () => {
      cy.get('[data-cy=collections-filter]').as('collectionsFilter')
        .find('[data-cy=filter-header-button]')
        .contains('Collection')
        .click();

      cy.get('@collectionsFilter')
        .find('[data-cy=filter-option]').first().as('nursingCollectionFilter')
        .get('@nursingCollectionFilter')
        .contains('Nursing/Healthcare')
        .get('@nursingCollectionFilter')
        .find('[data-cy=filter-include-button]').should('have.class', 'include')
        .click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should(($filtersApplied) => {
          expect($filtersApplied).to.have.length(1);
        })
        .find('.text-sm')
        .contains('Nursing/Healthcare').should('be.visible')
        .url().should('include', 'collec=Nursing%2FHealthcare')
        .get('[data-cy=book-title]')
        .contains('Nursing Pharmacology')
        .get('[data-cy=book-title]')
        .contains('Leadership and Influencing Change in Nursing');
    });
  });
});
