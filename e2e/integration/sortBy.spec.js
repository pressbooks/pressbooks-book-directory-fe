import {clickAccordionHeader, clickFilter, sortBy} from '../support/common';

const { _ } = Cypress;
describe('Sort books by', () => {
  context('Desktop resolution', () => {
    it('Sorts feature is disabled by default', () => {
      cy.get('[data-cy=sort-books-by]')
        .find('.vs--single')
        .should('have.class','vs--disabled');
    });

    it('Sorts by title in ascending order', () => {
      clickAccordionHeader('licenseCode');
      clickFilter('licenseCode', 'CC BY', true);
      sortBy('Title (A-Z)');

      cy.algoliaQueryRequest('sorting');

      const toStrings = titles$ => _.map(titles$, 'textContent');
      const cleanup = titles => _.filter(titles, title => title.trim()[0].match(/[a-z]/i));

      cy.get('[data-cy=book-card] [data-cy=book-title]')
        .then(toStrings)
        .then(cleanup)
        .then(titles => {
          const sorted = _.sortBy(titles);

          expect(titles).to.deep.equal(sorted);
        }).url().should('not.include', '?sort=name');
    });

    it('Sorts by title in ascending order by URL', () => {
      cy.visit('/?collec=Student%20Authored&sort=name')
        .algoliaQueryRequest('sorting');

      const toStrings = titles$ => _.map(titles$, 'textContent');
      const cleanup = titles => _.filter(titles, title => title.toLowerCase().trim()[0].match(/[a-z]/i));

      cy.get('[data-cy=book-card] [data-cy=book-title]')
        .then(toStrings)
        .then(cleanup)
        .then(titles => {
          const sorted = _.sortBy(titles);

          expect(titles).to.deep.equal(sorted);
        });
    });

    it('Sorts by recently updated in descending order', () => {
      clickAccordionHeader('licenseCode');
      clickFilter('licenseCode', 'CC BY-ND', true);
      sortBy('Recently updated');
      cy.algoliaQueryRequest('sorting');

      // Waiting for 2 seconds since it does not trigger another request
      cy.wait(2000).then(() => {
        const toDates = dates => _.map(dates, date => new Date(date));

        cy.get('[data-cy=book-card] [data-cy=book-last-updated] span')
          .then(toDates)
          .then(dates => {
            const sorted = _.sortBy(dates);

            expect(dates).to.deep.equal(sorted);
          });
      }).url().should('include', 'sort=updated');
    });
  });
});
