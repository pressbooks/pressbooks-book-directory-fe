module.exports = {
  'Check total network is still the same after apply Network filter'(browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-networkName')
      .pause(2000)
      .click('#filter-networkName')
      .getText('#v-application__main_content > div > div.container.welcome-header > p:nth-child(2) > strong:nth-child(2)', (totalNetworksText) => {
        const totalNetworks = parseInt(totalNetworksText.value);
        browser
          .click('#filter-networkName > div.v-list-group__items > div:nth-child(3) > div.v-list-item__action > div > button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default.include')
          .pause(3000)
          .getText('#v-application__main_content > div > div.container.welcome-header > p:nth-child(2) > strong:nth-child(2)', (totalNetworksAfter) => {
            browser
              .assert.ok(
                totalNetworks === parseInt(totalNetworksAfter.value),
                'Total network before apply filter: ' + totalNetworks + '. Total Networks after apply the filter: ' + totalNetworksAfter.value
              );
          });
      });
  },
  'Check total books is still the same after apply Network filter'(browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-networkName')
      .pause(2000)
      .click('#filter-networkName')
      .getText('#v-application__main_content > div > div:nth-child(2) > div.row.filters > div.col-md-3.col-12 > div.ais-Stats > div > span.container__results-hits', (resultsText) => {
        const totalShown = parseInt(resultsText.value.split('/ ')[1]);
        browser
          .click('#filter-networkName > div.v-list-group__items > div:nth-child(3) > div.v-list-item__action > div > button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default.include')
          .pause(3000)
          .getText('#v-application__main_content > div > div:nth-child(2) > div.row.filters > div.col-md-3.col-12 > div.ais-Stats > div > span.container__results-hits', (resultsTextAfter) => {
            const totalShownAfter = parseInt(resultsTextAfter.value.split('/ ')[1]);
            browser
              .assert.ok(
                totalShownAfter === totalShown,
                'Total shown before apply filter: ' + totalShown + '. Total shown after apply the filter: ' + totalShownAfter
              );
          });
      });
  }
};