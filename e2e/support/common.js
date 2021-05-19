import helpers from '../../src/store/helpers';
import Elements from './elements';
import {EventBus} from '../../src/utils/helpers';

function waitToMount(event) {
  return cy.wrap(new Promise((resolve)=>{
    EventBus.$on(event,()=>{
      resolve(true);
    });
  }));
}

function search(term) {
  cy.algoliaQueryRequest('searchResults');
  return waitToMount('pbfilters')
    .then(()=>{
      cy.log('RESOLVED');
      cy.get(Elements.search.input).type(term);
      cy.get(Elements.search.button).click();
      return cy.wait(['@searchResults']);
    });
}

function encodeFacetFilterForURL(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  }).replace('%2C', ',');
}

/**
 * Click in a accordion header to open it.
 *
 * @param facet - string. Algolia's facet, examples: licenseCode, publisherName.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function clickAccordionHeader(facet) {
  return cy.get(Elements.filterAccordion(facet))
    .click();
}

/**
 * Click in a facet filter (include or exclude button). It could apply or remove a filter,
 * depending on if it was clicked once or twice.
 *
 * @param facet - string. Algolia's facet, examples: licenseCode, publisherName.
 * @param facetItem - string. Facet item, examples: CC BY, Open SUNY Textbooks
 * @param include - bool. True to click on include action, false for exclude action.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function clickFilter(facet, facetItem, include) {
  const includeExclude = include ? 'include' : 'exclude';
  const facetItemButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(facetItem);
  return cy.get(`[data-cy=filter-${facet}-${facetItemButton}-${includeExclude}-button]`)
    .click()
    .algoliaQueryRequest();
}

/**
 *
 * @param facet - string. Algolia's facet, examples: licenseCode, publisherName.
 * @param term - string. Term to search.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function searchFacet(facet, term) {
  return cy.get(`[data-cy=search-filter-${facet}]`)
    .type(term);
}

/**
 * Click in a chip filter to remove the filter applied.
 *
 * @param facet - string. Algolia's facet, examples: licenseCode, publisherName.
 * @param facetItem - string. Facet item, examples: CC BY, Open SUNY Textbooks
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function removeChipFilter(facet, facetItem) {
  const facetItemButton = helpers.functions.getLowerCaseAlphanumericAndHyphen(facetItem);
  return cy.get(`[data-cy=chip-filter-${facet}-${facetItemButton}-button]`)
    .click()
    .algoliaQueryRequest();
}

export {
  search,
  encodeFacetFilterForURL,
  clickAccordionHeader,
  clickFilter,
  searchFacet,
  removeChipFilter,
};

