describe('Filter last updated', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
        .visit('/')
        .algoliaQueryRequest('algoliaRequest')
        .get('article[data-cy=last-updated-filter]').as('lastUpdatedAccordion');

      cy.get('@lastUpdatedAccordion')
        .click()
        .get('div[data-cy=from-date-lastUpdated] input')
        .first()
        .as('fromLastUpdated');

      cy.get('@lastUpdatedAccordion')
        .click()
        .get('div[data-cy=to-date-lastUpdated] input')
        .first()
        .as('toLastUpdated');

      cy.get('button[data-cy=apply-filter-lastUpdated]').as('applyFilterButton');
    });

    it('Applying "start date" using the datepicker filters books that were modified since then', () => {
      cy.get('@fromLastUpdated').click();

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get('button[data-date=2021-04-27]').click();

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated >= 04/27/2021').should('be.visible')
        .url().should('include', 'updated=%3E%3D1619492400');

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "to date" using the datepicker filters books that were modified until then', () => {
      cy.get('@toLastUpdated').click();

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get('button[data-date=2021-04-27]').click();

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated <= 04/27/2021').should('be.visible')
        .url().should('include', 'updated=%3C%3D1619567999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "start date" and "to date" using the datepicker filters books that were modified in between', () => {
      cy.get('@fromLastUpdated').click();

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get('button[data-date=2021-04-01]').click();

      cy.get('@toLastUpdated').click();

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get('button[data-date=2021-04-02]').click();

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 2)
        .find('.text-sm')
        .url().should('include', 'updated=%3E%3D1617246000%26%26%3C%3D1617407999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-2-2021');

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-1-2021');
    });

    it('Applying "start date" using the URL filters books that were modified since then', () => {
      cy.visit('/?updated=%3E%3D1619492400');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated >= 04/27/2021').should('be.visible')
        .url().should('include', 'updated=%3E%3D1619492400');

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "to date" using the URL filters books that were modified until then', () => {
      cy.visit('/?updated=%3C%3D1619567999');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated <= 04/27/2021').should('be.visible')
        .url().should('include', 'updated=%3C%3D1619567999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "start date" and "to date" using the URL filters books that were modified in between', () => {
      cy.visit('/?updated=%3E%3D1617246000%26%26%3C%3D1617407999');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 2)
        .find('.text-sm')
        .url().should('include', 'updated=%3E%3D1617246000%26%26%3C%3D1617407999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-2-2021');

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-1-2021');
    });

    it('Removing chip will remove the date filter', () => {
      cy.visit('/?updated=%3C%3D1619567999');

      cy.get('@toLastUpdated').should('contain.value', 'April 27, 2021');

      cy.get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('button')
        .click();

      cy.get('[data-cy=chip-filter]')
        .should('not.exist')
        .url().should('not.include', 'updated=%3C%3D1619567999');

      cy.get('@toLastUpdated').should('have.value', '');
    });
  });
});
