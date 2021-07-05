const Elements = {
  search: {
    input: '[data-cy=book-input-search]',
    button: '[data-cy=book-button-search]'
  },
  filterChips: '[data-cy=chip-filter]',
  booksCards: {
    main: '[data-cy=book-card]',
    title: '[data-cy=book-title]',
    network: '[data-cy=book-network]',
    cover: '[data-cy=book-cover]',
    h5p: '[data-cy=book-h5p]',
    h5pActivities: '[data-cy=h5p-count]',
    wordCount: '[data-cy=book-word-count]',
    size: '[data-cy=book-size]',
    authors: '[data-cy=book-authors]',
    editors: '[data-cy=book-editors]',
    lastUpdated: '[data-cy=book-last-updated]',
    language: '[data-cy=book-language]',
    license: '[data-cy=book-license]',
    subjects: '[data-cy=book-subjects]',
    description: '[data-cy=book-description]',
    publisher: '[data-cy=book-publisher]',
    original: '[data-cy=book-original]',
    notOriginal: '[data-cy=book-not-original]',
    bookTags: '[data-cy=book-tags]',
  },
  paginator: '[data-cy=paginator-top]',
  paginatorLink(page) {
    return `[data-cy=paginator-link-${page}-top]`;
  },
  filterAccordion(facet) {
    return `[data-cy=filter-${facet}-header-button]`;
  },
  clearFilter(facet) {
    return `[data-cy=clear-filter-${facet}]`;
  },
  filterOptions(facet) {
    return `[data-cy=filter-${facet}-option]`;
  },
  numericOption(facet,type='') {
    if(['min','max'].includes(type)) {
      return `[data-cy-input=${facet}-${type}]`;
    }
    return `[data-cy-button=${facet}]`;
  },
  numberOfBooks: '[data-cy=number-of-books]'
};


export default Elements;
