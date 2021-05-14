import helpers from '../../../src/store/helpers';
const facetFilters = require('../../fixtures/selectableFilters.json');

for (const facet in facetFilters) {
  let field = facetFilters[facet].field;
  describe(`Apply ${facet} filters`, () => {
    context('Desktop resolution', () => {
      beforeEach(function () {
        cy.viewport(1280, 720)
          .visit('/')
          .algoliaQueryRequest();
      });
      for (const includeFacet of facetFilters[facet].include) {
        it(`Include ${facet} ${includeFacet} filter action. Check URL and chip. Remove filter by clicking twice and check URL.`, () => {
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
            .should('include', facetFilters[facet].urlAlias + '=' + helpers.functions.encodeFacetFilterForURL(includeFacet));

          // Remove filter by clicking again in the button filter
          cy.get(`[data-cy=filter-${field}-${facetButton}-include-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=' + helpers.functions.encodeFacetFilterForURL(includeFacet));
        });
        it(`Include ${facet} ${includeFacet} filter action and remove it by clicking in the chip`, () => {
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
            .should('not.include', facetFilters[facet].urlAlias + '=' + helpers.functions.encodeFacetFilterForURL(includeFacet));
          // check the accordion was closed
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .not('.border-b');
        });
      }

      for (const excludeFacet of facetFilters[facet].exclude) {
        it(`Exclude ${facet} ${excludeFacet} filter action. Check URL and chip.  Remove filter by clicking twice and check URL.`, () => {
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
            .should('include', facetFilters[facet].urlAlias + '=-' + helpers.functions.encodeFacetFilterForURL(excludeFacet));

          // Remove filter by clicking again in the button filter
          cy.get(`[data-cy=filter-${field}-${facetButton}-exclude-button]`)
            .click();
          cy.algoliaQueryRequest()
            .url()
            .should('not.include', facetFilters[facet].urlAlias + '=-' + helpers.functions.encodeFacetFilterForURL(excludeFacet));
        });
        it(`Exclude ${excludeFacet} filter action and remove it by clicking in the chip`, () => {
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
            .should('not.include', facetFilters[facet].urlAlias + '=-' + helpers.functions.encodeFacetFilterForURL(excludeFacet));
          // check the accordion was closed
          cy.get(`[data-cy=filter-${field}-header-button]`)
            .not('.border-b');
        });
      }

      if (facetFilters[facet].search.searchable) {
        it(`Search in ${facet} facet and check it keeps after apply filter`, () => {
          let facetButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(facetFilters[facet].search.filter);
          let facetsListBefore = [], facetsListAfter = [];
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
        });
      }

      it(`Apply include/exclude ${facet} filters and review the book cards`, () => {
        cy.get(`[data-cy=filter-${field}-header-button]`)
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
      });
    });
  });
}