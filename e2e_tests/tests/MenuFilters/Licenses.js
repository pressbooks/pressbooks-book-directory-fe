module.exports = {
  'Filtering books by "All rigths reserved" license and checking only red background color in cards' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .click('#btn-include-license_code-All-Rights-Reserved')
      .waitForElementVisible('.v-chip--clickable')
      .assert.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
      .expect.element('.ais-Hits__books-book').to.not.have.css('background-color').which.contains('#FFFFFF');
  },
  'Excluding books with "All rigths reserved" license and checking background color in cards' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .waitForElementVisible('#filter-license_code')
      .click('#btn-exclude-license_code-All-Rights-Reserved')
      .waitForElementVisible('.v-chip--clickable')
      .pause(2000)
      .assert.not.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
      .assert.not.cssClassPresent('.ais-Hits__books-book', 'copyright');
  }
};