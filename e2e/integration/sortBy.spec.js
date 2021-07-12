import {sortBy} from '../support/common';

const { _ } = Cypress;
describe('Sort books by', () => {
  context('Desktop resolution', () => {
    it('Sorts by title in ascending order', () => {
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
        }).url().should('include', '?sort=name');
    });

    it('Sorts by title in ascending order by URL', () => {
      cy.visit('/?sort=name')
        .algoliaQueryRequest('sorting');

      const toStrings = titles$ => _.map(titles$, 'textContent');
      const cleanup = titles => _.filter(titles, title => title.trim()[0].match(/[a-z]/i));

      cy.get('[data-cy=book-card] [data-cy=book-title]')
        .then(toStrings)
        .then(cleanup)
        .then(titles => {
          const sorted = _.sortBy(titles);

          expect(titles).to.deep.equal(sorted);
        });
    });

    it('Sorts by recently updated in descending order', () => {
      sortBy('Title (A-Z)');
      cy.algoliaQueryRequest('sorting');

      sortBy('Recently updated');
      cy.algoliaQueryRequest('sorting');

      // Waiting for 2 seconds since it does not trigger another request
      cy.wait(2000).then(() => {
        const toStrings = dates$ => _.map(dates$, 'textContent');
        const toDates = dates => _.map(dates, date => new Date(date));

        cy.get('[data-cy=book-card] [data-cy=book-last-updated] span')
          .then(toStrings)
          .then(toDates)
          .then(dates => {
            const sorted = _.sortBy(dates);

            expect(dates).to.deep.equal(sorted);
          });
      }).url().should('include', '?sort=updated');
    });
  });
});