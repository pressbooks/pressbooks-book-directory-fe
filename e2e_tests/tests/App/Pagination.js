module.exports = {
  'Apply license filter and check quantity of pages' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.visible('#filter-licenseCode')
      .click('#filter-licenseCode')
      .click('*[data-test-include-btn="0"]')
      .pause(2000)
      .waitForElementVisible('.v-chip--clickable')
      .waitForElementVisible('.ais-Pagination-list')
      .waitForElementVisible('.container__results-hits');
    browser.getText('css selector', '.container__results-hits',  (d) => {
      let text = d.value.split(' ');
      let shown = parseInt(text[1]);
      let totalPages = shown / 10;
      if (totalPages > 1) {
        if (totalPages > parseInt(totalPages)) {
          totalPages = parseInt(totalPages) + 1;
        }
        totalPages = (totalPages > 7) ? 7 : totalPages;
        browser.elements('css selector', '.ais-Pagination-link', (elem) => {
          let pages = (elem.value.length / 2) - 4;
          browser.assert.ok(totalPages === pages, 'Pages expected: ' + totalPages + '. Pages shown: ' + pages);
        });
      }
    }).end();
  }
};