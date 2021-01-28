module.exports = {
  'Checking quantity of books mentioned in filter' (browser) {
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
      .click('#filter-networkName')
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
      .click('#filter-networkName')
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
  },
  'Perform a search in networks filter, apply the filter and check those are not changed' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-networkName')
      .click('#filter-networkName')
      .getText('#filter-networkName > div.v-list-group__items > div:nth-child(4) > div.v-list-item__content', (networkText3) => {
        const secondText = networkText3.value.substr(0, 4);
        browser.getText('#filter-networkName > div.v-list-group__items > div:nth-child(3) > div.v-list-item__content', (networkText) => {
          if (networkText.value && networkText.value.length > 1 && networkText.value.search('No value / empty') < 0) {
            const searchText = networkText.value.substr(0, 2);
            let networksFiltered = [];
            browser
              .setValue('#search-filter-networkName', searchText)
              .pause(2000)
              .elements('css selector', '#filter-networkName > div.v-list-group__items', (networksElement) => {
                networksElement.value.forEach((v) => {
                  if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                  }
                  browser.elementIdText(v.ELEMENT, (networkElement) => {
                    networksFiltered.push(networkElement.value);
                  });
                });
              }).perform((done) => {
              // Filter any of the networks listed
                browser
                  .click('#filter-networkName > div.v-list-group__items > div:nth-child(3) > div.v-list-item__action > div > button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default.include')
                  .pause(3000)
                  .elements('css selector', '#filter-networkName > div.v-list-group__items', (netElements) => {
                    netElements.value.forEach((v) => {
                      if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                      }
                      browser.elementIdText(v.ELEMENT, (netEl) => {
                        browser.assert.ok(
                          networksFiltered.indexOf(netEl.value) >= 0,
                          'Network item is present in the list just like before apply the filter.'
                        );
                      });
                    });
                  }).perform((doneFirstCheck) => {
                    networksFiltered = [];
                    browser
                      .click('#clear-networkName')
                      .pause(2000)
                      .click('#filter-networkName')
                      .setValue('#search-filter-networkName', secondText)
                      .pause(2000)
                      .elements('css selector', '#filter-networkName > div.v-list-group__items', (networksElement) => {
                        networksElement.value.forEach((v) => {
                          if (!v.hasOwnProperty('ELEMENT')) {
                            v.ELEMENT = Object.values(v)[0];
                          }
                          browser.elementIdText(v.ELEMENT, (networkElement) => {
                            networksFiltered.push(networkElement.value);
                          });
                        });
                      }).perform((done2) => {
                        // Filter any of the networks listed
                        browser
                          .click('#filter-networkName > div.v-list-group__items > div:nth-child(3) > div.v-list-item__action > div > button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default.include')
                          .pause(3000)
                          .elements('css selector', '#filter-networkName > div.v-list-group__items', (netElements) => {
                            netElements.value.forEach((v) => {
                              if (!v.hasOwnProperty('ELEMENT')) {
                                v.ELEMENT = Object.values(v)[0];
                              }
                              browser.elementIdText(v.ELEMENT, (netEl) => {
                                browser.assert.ok(
                                  networksFiltered.indexOf(netEl.value) >= 0,
                                  'Network item is present in the list after apply the filter twice just like before apply the filter the first time.'
                                );
                              });
                            });
                          });
                        done2();
                      });
                    doneFirstCheck();
                  });
                done();
              });
            return true;
          }
        });
      });
  }
};