module.exports = {
  'Filtering by CC BY and CC0 and word count between 1000 and 1100' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .waitForElementVisible('#filter-wordCount')
      .click('#btn-include-license_code-CC-BY')
      .click('#btn-include-license_code-CC0')
      .setValue('#min-wordCount', '1000')
      .setValue('#max-wordCount', '1100')
      .click('#btn-wordCount')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .elements('css selector', '.copyright', (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain',  (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(
                    (bg.search('0.png') >=0 || bg.search('by.png') >=0),
                    'Book card contains \'CCO\' or \'BY\' license image'
                  );
                }
              });
            });
          });
        });
      })
      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
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
              browser.assert.ok(parseInt(words.value) >= 1000, 'Book with ' + words.value + ' words. It is >= 1000')
                .assert.ok(parseInt(words.value) <= 2000, 'Book with ' + words.value + ' words. It is <= 2000');
            });
          });
        });
        browser.elements('css selector', '.ais-Hits__books-book', (bookElement) => {
          browser.waitForElementVisible('.v-chip--clickable');
          bookElement.value.forEach((v) => {
            if (!v.hasOwnProperty('ELEMENT')) {
              v.ELEMENT = Object.values(v)[0];
            }
            browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount',  (elem) => {
              if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
              }
              browser.elementIdText(elem.value.ELEMENT, (words) => {
                words.value = parseInt(words.value);
                browser.assert.ok(
                  (words.value >= 1000 || words.value <= 1100),
                  'Book with ' + words.value + ' words. It is between 1000 and 1100'
                );
              });
            });
          });
        });
      }).end();
  },
  'Filtering by German Language and excluding CC BY SA License' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .waitForElementVisible('#filter-languageName')
      .click('#btn-include-languageName-German')
      .waitForElementVisible('#btn-exclude-license_code-CC-BY-SA')
      .pause(1500)
      .click('#btn-exclude-license_code-CC-BY-SA')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .elements('css selector', '.copyright',  (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain',  (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style',  (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(
                    (bg.search('by-sa.png') === -1),
                    'Book card without \'BY SA\' license image'
                  );
                }
              });
            });
          });
        });
      })
      .elements('css selector', '.language', (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdText(v.ELEMENT, (l) => {
            let language = l.value;
            browser.assert.ok(language === 'DE', 'Book in with language legend ' + language);
          });
        });
      }).end();
  },
  'Filtering by CC BY and Public Domain licenses and Based On another book and excluding English Language' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .waitForElementVisible('#filter-languageName')
      .waitForElementVisible('#filter-about')
      .click('#btn-exclude-languageName-English')
      .waitForElementVisible('#btn-include-license_code-CC-BY')
      .click('#btn-include-license_code-CC-BY')
      .waitForElementVisible('#btn-include-license_code-Public-Domain')
      .click('#btn-include-license_code-Public-Domain')
      .click('#btn-include-based-another')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .elements('css selector', '.copyright',  (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain',  (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style',  (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(
                    (bg.search('by.png') >=0 || bg.search('public-domain.png') >=0),
                    'Book card with \'BY\' or \'Public Domain\' license image'
                  );
                }
              });
            });
          });
        });
      })
      .elements('css selector', '.language', (bookElement) => {
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdText(v.ELEMENT, (l) => {
            let language = l.value;
            browser.assert.ok(language !== 'EN', 'Book in with language legend ' + language + ' (Not in Eglish)');
          });
        });
      })
      .elements('css selector', '.isBasedOn', (bookElement) => {
        browser.waitForElementVisible('.v-chip--clickable');
        bookElement.value.forEach((v) => {
          // Firefox - Safari exception
          if (!v.hasOwnProperty('ELEMENT')) {
            v.ELEMENT = Object.values(v)[0];
          }
          browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain',  (elem) => {
            elem.value.forEach((e) => {
              if (!e.hasOwnProperty('ELEMENT')) {
                e.ELEMENT = Object.values(e)[0];
              }
              browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                let bg = style.value;
                if (bg.search('background-image') >= 0) {
                  browser.assert.ok(bg.search('is-child.png') >=0, 'Book contains \'child\' image');
                }
              });
            });
          });
        });
      }).end();
  },
  'Apply include language filter and check results / quantities' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(3000)
      .getText('css selector', '.container__results-hits',  (d) => {
        let text = d.value.split(' ');
        let shown = parseInt(text[2]);
        browser.element('css selector', '#filter-languageName', (filterElement) => {
          // Firefox - Safari exception
          if (!filterElement.hasOwnProperty('ELEMENT')) {
            filterElement.ELEMENT = Object.values(filterElement.value)[0];
          }
          browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
            if (!content.value[0].hasOwnProperty('ELEMENT')) {
              content.value[0].ELEMENT = Object.values(content.value[0])[0];
            }
            browser.elementIdText(content.value[0].ELEMENT,  (nn) => {
              let langName = nn.value.split(' (')[0];
              browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
                if (!button.value[0].hasOwnProperty('ELEMENT')) {
                  button.value[0].ELEMENT = Object.values(button.value[0])[0];
                }
                browser.elementIdClick(button.value[0].ELEMENT,  () => {
                  browser.pause(3000)
                    .click('.ais-ClearRefinements-button')
                    .pause(2000)
                    .getText('css selector', '.container__results-hits',  (d) => {
                      let text2 = d.value.split(' ');
                      let shown2 = parseInt(text2[2]);
                      browser.assert.ok(
                        shown === shown2,
                        'Book qty. keeps after filter by ' + langName + ' language: ' + shown
                      );
                    });
                });
              });
            });
          });
        });
      }).end();
  }
};