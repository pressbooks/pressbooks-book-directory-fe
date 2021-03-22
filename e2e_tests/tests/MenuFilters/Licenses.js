module.exports = {
  'Filtering books by "All rigths reserved" license and checking only red background color in cards' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-licenseCode')
      .click('#filter-licenseCode')
      .click('#btn-include-licenseCode-All-Rights-Reserved')
      .waitForElementVisible('.ais-CurrentRefinements-list')
      .assert.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
      .expect.element('.ais-Hits__books-book').to.not.have.css('background-color').which.contains('#FFFFFF');
  },
  'Excluding books with "All rigths reserved" license and checking background color in cards' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-licenseCode')
      .click('#filter-licenseCode')
      .click('#btn-exclude-licenseCode-All-Rights-Reserved')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .assert.not.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
      .assert.not.cssClassPresent('.ais-Hits__books-book', 'copyright');
  }
};