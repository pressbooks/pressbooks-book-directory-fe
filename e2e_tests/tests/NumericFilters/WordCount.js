module.exports = {
  'Filtering books by Word Count between 1000 and 2000 words' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-wordCount')
      .click('#filter-wordCount')
      .waitForElementVisible('#max-wordCount')
      .setValue('#min-wordCount', '1000')
      .setValue('#max-wordCount', '2000')
      .click('#btn-wordCount')
      .pause(3000)
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        if(bookElement.value.length > 0) {
          bookElement.value.forEach((v) => {
            if (!v.hasOwnProperty('ELEMENT')) {
              v.ELEMENT = Object.values(v)[0];
            }
            browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount',  (elem) => {
              browser.assert.ok(elem.status !== '0', 'Book without wordCount field');
              if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
              }
              browser.elementIdText(elem.value.ELEMENT, (words) => {
                browser.assert.ok(parseInt(words.value) >= 1000, 'Book with ' + words.value + ' words. It is >= 1000');
                browser.assert.ok(parseInt(words.value) <= 2000, 'Book with ' + words.value + ' words. It is <= 2000');
              });
            });
          });
        }
      }).end();
  },
  'Filtering books by Word Count between 0 and 2 words' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-wordCount')
      .click('#filter-wordCount')
      .waitForElementVisible('#max-wordCount')
      .setValue('#max-wordCount', '2')
      .click('#btn-wordCount')
      .pause(3000)
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        if(bookElement.value.length > 0) {
          bookElement.value.forEach((v) => {
            if (!v.hasOwnProperty('ELEMENT')) {
              v.ELEMENT = Object.values(v)[0];
            }
            browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', (elem) => {
              if (elem.status !== '0') {
                browser.assert.ok(elem.status !== '0', 'Book without wordCount field');
              } else {
                if (!elem.value.hasOwnProperty('ELEMENT')) {
                  elem.value.ELEMENT = Object.values(elem.value)[0];
                }
                browser.elementIdText(elem.value.ELEMENT, (words) => {
                  browser.assert.ok(parseInt(words.value) >= 2, 'Book with ' + words.value + ' words. It is >= 2');
                });
              }
            });
          });
        }
      }).end();
  },
  'Filtering books by Word Count between 3000 and 200 words, expect >= 3000 and ignore 200' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-wordCount')
      .click('#filter-wordCount')
      .waitForElementVisible('#max-wordCount')
      .setValue('#min-wordCount', '3000')
      .setValue('#max-wordCount', '200')
      .click('#btn-wordCount')
      .pause(3000)
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        if(bookElement.value.length > 0) {
          bookElement.value.forEach((v) => {
            if (!v.hasOwnProperty('ELEMENT')) {
              v.ELEMENT = Object.values(v)[0];
            }
            browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', (elem) => {
              browser.assert.ok(elem.status !== '0', 'Book without wordCount field');
              if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
              }
              browser.elementIdText(elem.value.ELEMENT, (words) => {
                browser.assert.ok(parseInt(words.value) >= 3000, 'Book with ' + words.value + ' words. It is >= 3000');
              });
            });
          });
        }
      }).end();
  },
  'Filtering between 1000 and 7000 words and validating filters quantity change in license code filter' (browser){
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-wordCount')
      .click('#filter-license_code')
      .pause(1000)
      .getText(
        '#filter-license_code > div.v-list-group__items > div:nth-child(2) > div.v-list-item__content',
        (filterText) => {
          browser
            .click('#filter-wordCount')
            .waitForElementVisible('#max-wordCount')
            .setValue('#min-wordCount', '1000')
            .setValue('#max-wordCount', '7000')
            .click('#btn-wordCount')
            .pause(3000)
            .getText(
              '#filter-license_code > div.v-list-group__items > div:nth-child(2) > div.v-list-item__content',
              (filterText2) => {
                browser.assert.ok(
                  filterText2.value !== filterText.value,
                  'Qty. before word count filter: ' + filterText.value + '. Qty. after word count filter: ' + filterText2.value
                );
              });
        }
      ).end();
  }
};