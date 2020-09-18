module.exports = {
  'Checking quantity of books mentioned in filter' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-about')
      .pause(2000)
      .element('css selector', '#filter-about', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (content) => {
          if (!content.value[0].hasOwnProperty('ELEMENT')) {
            content.value[0].ELEMENT = Object.values(content.value[0])[0];
          }
          browser.elementIdText(content.value[0].ELEMENT, (nn) => {
            if (nn.value.search('/ empty') < 0) {
              let aboutName = nn.value.split(' (')[0];
              let aboutID = aboutName.split(' ').join('-');
              browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', (button) => {
                if (!button.value[0].hasOwnProperty('ELEMENT')) {
                  button.value[0].ELEMENT = Object.values(button.value[0])[0];
                }
                browser.elementIdClick(button.value[0].ELEMENT, () => {
                  browser.getText('#filter-item-name-' + aboutID, (t) => {
                    let eq = t.value.split(' (');
                    let quantity = parseInt(eq[1].split(')')[0]);
                    browser.getText('css selector', '.container__results-hits', (d) => {
                      let text = d.value.split(' ');
                      let shown = parseInt(text[2]);
                      browser.assert.ok(
                        quantity === shown,
                        'Qty in filter: ' + quantity + '. Qty in shown: ' + shown
                      )
                        .assert.urlContains('?subj=' + encodeURIComponent(aboutName));
                    });
                  });
                });
              });
            }
          });
        });
      }).end();
  },
  'Applying empty filter and verifying that the applied filter group remains unchanged' (browser) {
    let filtersBefore = [];
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-networkName')
      .pause(2000)
      .element('css selector', '#filter-networkName', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (filterContents) => {
          if (!filterContents.value[0].hasOwnProperty('ELEMENT')) {
            filterContents.value[0].ELEMENT = Object.values(filterContents.value[0])[0];
          }
          filterContents.value.forEach((filterContent) => {
            if (!filterContent.hasOwnProperty('ELEMENT')) {
              filterContent.ELEMENT = Object.values(filterContent)[0];
            }
            browser.elementIdText(filterContent.ELEMENT,  (filterText) => {
              filtersBefore.push(filterText.value);
            });
          });
        }).perform((done) => {
          browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (filterContents) => {
            if (!filterContents.value[0].hasOwnProperty('ELEMENT')) {
              filterContents.value[0].ELEMENT = Object.values(filterContents.value[0])[0];
            }
            browser.elementIdText(filterContents.value[0].ELEMENT,  (filterText) => {
              if (filterText.value.search('No value / empty') >= 0) {
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
                  if (!button.value[0].hasOwnProperty('ELEMENT')) {
                    button.value[0].ELEMENT = Object.values(button.value[0])[0];
                  }
                  browser.elementIdClick(button.value[0].ELEMENT,  () => {
                    browser.waitForElementVisible('.v-chip--clickable')
                      .pause(3000)
                      .element('css selector', '#filter-networkName', (filterElement) => {
                        // Firefox - Safari exception
                        if (!filterElement.hasOwnProperty('ELEMENT')) {
                          filterElement.ELEMENT = Object.values(filterElement.value)[0];
                        }
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (filtersItem) => {
                          if (!filtersItem.value[0].hasOwnProperty('ELEMENT')) {
                            filtersItem.value[0].ELEMENT = Object.values(filtersItem.value[0])[0];
                          }
                          filtersItem.value.forEach((item) => {
                            if (!item.hasOwnProperty('ELEMENT')) {
                              item.ELEMENT = Object.values(item)[0];
                            }
                            browser.elementIdText(item.ELEMENT,  (fText) => {
                              browser.assert.ok(
                                filtersBefore.indexOf(fText.value) >= 0,
                                'Filter "' + fText.value + '" is in previous filter'
                              );
                            });
                          });
                        });
                      });
                  });
                });
              }
            });
          });
          done();
        });
      }).end();
  },
  'Verify selected class in exclude and include empty filter button' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-networkName')
      .pause(2000)
      .element('css selector', '#filter-networkName', (filterElement) => {
        // Firefox - Safari exception
        if (!filterElement.hasOwnProperty('ELEMENT')) {
          filterElement.ELEMENT = Object.values(filterElement.value)[0];
        }
        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (filterContents) => {
          if (!filterContents.value[0].hasOwnProperty('ELEMENT')) {
            filterContents.value[0].ELEMENT = Object.values(filterContents.value[0])[0];
          }
          browser.elementIdText(filterContents.value[0].ELEMENT, (filterText) => {
            if (filterText.value.search('No value / empty') >= 0) {
              browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', (button) => {
                if (!button.value[0].hasOwnProperty('ELEMENT')) {
                  button.value[0].ELEMENT = Object.values(button.value[0])[0];
                }
                browser.elementIdClick(button.value[0].ELEMENT, () => {
                  browser.waitForElementVisible('.v-chip--clickable')
                    .pause(3000)
                    .assert.cssClassPresent('#btn-include-empty-networkName', 'selected')
                    .assert.not.cssClassPresent('#btn-exclude-empty-networkName', 'selected');
                });
              });
            }
          });
        });
      }).end();
  }
};