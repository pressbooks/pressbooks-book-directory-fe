import Elements from '../../support/elements';
import {
  encodeFacetFilterForURL,
  clickAccordionHeader,
  clickAccordionClearFilter,
  clickFilter,
  searchFacet,
  removeChipFilter, sortBy
} from '../../support/common';


const facetFilters = require('../../fixtures/selectableFilters.json');

for (const facet in facetFilters) {
  let {field, urlAlias, includes, excludes, bookCards} = facetFilters[facet];
  describe(`Apply ${facet} filters`, () => {
    context('Desktop resolution', () => {
      for (const includeFacet of includes) {
        it(`Include ${facet} ${includeFacet} filter action. Check URL and chip. Remove filter by clicking twice and check URL.`, () => {
          clickAccordionHeader(field);
          clickFilter(field, includeFacet, true);
          sortBy('updated');
          cy.get(Elements.filterChips)
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(includeFacet).should('be.visible')
            .url()
            .should('include', urlAlias + '=' + encodeFacetFilterForURL(includeFacet));

          // Remove filter by clicking again in the button filter
          clickFilter(field, includeFacet, true);
          cy.url()
            .should('not.include', urlAlias + '=' + encodeFacetFilterForURL(includeFacet));
        });
        it(`Include ${facet} ${includeFacet} filter action and remove it by clicking in the chip`, () => {
          clickAccordionHeader(field);
          clickFilter(field, includeFacet, true);

          // Remove filter by clicking in the active filter chip
          removeChipFilter(field, includeFacet);
          cy.url()
            .should('not.include', urlAlias + '=' + encodeFacetFilterForURL(includeFacet));

          // check the accordion was closed
          cy.get(Elements.filterAccordion(field))
            .not('.border-b');
        });
      }

      for (const excludeFacet of excludes) {
        it(`Exclude ${facet} ${excludeFacet} filter action. Check URL and chip.  Remove filter by clicking twice and check URL.`, () => {
          clickAccordionHeader(field);
          clickFilter(field, excludeFacet, false);
          sortBy('updated');

          cy.get(Elements.filterChips)
            .should(($filtersApplied) => {
              expect($filtersApplied).to.have.length(1);
            })
            .find('.text-sm')
            .contains(excludeFacet).should('be.visible')
            .url()
            .should('include', urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));

          // Remove filter by clicking again in the button filter
          clickFilter(field, excludeFacet, false);
          cy.url()
            .should('not.include', urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));
        });
        it(`Exclude ${excludeFacet} filter action and remove it by clicking in the chip`, () => {
          clickAccordionHeader(field);
          clickFilter(field, excludeFacet, false);
          sortBy('updated');

          // Remove filter by clicking in the active filter chip
          removeChipFilter(field, excludeFacet);
          cy.url()
            .should('not.include', urlAlias + '=-' + encodeFacetFilterForURL(excludeFacet));

          // check the accordion was closed
          cy.get(Elements.filterAccordion(field))
            .not('.border-b');
        });
      }

      if ('search' in facetFilters[facet]) {
        it(`Search in ${facet} facet and check it keeps after apply filter`, () => {
          clickAccordionHeader(field);
          searchFacet(field, facetFilters[facet].search.searchTerm);

          let facetsListBefore = [], facetsListAfter = [];
          cy.get(Elements.filterOptions(field))
            .each(($filterOptions) => {
              facetsListBefore.push($filterOptions.innerText);
            });
          clickFilter(field, facetFilters[facet].search.filter, true);
          sortBy('updated');

          // Check the facet list after filter was applied
          cy.get(Elements.filterOptions(field))
            .each(($filterOptions) => {
              facetsListAfter.push($filterOptions.innerText);
            }).should(() => {
              expect(facetsListAfter).to.deep.equal(facetsListBefore);
            });
        });
      }

      it(`Clear applied ${facet} when clicking 'clear filter' button`, () => {
        clickAccordionHeader(field);

        let expectedParams = null;

        includes.forEach(filter => {
          clickFilter(field, filter, true);
          sortBy('updated');
          cy.log(filter);

          expectedParams = expectedParams
            ? `${expectedParams}%26%26${encodeFacetFilterForURL(filter)}`
            : encodeFacetFilterForURL(filter);
        });

        cy.get(Elements.filterChips)
          .should(($filtersApplied) => expect($filtersApplied).to.have.length(2))
          .url()
          .should('include', `${urlAlias}=${expectedParams}`);

        clickAccordionClearFilter(field);

        cy.get(Elements.filterChips)
          .should('not.exist')
          .url()
          .should('not.include', `${urlAlias}=${expectedParams}`);
      });

      it(`Apply include/exclude ${facet} filters and review the book cards`, () => {
        clickAccordionHeader(field);
        const isInclude = !!bookCards.include;
        for (const filter of bookCards.filters) {
          clickFilter(field, filter, isInclude);
        }
        sortBy('updated');
        cy.wait(1500);
        cy.get(Elements.bookCards.title)
          .each(($title) => {
            cy.get(Elements.bookCards.title).should(() => {
              expect($title.text().replace(/(\r\n|\n|\r)/gm, '').trim())
                .to.contain.oneOf(bookCards.titles);
            });
          });
        cy.get(Elements.numberOfBooks)
          .contains( `${bookCards.count} results`);
      });
    });
  });
}
