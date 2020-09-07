module.exports = {
  'Excluding by ARR License and then apply clear all refinements button action' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .click('#btn-exclude-license_code-All-Rights-Reserved')
      .pause(2000)
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .waitForElementVisible('.ais-Hits__books-book')
      .click('.ais-ClearRefinements-button')
      .pause(2000)
      .assert.not.containsText('.filters__head', 'All Rights Reserved')
      .end();
  }
};