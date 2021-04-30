const { _ } = Cypress;
describe('Sort books by', () => {
  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Sorts by word count in descending order', () => {
      cy.visit('/');

      cy.get('div.sort-books-by .vs__dropdown-toggle').click();

      cy.intercept('**/indexes/*/queries?*').as('sorting');

      cy.get('li.vs__dropdown-option').contains('Word count').click();

      cy.wait('@sorting').then(() => {
        const toStrings = counts$ => _.map(counts$, 'textContent')
        const toNumbers = counts => _.map(counts, Number);

        cy.get('.book-box .word-count')
          .then(toStrings)
          .then(toNumbers)
          .then(wordCounts => {
            const sorted = _.sortBy(wordCounts).reverse();

            expect(wordCounts).to.deep.equal(sorted);
        });
      });
    });

    it('Sorts by title in ascending order', () => {
      cy.visit('/');

      cy.get('div.sort-books-by .vs__dropdown-toggle').click();

      cy.intercept('**/indexes/*/queries?*').as('sorting');

      cy.get('li.vs__dropdown-option').contains('Title (A-Z)').click();

      cy.wait('@sorting').then(() => {
        const toStrings = titles$ => _.map(titles$, 'textContent');
        const cleanup = titles => _.filter(titles, title => title.trim()[0].match(/[a-z]/i));

        cy.get('.book-box .name a')
          .then(toStrings)
          .then(cleanup)
          .then(titles => {
            const sorted = _.sortBy(titles);

            expect(titles).to.deep.equal(sorted);
          });
      });
    });

    it('Sorts by recently updated in descending order', () => {
      cy.visit('/');

      cy.get('div.sort-books-by .vs__dropdown-toggle').click();

      cy.intercept('**/indexes/*/queries?*').as('sorting-title');

      cy.get('li.vs__dropdown-option').contains('Title (A-Z)').click();

      cy.wait('@sorting-title').then(() => {
        cy.get('div.sort-books-by .vs__dropdown-toggle').click();

        cy.get('li.vs__dropdown-option').contains('Recently updated').click();

        // Waiting for 3 seconds since it does not trigger another request
        cy.wait(2000).then(() => {
          const toStrings = dates$ => _.map(dates$, 'textContent');
          const toDates = dates => _.map(dates, date => new Date(date));

          cy.get('.book-box .updated span')
            .then(toStrings)
            .then(toDates)
            .then(dates => {
              const sorted = _.sortBy(dates);

              expect(dates).to.deep.equal(sorted);
            });
        });
      });
    });
  });
});
