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
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
      .click('#btn-wordCount')
      .pause(3000)
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
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
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
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
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
      .click('#btn-wordCount')
      .pause(3000)
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
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
  'Filtering between 100 and 500 words and validating filters quantity change in license code filter' (browser){
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-wordCount')
      .click('#filter-license_code')
      .pause(1000)
      .element(
        'css selector',
        '#filter-license_code > div.v-list-group__items > div:nth-child(2) > div.v-list-item__content',
        (filterText) => {
          if (!filterText.hasOwnProperty('ELEMENT')) {
            filterText.ELEMENT = Object.values(filterText.value)[0];
          }
          let licenseQty;
          browser.elementIdText(filterText.ELEMENT, (text) => {
            licenseQty = text.value;
            browser
              .click('#filter-wordCount')
              .waitForElementVisible('#max-wordCount')
              .setValue('#min-wordCount', '100')
              .setValue('#max-wordCount', '500')
              .waitForElementVisible('.ais-Hits__books-book-wordcount')
              .click('#btn-wordCount')
              .pause(3000)
              .waitForElementVisible('.ais-Hits__books-book-wordcount')
              .element(
                'css selector',
                '#filter-license_code > div.v-list-group__items > div:nth-child(2) > div.v-list-item__content',
                (filterText2) => {
                  if (!filterText2.hasOwnProperty('ELEMENT')) {
                    filterText2.ELEMENT = Object.values(filterText2.value)[0];
                  }
                  browser.elementIdText(filterText2.ELEMENT, (text2) => {
                    browser.assert.ok(
                      text2.value !== licenseQty,
                      'Qty. before word count filter: ' + licenseQty + '. Qty. after word count filter: ' + text2.value
                    );
                  });
                });
          });
        }
      ).end();
  }
};