import {getUnixTime, parse} from 'date-fns';

describe('Filter last updated', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {

      cy.get('article[data-cy=last-updated-filter]').as('lastUpdatedAccordion');

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

      const startDate = '2021-04-27';
      const startDateTimeStamp = getUnixTime(parse(`${startDate} 00:00:00`, 'yyyy-MM-dd H:m:s', new Date));

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get(`button[data-date=${startDate}]`).click();

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated >= 04/27/2021').should('be.visible')
        .url().should('include', `updated=%3E%3D${startDateTimeStamp}`);

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.algoliaQueryRequest();

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

      const startDate = '2021-04-01';
      const startDateTimeStamp = getUnixTime(parse(`${startDate} 00:00:00`, 'yyyy-MM-dd H:m:s', new Date));

      const toDate = '2021-04-02';
      const toDateObj = parse(`${toDate} 23:59:59`, 'yyyy-MM-dd H:m:s', new Date);
      const toDateTimeStamp = getUnixTime(toDateObj) - toDateObj.getTimezoneOffset() * 60;

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get(`button[data-date=${startDate}]`).click();

      cy.get('@toLastUpdated').click();

      cy.get('button[aria-label="Prev Year"]').click();
      cy.get(`button[data-date=${toDate}]`).click();

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 2)
        .find('.text-sm')
        .url().should('include', `updated=%3E%3D${startDateTimeStamp}%26%26%3C%3D${toDateTimeStamp}`);

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-2-2021');

      cy.get('[data-cy=paginator]')
        .first()
        .find('[data-cy=paginator-link]')
        .last()
        .click();

      cy.algoliaQueryRequest();

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

      cy.algoliaQueryRequest();

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

      cy.algoliaQueryRequest();

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

      cy.algoliaQueryRequest();

      cy.get('[data-cy=chip-filter]')
        .should('not.exist')
        .url().should('not.include', 'updated=%3C%3D1619567999');

      cy.get('@toLastUpdated').should('have.value', '');
    });
  });
});
