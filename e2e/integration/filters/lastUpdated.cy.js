import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {clickAccordionHeader, clickPage} from '../../support/common';

dayjs.extend(utc);

describe('Filter last updated', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      clickAccordionHeader('lastUpdated');
      cy.get('div[data-cy=from-date-lastUpdated] input').as('fromLastUpdated');

      cy.get('div[data-cy=to-date-lastUpdated] input').as('toLastUpdated');

      cy.get('button[data-cy=apply-filter-lastUpdated]').as('applyFilterButton');
    });

    it('Applying "start date" using the datepicker filters books that were modified since then', () => {

      const startDate = '2021-04-27';

      const formattedDate = dayjs(startDate).format('MMM DD, YYYY');

      cy.get('@fromLastUpdated').type(formattedDate+'{enter}');

      const startTimestamp = dayjs.utc(startDate).startOf('day').unix();

      cy.algoliaQueryRequest()
        .get('@applyFilterButton')
        .click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated >= 04-27-2021').should('be.visible')
        .url().should('include', `updated=%3E=${startTimestamp}`);

      clickPage(5);

      cy.algoliaQueryRequest();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "to date" using the datepicker filters books that were modified until then', () => {

      const toDate = '2021-04-27';
      const toTimestamp = dayjs.utc(toDate).endOf('day').unix();

      const formattedDate = dayjs(toDate).format('MMM DD, YYYY');

      cy.get('@toLastUpdated').type(formattedDate+'{enter}');

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated <= 04-27-2021').should('be.visible')
        .url().should('include', `updated=%3C=${toTimestamp}`);

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '01-13-2021');
    });

    it('Applying "start date" and "to date" using the datepicker filters books that were modified in between', () => {
      const startDate = '2021-04-01';
      const startTimestamp = dayjs.utc(startDate).startOf('day').unix();

      const formattedDate = dayjs(startDate).format('MMM DD, YYYY');

      cy.get('@fromLastUpdated').type(formattedDate+'{enter}');

      const toDate = '2021-04-02';
      const toTimestamp = dayjs.utc(toDate).endOf('day').unix();

      const formattedToDate = dayjs(toDate).format('MMM DD, YYYY');

      cy.get('@toLastUpdated').type(formattedToDate+'{enter}', {force: true});

      cy.get('@applyFilterButton').click();

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 2)
        .find('.text-sm')
        .url().should('include', `updated=%3E=${startTimestamp}%26%26%3C=${toTimestamp}`);
      cy.wait(1500);

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-1-2021');

      clickPage(2);

      cy.algoliaQueryRequest();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-1-2021');
    });

    it('Applying "start date" using the URL filters books that were modified since then', () => {
      cy.visit('/?sort=updated&updated=%3E%3D1619481600');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated >= 04-27-2021').should('be.visible')
        .url().should('include', 'updated=%3E%3D1619481600');

      clickPage(5);

      cy.algoliaQueryRequest();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "to date" using the URL filters books that were modified until then', () => {
      cy.visit('/?sort=updated&updated=%3C%3D1619567999');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('.text-sm')
        .contains('Updated <= 04-27-2021').should('be.visible')
        .url().should('include', 'updated=%3C%3D1619567999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-27-2021');
    });

    it('Applying "start date" and "to date" using the URL filters books that were modified in between', () => {
      cy.visit('/?sort=updated&updated=%3E=1617235200%26%26%3C=1617407999');

      cy.algoliaQueryRequest()
        .get('[data-cy=chip-filter]')
        .should('have.length', 2)
        .find('.text-sm')
        .url().should('include', 'updated=%3E=1617235200%26%26%3C=1617407999');

      cy.get('[data-cy=book-last-updated]')
        .first()
        .find('span')
        .should('contain.text', '04-2-2021');

      clickPage(2);

      cy.algoliaQueryRequest();

      cy.get('[data-cy=book-last-updated]')
        .last()
        .find('span')
        .should('contain.text', '04-1-2021');
    });

    it('Removing chip will remove the date filter', () => {
      cy.visit('/?sort=updated&updated=%3C%3D1619567999');

      cy.get('@toLastUpdated').should('contain.value', 'Apr 27, 2021');

      cy.get('[data-cy=chip-filter]')
        .should('have.length', 1)
        .find('button')
        .click();

      cy.algoliaQueryRequest();

      cy.get('[data-cy=chip-filter]')
        .should('not.exist')
        .url().should('not.include', 'updated=%3C=1619567999');

      cy.get('@toLastUpdated').should('have.value', '');
    });
  });
});
