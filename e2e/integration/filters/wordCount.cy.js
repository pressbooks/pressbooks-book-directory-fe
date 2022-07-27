import {clickAccordionHeader, fillNumericValue, getNumericInput, submitNumericFilter} from '../../support/common';
import Elements from '../../support/elements';

describe('Word Count Filters',() => {
  context('Desktop Resolution', () => {
    beforeEach(() => {
      clickAccordionHeader('wordCount');
    });

    it('Filter is applied & URL is updated by entering MIN value',()=>{

      fillNumericValue('wordCount','min',10000);

      submitNumericFilter('wordCount');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','words=%3E=1000');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 1,734');

    });


    it('Filter is applied & URL is updated by entering MAX value',()=>{

      fillNumericValue('wordCount','max',10000);

      submitNumericFilter('wordCount');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','words=%3E=0%26%26%3C=10000');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 595');

    });

    it('Filter is applied & URL is updated by entering MIN and MAX values',()=>{

      fillNumericValue('wordCount','min',10000);

      fillNumericValue('wordCount','max',20000);

      submitNumericFilter('wordCount');

      cy.algoliaQueryRequest();

      cy.url()
        .should('include','words=%3E=10000%26%26%3C=20000');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 322');

    });

    it('Filter chips is applied/removed when include/exclude filter is applied/removed',()=>{

      fillNumericValue('wordCount','min',10000);

      fillNumericValue('wordCount','max',20000);

      submitNumericFilter('wordCount');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 1);

      cy.get('[data-cy=chip-filter]:nth-of-type(1) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 0);

    });

    it('Clicking a filter chip removes value from filter input and updates the URL',()=>{

      fillNumericValue('wordCount','min',10000);

      fillNumericValue('wordCount','max',20000);

      submitNumericFilter('wordCount');

      cy.url()
        .should('include','words=%3E=10000%26%26%3C=20000');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 322');

      cy.get('[data-cy=chip-filter]').should('have.length', 2);

      cy.get('[data-cy=chip-filter]:nth-of-type(2) button').click();

      cy.algoliaQueryRequest('algoliaRequest');

      cy.get('[data-cy=chip-filter]').should('have.length', 1);

      cy.url()
        .should('not.include','20000');

      cy.get(Elements.numberOfBooks)
        .contains( 'Results: 1,734');

    });

    it('Make sure that min does not exceed max and max does not exceed min and no negative numbers are accepted',()=>{

      fillNumericValue('wordCount','min',-10);

      submitNumericFilter('wordCount');

      fillNumericValue('wordCount','max',-10);

      submitNumericFilter('wordCount');

      fillNumericValue('wordCount','min',100);
      fillNumericValue('wordCount','max',6);

      submitNumericFilter('wordCount');

      cy.algoliaQueryRequest('algoliaRequest');

      cy.url()
        .should('include','words=%3E=100');

      getNumericInput('wordCount','max').invoke('text').should('eq','');

    });

  });
});
