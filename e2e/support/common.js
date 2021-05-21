import helpers from '../../src/store/helpers';
import Elements from './elements';

/**
 * Type a term in the search box and perform the search.
 *
 * @param term - string. Any search term.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function search(term) {
  cy.get(Elements.search.input).type(term);
  cy.get(Elements.search.button).click();
  return cy.algoliaQueryRequest('searchRequest');
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
 * Click submit button for Numeric Filters.
 *
 * @param facet - string. Algolia's facet, examples: licenseCode, publisherName.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function submitNumericFilter(facet) {
  return cy.get(Elements.numericOption(facet))
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
  cy.get(`[data-cy=filter-${facet}-${facetItemButton}-${includeExclude}-button]`)
    .click().algoliaQueryRequest('filterRequest');
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
 *
 * @param facet - string. Algolia's facet, examples: wordCount, storage.
 * @param type - string. Type could be min or max.
 * @param term - string. Term to search.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function fillNumericValue(facet, type, term) {
  return cy.get(Elements.numericOption(facet,type))
    .clear().type(term);
}


/**
 *
 * @param facet - string. Algolia's facet, examples: wordCount, storage.
 * @param type - string. Type could be min or max.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 */
function getNumericInput(facet, type) {
  return cy.get(Elements.numericOption(facet,type));
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
    .algoliaQueryRequest('removeFilter');
}

export {
  search,
  encodeFacetFilterForURL,
  clickAccordionHeader,
  clickFilter,
  searchFacet,
  removeChipFilter,
  fillNumericValue,
  getNumericInput,
  submitNumericFilter
};

