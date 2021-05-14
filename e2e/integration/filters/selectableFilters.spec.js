import Elements from '../../support/elements';
import {
  encodeFacetFilterForURL,
  clickAccordionHeader,
  clickFilter,
  searchFacet,
  removeChipFilter
} from '../../support/common';


const facetFilters = require('../../fixtures/selectableFilters.json');

for (const facet in facetFilters) {
  let field = facetFilters[facet].field;
  describe(`Apply ${facet} filters`, () => {
    context('Desktop resolution', () => {
      beforeEach(function () {
        cy.algoliaQueryRequest();
      });
      for (const includeFacet of facetFilters[facet].include) {
        it(`Include ${facet} ${includeFacet} filter action. Check URL and chip. Remove filter by clicking twice and check URL.`, () => {
          clickAccordionHeader(field);
          clickFilter(field, includeFacet, true);
          cy.get(Elements.filterChips)
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(includeFacet).should('be.visible')
            .url()
            .should('include', facetFilters[facet].urlAlias + '=' + encodeFacetFilterForURL(includeFacet));

          // Remove filter by clicking again in the button filter
          clickFilter(field, includeFacet, true);
          cy.url()
            .should('not.include', facetFilters[facet].urlAlias + '=' + encodeFacetFilterForURL(includeFacet));
        });
        it(`Include ${facet} ${includeFacet} filter action and remove it by clicking in the chip`, () => {
          clickAccordionHeader(field);
          clickFilter(field, includeFacet, true);

          // Remove filter by clicking in the active filter chip
          removeChipFilter(field, includeFacet);
          cy.url()
            .should('not.include', facetFilters[facet].urlAlias + '=' + encodeFacetFilterForURL(includeFacet));

          // check the accordion was closed
          cy.get(Elements.filterAccordion(field))
            .not('.border-b');
        });
      }

      for (const excludeFacet of facetFilters[facet].exclude) {
        it(`Exclude ${facet} ${excludeFacet} filter action. Check URL and chip.  Remove filter by clicking twice and check URL.`, () => {
          clickAccordionHeader(field);
          clickFilter(field, excludeFacet, false);

          cy.get(Elements.filterChips)
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(excludeFacet).should('be.visible')
            .url()
            .should('include', facetFilters[facet].urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));

          // Remove filter by clicking again in the button filter
          clickFilter(field, excludeFacet, false);
          cy.url()
            .should('not.include', facetFilters[facet].urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));
        });
        it(`Exclude ${excludeFacet} filter action and remove it by clicking in the chip`, () => {
          clickAccordionHeader(field);
          clickFilter(field, excludeFacet, false);

          // Remove filter by clicking in the active filter chip
          removeChipFilter(field, excludeFacet);
          cy.url()
            .should('not.include', facetFilters[facet].urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));

          // check the accordion was closed
          cy.get(Elements.filterAccordion(field))
            .not('.border-b');
        });
      }

      if (facetFilters[facet].search.searchable) {
        it(`Search in ${facet} facet and check it keeps after apply filter`, () => {
          clickAccordionHeader(field);
          searchFacet(field, facetFilters[facet].search.searchTerm);
          let facetsListBefore = [], facetsListAfter = [];
          cy.get(Elements.filterOptions(field))
            .each(($filterOptions) => {
              facetsListBefore.push($filterOptions.innerText);
            });
          clickFilter(field, facetFilters[facet].search.filter, true);

          // Check the facet list after filter was applied
          cy.get(Elements.filterOptions(field))
            .each(($filterOptions) => {
              facetsListAfter.push($filterOptions.innerText);
            }).should(() => {
              expect(facetsListAfter).to.deep.equal(facetsListBefore);
            });
        });
      }

      it(`Apply include/exclude ${facet} filters and review the book cards`, () => {
        clickAccordionHeader(field);
        const isInclude = facetFilters[facet].bookCards.include ? true : false;
        for (const filter of facetFilters[facet].bookCards.filters) {
          clickFilter(field, filter, isInclude);
        }
        cy.get(Elements.books.titles)
          .each(($title) => {
            cy.get(Elements.books.titles).should(() => {
              expect($title.text().replace(/(\r\n|\n|\r)/gm, '').trim())
                .to.contain.oneOf(facetFilters[facet].bookCards.booksTitle);
            });
          });
      });
    });
  });
}