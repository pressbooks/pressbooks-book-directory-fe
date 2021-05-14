const Elements = {
  search: {
    input: '[data-cy=book-input-search]',
    button: '[data-cy=book-button-search]'
  },
  filterChips: '[data-cy=chip-filter]',
  books: {
    titles: '[data-cy=book-title]'
  },
  filterAccordion(facet) {
    return `[data-cy=filter-${facet}-header-button]`;
  },
  filterOptions(facet) {
    return `[data-cy=filter-${facet}-option]`;
  }
};


export default Elements;
