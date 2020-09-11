module.exports = {
  'Filter wordCount (between 1300 and 3100 words) from URL' (browser) {
    browser
      .url(process.env.HOST_TEST + '/?words=' + encodeURIComponent('>=1300&&<=3100'))
      .waitForElementVisible('body')
      .pause(2000)
      .waitForElementVisible('.network')
      .pause(3000)
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
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
              browser.assert.ok(parseInt(words.value) >= 1300, 'Book with ' + words.value + ' words. It is >= 1300');
              browser.assert.ok(parseInt(words.value) <= 3100, 'Book with ' + words.value + ' words. It is <= 3100');
            });
          });
        });
      }).end();
  },
  'Filtering by subject from an URL' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(2000)
      .waitForElementVisible('.network')
      .waitForElementVisible('#filter-about')
      .pause(2000)
      .element('css selector', '#filter-about', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (content) => {
          if (!content.value[1].hasOwnProperty('ELEMENT')) {
            content.value[1].ELEMENT = Object.values(content.value[1])[0];
          }
          browser.elementIdText(content.value[1].ELEMENT, (nn) => {
            if (nn.value.search('/ empty') < 0) {
              let aboutName = nn.value.split(' (')[0];
              browser
                .url(process.env.HOST_TEST + '/?subj=' + encodeURIComponent(aboutName))
                .waitForElementVisible('body')
                .pause(3000)
                .waitForElementVisible('.subjects')
                .elements('css selector', '.subjects', (bookElement) => {
                  bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                      v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdText(v.ELEMENT, (text) => {
                      let tx = text.value;
                      browser.assert.ok(
                        tx.toLowerCase().search(aboutName.toLowerCase()) >= 0,
                        'Book contains the subject: ' + aboutName
                      );
                    });
                  });
                });
            }
          });
        });
      }).end();
  },
  'Filtering by publisher from an URL' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(2000)
      .waitForElementVisible('.network')
      .waitForElementVisible('#filter-publisher_name')
      .pause(2000)
      .element('css selector', '#filter-publisher_name', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (content) => {
          if (!content.value[1].hasOwnProperty('ELEMENT')) {
            content.value[1].ELEMENT = Object.values(content.value[1])[0];
          }
          browser.elementIdText(content.value[1].ELEMENT, (nn) => {
            if (nn.value.search('/ empty') < 0) {
              let pubName = nn.value.split(' (')[0];
              browser
                .url(process.env.HOST_TEST + '/?pub=' + encodeURIComponent(pubName))
                .waitForElementVisible('body')
                .pause(3000)
                .waitForElementVisible('.publisher')
                .elements('css selector', '.publisher', (bookElement) => {
                  bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                      v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdText(v.ELEMENT, (text) => {
                      let tx = text.value;
                      browser.assert.ok(
                        tx.toLowerCase().search(pubName.toLowerCase()) >= 0,
                        'Book with publisher field: ' + pubName
                      );
                    });
                  });
                });
            }
          });
        });
      }).end();
  },
  'Filtering books by Last Updated field between 2020-08-01 and 2020-09-01 by URL' (browser) {
    browser
      .url(process.env.HOST_TEST + '?updated=>%3D1596240000%26%26<%3D1598918400')
      .waitForElementVisible('body')
      .pause(2000)
      .waitForElementVisible('#filter-lastUpdated')
      .waitForElementVisible('.network')
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
        let from = new Date(1596240000);
        let to = new Date(1598918400);
        bookElement.value.forEach((v) => {
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElement(v.ELEMENT, 'css selector', '.updated',  (elem) => {
            browser.assert.ok(elem.status !== '0', 'Book without lastUpdated field');
            if (!elem.value.hasOwnProperty('ELEMENT')) {
              elem.value.ELEMENT = Object.values(elem.value)[0];
            }
            browser.elementIdText(elem.value.ELEMENT, (updated) => {
              let u = new Date(updated.value);
              browser.assert.ok(
                u >= from,
                'Book with date: ' + u + '. It is <= ' + from
              ).assert.ok(
                u >= to,
                'Book with date: ' + u + '. It is >= ' + to
              );
            });
          });
        });
      }).end();
  }
};