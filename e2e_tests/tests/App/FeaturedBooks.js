module.exports = {
  'Perform a search by network and confirm featured books are the same after the search action'(browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(4000)
      .assert.visible('#v-application__main_content > div > div.container.welcome-header > div')
      .assert.visible('#search-book')
      .element('css selector', '.network', (elem) => {
        if (!elem.value.hasOwnProperty('ELEMENT')) {
          elem.value.ELEMENT = Object.values(elem.value)[0];
        }
        browser.elementIdText(elem.value.ELEMENT, (network) => {
          let networkName = network.value;
          browser
            .element(
              'css selector',
              '#v-application__main_content > div > div.container.welcome-header > div > div > div.offset-1.ml-auto.featuredbook--col.col-lg-2.col > div > div.v-card__title.v-card__title--featuredbook > a',
              (elemTitle) => {
                if (!elemTitle.value.hasOwnProperty('ELEMENT')) {
                  elemTitle.value.ELEMENT = Object.values(elemTitle.value)[0];
                }
                browser.elementIdText(elemTitle.value.ELEMENT, (featureBooksTitle) => {
                  let featuredBook = featureBooksTitle.value;
                  browser.setValue('#search-book', networkName)
                    .click('button[id=search-button]')
                    .waitForElementVisible('.ais-Hits__books')
                    .pause(2000)
                    .assert.containsText(
                      '#v-application__main_content > div > div.container.welcome-header > div > div > div.offset-1.ml-auto.featuredbook--col.col-lg-2.col > div > div.v-card__title.v-card__title--featuredbook > a',
                      featuredBook
                    )
                    .end();
                });
              }
            );
        });
      });
  },
  'Check the link in the title for a featured book' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('#v-application__main_content > div > div.container.welcome-header > div > div > div.offset-1.ml-auto.featuredbook--col.col-lg-2.col > div > div.v-card__title.v-card__title--featuredbook > a')
      .click('#v-application__main_content > div > div.container.welcome-header > div > div > div.offset-1.ml-auto.featuredbook--col.col-lg-2.col > div > div.v-card__title.v-card__title--featuredbook > a')
      .windowHandles(function(result) {
        const handle = result.value[1];
        browser
          .switchWindow(handle)
          .expect.url().to.not.contain(process.env.HOST_TEST);
      }).end();
  }
};