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
  }
};