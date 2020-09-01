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
          .assert.containsText('.network', networkName);
      });
    }).end();
  }
};