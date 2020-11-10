module.exports = {
  'Searching a subject by \'gui\' string' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-about')
      .click('#filter-about')
      .waitForElementVisible('#search-filter-about')
      .pause(2000)
      .setValue('#search-filter-about', 'gui')
      .pause(1000);
    browser.elements('css selector', '#filter-about', (filterElement) => {
      filterElement.value.forEach((v) => {
        // Firefox - Safari exception
        if (!v.hasOwnProperty('ELEMENT')) {
          v.ELEMENT = Object.values(v)[0];
        }
        browser.elementIdElements(v.ELEMENT, 'css selector', '.v-list-item__content',  (elem) => {
          elem.value.forEach((e) => {
            if (!e.hasOwnProperty('ELEMENT')) {
              e.ELEMENT = Object.values(e)[0];
            }
            browser.elementIdText(e.ELEMENT, (s) => {
              let subject = s.value.toLowerCase();
              if (subject.length > 0) {
                browser.assert.ok(subject.search('gui') >= 0, 'Subject \'' + subject + '\' contains \'gui\' string');
              }
            });
          });
        });
      });
    });
  },
  'Filtering by subject' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-about')
      .pause(2000)
      .click('#filter-about')
      .element('css selector', '#filter-about', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
          if (!content.value[0].hasOwnProperty('ELEMENT')) {
            content.value[0].ELEMENT = Object.values(content.value[0])[0];
          }
          browser.elementIdText(content.value[0].ELEMENT,  (nn) => {
            if (nn.value.search('/ empty') < 0) {
              let subjectName = nn.value.split(' (')[0];
              browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', (button) => {
                if (!button.value[0].hasOwnProperty('ELEMENT')) {
                  button.value[0].ELEMENT = Object.values(button.value[0])[0];
                }
                browser.elementIdClick(button.value[0].ELEMENT, () => {
                  browser.waitForElementVisible('.v-chip--clickable')
                    .pause(2000)
                    .elements('css selector', '.subjects', (bookElement) => {
                      bookElement.value.forEach((v) => {
                        if (!v.hasOwnProperty('ELEMENT')) {
                          v.ELEMENT = Object.values(v)[0];
                        }
                        browser.elementIdText(v.ELEMENT, (text) => {
                          let tx = text.value;
                          browser.assert.ok(
                            tx.toLowerCase().search(subjectName.toLowerCase()) >= 0,
                            'Book contains the subject: ' + subjectName
                          );
                        });
                      });
                    });
                });
              });
            }
          });
        });
      });
  },
  'Filter by empty subjects' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .click('#filter-about')
      .waitForElementVisible('#btn-include-empty-about')
      .pause(2000)
      .click('#btn-include-empty-about')
      .pause(3000)
      .waitForElementVisible('.ais-Hits__books-book')
      .assert.not.containsText('.ais-Hits__books-book', 'Subjects: ');
  }
};