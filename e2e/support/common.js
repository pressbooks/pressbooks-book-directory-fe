import helpers from '../../src/store/helpers';

function search(term) {
  cy.algoliaQueryRequest('searchResults');
  cy.get('@inputSearch').type(term);
  cy.get('@buttonSearch').click();
  return cy.wait(['@searchResults']);
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
  return cy.get(`[data-cy=filter-${facet}-header-button]`)
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
  removeChipFilter
};

