module.exports = {
  'Sorting by Word Count (desc.)' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('.ais-SortBy--input')
      .click('.ais-SortBy--input')
      .waitForElementVisible('.v-select-list')
      .click('*[data-test-sort-item="wordCount"]')
      .pause(3000)
      .waitForElementVisible('.ais-Hits__books-book-wordcount')
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        let previousWC = 0, elementId;
        bookElement.value.forEach((v) => {
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', (elem) => {
            if (!elem.value.hasOwnProperty('ELEMENT')) {
              elem.value.ELEMENT = Object.values(elem.value)[0];
            }
            elementId = elem.value.ELEMENT;
          }).perform((done) => {
            browser.elementIdText(elementId, (words) => {
              if (previousWC === 0) {
                previousWC = parseInt(words.value);
              } else {
                browser.assert.ok(
                  previousWC >= parseInt(words.value),
                  'Word Count: ' + parseInt(words.value) + ' words. Correct Word Count order for this card.'
                );
                previousWC = parseInt(words.value);
              }
            });
            done();
          });
        });
      }).end();
  },
  'Sorting by name (asc.)' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('.ais-SortBy--input')
      .click('.ais-SortBy--input')
      .waitForElementVisible('.v-select-list')
      .click('*[data-test-sort-item="name"]')
      .pause(3000)
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        let previousName = '', elementId;
        if(bookElement.value.length > 0) {
          bookElement.value.forEach((v) => {
            if (!v.hasOwnProperty('ELEMENT')) {
              v.ELEMENT = Object.values(v)[0];
            }
            browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books .v-card__title', (elem) => {
              if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
              }
              elementId = elem.value.ELEMENT;
            }).perform((done) => {
              browser.elementIdText(elementId, (words) => {
                words.value = words.value.toLowerCase();
                if (words.value[0].match(/[a-z]/i) !== null) {
                  if (previousName === '') {
                    previousName = words.value;
                  } else {
                    let lexOrder = previousName.localeCompare(words.value) < 0 ? true : previousName <= words.value;
                    browser.assert.ok(
                      lexOrder,
                      'Book name: ' + words.value + '. Previous book name: ' + previousName + '. Correct name order for this card.'
                    );
                    previousName = words.value;
                  }
                }
              });
              done();
            });
          });
        }
      }).end();
  },
  'Sorting by last updated (desc.)' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('.ais-SortBy--input')
      .click('.ais-SortBy--input')
      .waitForElementVisible('.v-select-list')
      .click('*[data-test-sort-item="updated"]')
      .pause(3000)
      .waitForElementVisible('.updated')
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        let previousDate = 0, elementId;
        bookElement.value.forEach((v) => {
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElement(v.ELEMENT, 'css selector', '.updated', (elem) => {
            if (!elem.value.hasOwnProperty('ELEMENT')) {
              elem.value.ELEMENT = Object.values(elem.value)[0];
            }
            elementId = elem.value.ELEMENT;
          }).perform((done) => {
            browser.elementIdText(elementId, (date) => {
              if (previousDate === 0) {
                previousDate = new Date(date.value);
              } else {
                date.value = new Date(date.value);
                browser.assert.ok(
                  previousDate >= date.value,
                  'Date: ' + date.value + '. Correct last updated order for this card.'
                );
                previousDate = date.value;
              }
            });
            done();
          });
        });
      }).end();
  }
};