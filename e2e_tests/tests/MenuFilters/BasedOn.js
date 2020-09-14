module.exports = {
  'Filter by books based on another books and check image in book card' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-basedOn')
      .click('#btn-include-based-another')
      .pause(4000)
      .waitForElementVisible('.ais-Hits__books-book')
      .elements('css selector', '.isBasedOn', (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(bg.search('is-child.png') >=0, 'Book contains \'child\' image: ' + bg);
                }
              });
            });
          });
        });
      }).end();
  },
  'Excluding books based on another books and check image in book card' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-basedOn')
      .click('#btn-exclude-based-another')
      .pause(4000)
      .elements('css selector', '.isBasedOn', (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(bg.search('is-base.png') >=0, 'Book contains \'is-base\' image');
                }
              });
            });
          });
        });
      }).end();
  }
};