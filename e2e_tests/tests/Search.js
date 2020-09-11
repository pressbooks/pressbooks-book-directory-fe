module.exports = {
  'Searching by network URL' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.visible('#search-book')
      .pause(3000);
    browser.element('css selector', '.network',  (elem) => {
      if (!elem.value.hasOwnProperty('ELEMENT')) {
        elem.value.ELEMENT = Object.values(elem.value)[0];
      }
      browser.elementIdText(elem.value.ELEMENT, (network) => {
        let networkName = network.value;
        browser.setValue('#search-book', networkName)
          .click('button[id=search-button]')
          .waitForElementVisible('.ais-Hits__books')
          .pause(2000)
          .assert.containsText('.network', networkName)
          .end();
      });
    });
  },
  'Searching by publisher (partial string) and literal string from random description' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.visible('#search-book')
      .pause(3000)
      .element('css selector', '.v-card--item.description',  (elem) => {
        if (!elem.value.hasOwnProperty('ELEMENT')) {
          elem.value.ELEMENT = Object.values(elem.value)[0];
        }
        browser.elementIdText(elem.value.ELEMENT, (description) => {
          let searchDescription = description.value.split(' ').slice(0, 2).join(' ');
          let stringToSearch = '"' + searchDescription + '"';
          browser
            .element('css selector', '.v-card--item.publisher',  (elem) => {
              if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
              }
              browser.elementIdText(elem.value.ELEMENT, (publisher) => {
                stringToSearch += ' pub:"' + publisher.value.substring(0, 3) + '"';
                browser.setValue('#search-book', stringToSearch)
                  .click('button[id=search-button]')
                  .pause(2000)
                  .waitForElementVisible('.ais-Hits__books')
                  .elements('css selector', '.v-card--item.publisher', (elems) => {
                    elems.value.forEach((elem) => {
                      if (!elem.hasOwnProperty('ELEMENT')) {
                        elem.ELEMENT = Object.values(elem)[0];
                      }
                      browser.elementIdText(elem.ELEMENT, (publisherCard) => {
                        browser
                          .assert.ok(
                            publisherCard.value.search(publisher.value.substring(0, 3)) >= 0,
                            'Book with publisher ' + publisherCard.value + '. It contains publisher string ' + publisher.value.substring(0, 3)
                          );
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
                browser.elementIdText(v.ELEMENT, (textBookCard) => {
                  browser
                    .assert.ok(
                      textBookCard.value.search(searchDescription) >= 0,
                      'Book with text' + textBookCard.value + '. It contains string ' + searchDescription
                    );
                });
              });
            });
        });
      }).end();
  },
  'Search filtering by 2 facets and excluding term' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.visible('#search-book')
      .pause(3000)
      .element('css selector', '.v-card__title',  (elem) => {
        if (!elem.value.hasOwnProperty('ELEMENT')) {
          elem.value.ELEMENT = Object.values(elem.value)[0];
        }
        browser.elementIdText(elem.value.ELEMENT, (title) => {
          let searchTitleExclude = title.value.split(' ').slice(0, 1).join(' ');
          let stringToSearch = '-' + searchTitleExclude;
          browser.element('css selector', '#filter-networkName', (filterElement) => {
            // Firefox - Safari exception
            if (!filterElement.hasOwnProperty('ELEMENT')) {
              filterElement.ELEMENT = Object.values(filterElement.value)[0];
            }
            browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
              if (!content.value[1].hasOwnProperty('ELEMENT')) {
                content.value[1].ELEMENT = Object.values(content.value[1])[0];
              }
              browser.elementIdText(content.value[1].ELEMENT,  (nn) => {
                let networkName = nn.value.split(' (')[0];
                stringToSearch += ' net:"' + networkName.slice(0, 8) + '"';
                browser.element('css selector', '#filter-about', (filterElement) => {
                  // Firefox - Safari exception
                  if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                  }
                  browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
                    if (!content.value[1].hasOwnProperty('ELEMENT')) {
                      content.value[1].ELEMENT = Object.values(content.value[1])[0];
                    }
                    browser.elementIdText(content.value[1].ELEMENT,  (nn) => {
                      let subj = nn.value.split(' (')[0];
                      stringToSearch += ' subj:"' + subj.slice(0, 8) + '"';
                      browser.setValue('#search-book', stringToSearch)
                        .click('button[id=search-button]')
                        .pause(2000)
                        .waitForElementVisible('.ais-Hits__books')
                        .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
                          bookElement.value.forEach((v) => {
                            if (!v.hasOwnProperty('ELEMENT')) {
                              v.ELEMENT = Object.values(v)[0];
                            }
                            browser.elementIdText(v.ELEMENT, (textBookCard) => {
                              browser
                                .assert.ok(
                                  textBookCard.value.toLowerCase().search(searchTitleExclude.toLowerCase()) < 0,
                                  'Book without' + searchTitleExclude + ' term.'
                                );
                            });
                          });
                        })
                        .elements('css selector', '.network', (bookElement) => {
                          bookElement.value.forEach((v) => {
                            if (!v.hasOwnProperty('ELEMENT')) {
                              v.ELEMENT = Object.values(v)[0];
                            }
                            browser.elementIdText(v.ELEMENT, (netw) => {
                              browser
                                .assert.ok(
                                  netw.value.toLowerCase().search(networkName.slice(0, 8).toLowerCase()) >= 0,
                                  'Book with network ' + netw.value + '. It contains ' + networkName.slice(0, 8) + ' term.'
                                );
                            });
                          });
                        })
                        .elements('css selector', '.subjects', (bookElement) => {
                          bookElement.value.forEach((v) => {
                            if (!v.hasOwnProperty('ELEMENT')) {
                              v.ELEMENT = Object.values(v)[0];
                            }
                            browser.elementIdText(v.ELEMENT, (s) => {
                              browser
                                .assert.ok(
                                  s.value.toLowerCase().search(subj.slice(0, 8).toLowerCase()) >= 0,
                                  'Book with subject ' + s.value + '. It contains ' + subj.slice(0, 8) + ' term.'
                                );
                            });
                          });
                        }).end();
                    });
                  });
                });
              });
            });
          });
        });
      });
  },
  'Search filtering by 2 facet and then clear search and search by normal term' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.visible('#search-book')
      .pause(3000)
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
            let subj = nn.value.split(' (')[0];
            let stringToSearch = ' subj:"' + subj.slice(0, 8) + '"';
            browser.setValue('#search-book', stringToSearch)
              .click('button[id=search-button]')
              .pause(2000)
              .waitForElementVisible('.ais-Hits__books')
              .elements('css selector', '.subjects', (bookElement) => {
                bookElement.value.forEach((v) => {
                  if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                  }
                  browser.elementIdText(v.ELEMENT, (s) => {
                    browser
                      .assert.ok(
                        s.value.toLowerCase().search(subj.slice(0, 8).toLowerCase()) >= 0,
                        'Book with subject ' + s.value + '. It contains ' + subj.slice(0, 8) + ' term.'
                      );
                  });
                });
              }).perform((done) => {
                browser.element('css selector', '.v-card__title',  (elem) => {
                  if (!elem.value.hasOwnProperty('ELEMENT')) {
                    elem.value.ELEMENT = Object.values(elem.value)[0];
                  }
                  browser.elementIdText(elem.value.ELEMENT, (title) => {
                    let titleToSearch = title.value.slice(0, 10);
                    browser
                      .waitForElementVisible('#search-book')
                      .setValue('#search-book', '')
                      .setValue('#search-book', titleToSearch)
                      .pause(2000)
                      .click('button[id=search-button]')
                      .click('button[id=search-button]')
                      .pause(6000)
                      .waitForElementVisible('.ais-Hits__books')
                      .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
                        bookElement.value.forEach((v) => {
                          if (!v.hasOwnProperty('ELEMENT')) {
                            v.ELEMENT = Object.values(v)[0];
                          }
                          browser.elementIdText(v.ELEMENT, (textBookCard) => {
                            browser
                              .assert.ok(
                                textBookCard.value.toLowerCase().search(titleToSearch.toLowerCase()) >= 0,
                                'Book content: ' + textBookCard.value + '.It contains "' + titleToSearch + '" term.'
                              );
                          });
                        });
                      });
                    done();
                  });
                });
              });
          });
        });
      }).end();
  }
};