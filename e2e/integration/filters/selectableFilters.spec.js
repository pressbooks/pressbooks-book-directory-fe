import helpers from '../../../src/store/helpers';
let facetFilters = {};

describe('Using selectable filters', () => {
  beforeEach(function () {
    if (Object.keys(facetFilters).length === 0) {
      cy.fixture('selectableFilters.json').then((selectableFiltersFixture) => {
        facetFilters = selectableFiltersFixture;
      });
    }
  });
  context('Selectable Filters - Desktop resolution', () => {
    it('Include filter action. Check URL and chip. Remove filter by clicking twice and check URL.', () => {
      for (const facet in facetFilters) {
        let field = facetFilters[facet].field;
        for (const includeFacet of facetFilters[facet].include) {
          cy.viewport(1280, 720)
            .visit('/')
            .algoliaQueryRequest();
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .click();
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(includeFacet);
          cy.get(`[data-cy=filter-${field}-${facetButton}-include-button]`)
            .click();
          cy.algoliaQueryRequest()
            .get('[data-cy=chip-filter]')
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(includeFacet).should('be.visible')
            .url()
            .should('include', facetFilters[facet].urlAlias + '=' + encodeURIComponent(includeFacet));

          // Remove filter by clicking again in the button filter
          cy.get(`[data-cy=filter-${field}-${facetButton}-include-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=' + encodeURIComponent(includeFacet));
        }
      }
    });

    it('Exclude filter action. Check URL and chip.  Remove filter by clicking twice and check URL.', () => {
      for (const facet in facetFilters) {
        let field = facetFilters[facet].field;
        cy.viewport(1280, 720)
          .visit('/')
          .algoliaQueryRequest();
        for (const excludeFacet of facetFilters[facet].include) {
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .click();
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(excludeFacet);
          cy.get(`[data-cy=filter-${field}-${facetButton}-exclude-button]`)
            .click();
          cy.algoliaQueryRequest()
            .get('[data-cy=chip-filter]')
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(excludeFacet).should('be.visible')
            .url()
            .should('include', facetFilters[facet].urlAlias + '=-' + encodeURIComponent(excludeFacet));

          // Remove filter by clicking again in the button filter
          cy.get(`[data-cy=filter-${field}-${facetButton}-exclude-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=-' + encodeURIComponent(excludeFacet));
        }
      }
    });

    it('Include filter action and remove it by clicking in the chip', () => {
      for (const facet in facetFilters) {
        let field = facetFilters[facet].field;
        cy.viewport(1280, 720)
          .visit('/')
          .algoliaQueryRequest();
        for (const includeFacet of facetFilters[facet].include) {
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .click();
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(includeFacet);
          cy.get(`[data-cy=filter-${field}-${facetButton}-include-button]`)
            .click();
          // Remove filter by clicking in the active filter chip
          cy.get(`[data-cy=chip-filter-${field}-${facetButton}-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=' + encodeURIComponent(includeFacet));
          // check the accordion was closed
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .not('.border-b');
        }
      }
    });

    it('Exclude filter action and remove it by clicking in the chip', () => {
      for (const facet in facetFilters) {
        let field = facetFilters[facet].field;
        cy.viewport(1280, 720)
          .visit('/')
          .algoliaQueryRequest();
        for (const excludeFacet of facetFilters[facet].exclude) {
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .click();
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(excludeFacet);
          cy.get(`[data-cy=filter-${field}-${facetButton}-exclude-button]`)
            .click();
          // Remove filter by clicking in the active filter chip
          cy.get(`[data-cy=chip-filter-${field}-${facetButton}-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=-' + encodeURIComponent(excludeFacet));
          // check the accordion was closed
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .not('.border-b');
        }
      }
    });

    it('Search facet and check it keeps after apply filter', () => {
      for (const facet in facetFilters) {
        if (facetFilters[facet].search.searchable) {
          let field = facetFilters[facet].field;
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(facetFilters[facet].search.filter);
          let facetsListBefore = [], facetsListAfter = [];
          cy.viewport(1280, 720)
            .visit('/')
            .algoliaQueryRequest();
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .click();
          cy.get(`[data-cy=search-filter-${field}]`)
            .type(facetFilters[facet].search.searchTerm)
            .get(`[data-cy=filter-${field}-option]`)
            .each(($filterOptions) => {
              facetsListBefore.push($filterOptions.innerText);
            });
          cy.get(`[data-cy=filter-${field}-${facetButton}-include-button]`)
            .click();
          // Check the facet list after filter was applied
          cy.algoliaQueryRequest()
            .get(`[data-cy=filter-${field}-option]`)
            .each(($filterOptions) => {
              facetsListAfter.push($filterOptions.innerText);
            }).should(() => {
              expect(facetsListAfter).to.deep.equal(facetsListBefore);
            });
        }
      }
    });

    it('Apply include/exclude filters and review the book cards', () => {
      for (const facet in facetFilters) {
        let field = facetFilters[facet].field;
        cy.viewport(1280, 720)
          .visit('/')
          .algoliaQueryRequest()
          .get(`[data-cy=filter-${field}-header-button]`)
          .click();
        const textCyIncludeExclude = facetFilters[facet].bookCards.include ? 'include' : 'exclude';
        for (const filter of facetFilters[facet].bookCards.filters) {
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(filter);
          cy.get(`[data-cy=filter-${field}-${facetButton}-${textCyIncludeExclude}-button]`)
            .click();
        }
        cy.algoliaQueryRequest()
          .get('[data-cy=book-title]')
          .each(($title) => {
            cy.get('[data-cy=book-title]').should(() => {
              expect($title.text().replace(/(\r\n|\n|\r)/gm, '').trim())
                .to.contain.oneOf(facetFilters[facet].bookCards.booksTitle);
            });
          });
      }
    });
  });
});