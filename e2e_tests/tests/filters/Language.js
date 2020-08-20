module.exports = {
  'Filtering books by "French" language and checking code in Book Card' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-languageName')
      .click('#btn-include-languageName-French')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000);
    browser.elements('css selector', '.language', (bookElement) => {
      bookElement.value.forEach((v) => {
        // Firefox - Safari exception
        if (!v.hasOwnProperty('ELEMENT')) {
          v.ELEMENT = Object.values(v)[0];
        }
        browser.elementIdText(v.ELEMENT, (l) => {
          let language = l.value;
          browser.assert.ok(language === 'FR', 'Book in French language');
        });
      });
    }).end();
  },
  'Excluding books by "French" language and checking code in Book Card' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-languageName')
      .click('#btn-exclude-languageName-French')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000);
    browser.elements('css selector', '.language', (bookElement) => {
      bookElement.value.forEach((v) => {
        // Firefox - Safari exception
        if (!v.hasOwnProperty('ELEMENT')) {
          v.ELEMENT = Object.values(v)[0];
        }
        browser.elementIdText(v.ELEMENT, (l) => {
          let language = l.value;
          browser.assert.ok(language !== 'FR', 'Book in French language');
        });
      });
    }).end();
  },
};