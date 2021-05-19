import Elements from '../support/elements';

describe('Pagination', () => {
  context('Desktop Resolution', () => {
    beforeEach(() => {

      cy.get(Elements.search.input).as('inputSearch').clear();
      cy.get(Elements.search.button).as('buttonSearch');

      cy.get('div[data-cy=book-card]:first-child a[data-cy=book-title]').as('firstBookTitle');
      cy.get('ul[data-cy=paginator] [data-cy=paginator-link]:first-child').as('firstPageLink');
      cy.get('[data-cy=paginator-next]').as('nextPaginatorArrow');
      cy.get('article[data-cy=license-filter]').as('licenseAccordion');
      cy.get('[data-cy=filter-licenseCode-public-domain-include-button]').as('publicDomainFilter');

      cy.algoliaQueryRequest('algoliaRequest');
    });

    it('Render next page books after clicking a page', () => {
      cy.get('@firstBookTitle').contains('Prior Learning Portfolio Development');
      cy.get('@firstPageLink').find('a').should('have.class','font-bold');

      cy.get('@firstPageLink').next().click({multiple:true});

      cy.wait('@algoliaRequest');

      cy.get('@firstBookTitle').contains('Physics 103 and 104 Teaching Guide');
      cy.get('@firstPageLink').next().find('a').should('have.class','font-bold');

      cy.get('[data-cy=paginator-prev]').should('be.visible');
    });

    it('Paginate on facet search',() => {
      cy.get('@licenseAccordion').click();

      cy.get('@publicDomainFilter').click();

      cy.wait('@algoliaRequest');

      cy.get('@firstBookTitle').contains('Fundamentals of Plant Genebanking');

      cy.get('ul[data-cy=paginator]').eq(0).find('[data-cy=paginator-link]').should('have.length', 3);
    });

    it('Reset current pagination when a new search is performed',() => {
      cy.get('@firstPageLink').next().next().click({multiple:true});

      cy.wait('@algoliaRequest');

      cy.get('[data-cy=paginator-link]:nth-of-type(4)').find('a').should('have.class','font-bold');

      cy.get('[data-cy=book-input-search]').type('Music');

      cy.get('[data-cy=book-button-search]').click();

      cy.wait('@algoliaRequest');

      cy.get('@firstPageLink').find('a').should('have.class','font-bold');
    });
  });
});
