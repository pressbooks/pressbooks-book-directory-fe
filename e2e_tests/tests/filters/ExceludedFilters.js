module.exports = {
    'Checking quantity of books mentioned in filter': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-about')
            .click('#btn-include-about-Social-work')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        browser.getText('#filter-item-name-Social-work', function (t) {
           let eq = t.value.split(' (');
           let quantity = parseInt(eq[1].split(')')[0]);
            browser.getText('css selector', '.container__results-hits', function (d) {
                let text = d.value.split(' ');
                let shown = parseInt(text[2]);
                browser.assert.ok(quantity === shown, "Filter quantity is the same than shown section")
            });
        });
    }
};