module.exports = {
    'Excluding by ARR License and then apply clear all refinements button action' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-exclude-license_code-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .click('.ais-ClearRefinements-button')
            .pause(2000)
            .assert.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
            .end();
    }
};