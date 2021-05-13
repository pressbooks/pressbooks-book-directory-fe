## Best practices e2e testing

We are using Cypress as our e2e testing framework, you'll find the following directory structure.


```
├── e2e
│   ├── fixtures
│   │   └── example.json
│   ├── integration
│   │   ├── *.spec.js
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   │   └── clearFilters.spec.js
│   ├── support
│   │   ├── commands.js
│   │   └── index.js
│   └── videos

```

### The integrations directory

You have to create a spec file inside the `integrations` directory:

**Example**

> myFeatureToTest.spec.js

### Reusing Behavior across tests

For instance, we want to set a specific resolution for the test suite (Desktop)

You can write code that should be used in all the test suite in the following file:

> e2e/support/index.js

**Example**

```javascript
//e2e/support/index.js

beforeEach(() => {
  cy.viewport(1280, 720);
  cy.visit('/');
});
```

It's possible to bind all the required alias on the support file but I think it could be non performant, that's why could bind required aliases on the `spec` beforeEach method.

**Example**

```javascript
//e2e/support/index.js
beforeEach(() => {
  cy.viewport(1280, 720);
  cy.visit('/');
  cy.get(Elements.search.input).as('inputSearch').clear();
  cy.get(Elements.search.button).as('buttonSearch');
});
```

The code above will always run in every test, and it will precede the spec file `beforeEach()` hook.

If you want to learn more about the support file capabilities click [here](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file).



### DRY element selectors

Now we have a `support/elements.js` that contains an object with the following structure.

```javascript
const Elements = {
  search: {
    input: '[data-cy=book-input-search]',
    button: '[data-cy=book-button-search]'
  }
};
```

This way you can reuse those selectors in your spec files, like this:

```javascript
import Elements from '../support/elements';

cy.get(Elements.search.input).as('inputSearch').clear();
cy.get(Elements.search.button).as('buttonSearch');
```

### Create custom commands or js vanilla functions to reuse specs that could be used in other tests.

* https://docs.cypress.io/api/cypress-api/custom-commands#Best-Practices

**Example custom command**

```javascript
//support/commands.js
Cypress.Commands.add('algoliaQueryRequest', (alias='algoliaQuery', waitMs = 700) => {
  cy.intercept('**/indexes/*/queries?*')
    .as(alias)
    .wait(waitMs) // wait the store and algolia's widgets processing time
    .get('div[data-cy=facet-filters] article').should('have.length.above', 1); // Make sure the accordion filters is present
});
```

**Example custom reusable code**

```javascript
//support/common.js
export const search = (term) => {

  cy.algoliaQueryRequest('searchResults');

  cy.get('@inputSearch').type(term);
  cy.get('@buttonSearch').click();

  return cy.wait(['@searchResults']);
};

```

With custom functions you can wrap common actions that can be chained, for example:

```javascript
import {search} from '../support/common';

it('Search for specific book', () => {

      search('math science');

      cy.get('[data-cy=book-card]').should('have.length', 2);
      cy.url()
        .should('include','?q=math%20science');

    });
```

Or do something like this:

```javascript
import {search, applyFilter} from '../support/common';

it('Search for specific book and click ', () => {

    search('math science');

    cy.get('[data-cy=book-card]').should('have.length', 2);
    cy.url()
        .should('include','?q=math%20science');
    
    applyFilter('license', 2);

    cy.url()
        .should('include','?q=math%20science&filter=2');

});
```



### Suggested readings

* https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Elements
* https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Subject-Management
