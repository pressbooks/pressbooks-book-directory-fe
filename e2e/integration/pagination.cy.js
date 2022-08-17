import Elements from '../support/elements';
import {clickAccordionHeader, clickFilter, clickPage, search} from '../support/common';

describe('Pagination', () => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      cy.get(Elements.search.input).as('inputSearch').clear();
      cy.get(Elements.search.button).as('buttonSearch');

      cy.get(Elements.booksCards.title).first().as('firstBookTitle');
      cy.get(Elements.paginatorLink(1)).as('firstPageLink');
      cy.get('[data-cy=paginator-next-top]').as('nextPaginatorArrow');

    });

    it('Render next page books after clicking a page', () => {
      cy.get('@firstBookTitle').contains('Prior Learning Portfolio Development');
      cy.get('@firstPageLink').should('have.class','font-bold');

      clickPage(2);

      cy.algoliaQueryRequest('algoliaRequest');
      cy.url()
        .should('include', 'p=2');

      cy.get('@firstBookTitle').contains('Physics 103 and 104 Teaching Guide');
      cy.get(Elements.paginatorLink(2)).should('have.class','font-bold');

      cy.get('[data-cy=paginator-prev-top]').should('be.visible');
    });

    it('Paginate on facet search', () => {

      cy.algoliaQueryRequest('algoliaRequest');

      clickAccordionHeader('licenseCode');
      clickFilter('licenseCode', 'Public Domain', true);

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('@firstBookTitle').contains('Women in the World Today, extended version');

      cy.get('ul[data-cy=paginator-top]').eq(0).find('.page').should('have.length', 3);
    });

    it('Reset current pagination when a new search is performed',() => {
      clickPage(3);

      cy.algoliaQueryRequest('algoliaRequest');
      cy.url()
        .should('include', 'p=3');

      cy.get(Elements.paginatorLink(3)).should('have.class','font-bold');

      search('Music');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('@firstPageLink').should('have.class','font-bold')
        .url()
        .should('include', 'p=1');
    });

    it('Set page using URL',() => {
      cy.visit('/?p=2');
      cy.algoliaQueryRequest('algoliaRequest')
        .get(Elements.paginatorLink(2)).should('have.class','font-bold');
      cy.get('@firstBookTitle').contains('Physics 103 and 104 Teaching Guide');
    });

    it('Set page and search term using URL',() => {
      cy.visit('/?p=2&q=biology');
      cy.algoliaQueryRequest('algoliaRequest');
      cy.get(Elements.paginatorLink(2)).should('have.class','font-bold');
      cy.get('@firstBookTitle').contains('Concepts of Biology: 1st Canadian Edition');
    });
  });
});
