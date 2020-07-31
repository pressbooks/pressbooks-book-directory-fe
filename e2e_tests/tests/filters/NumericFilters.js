module.exports = {
    'Clear button for numeric filters' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordCount')
            .setValue('#min-wordCount', '1200')
            .setValue('#max-wordCount', '3000')
            .click('#btn-wordCount')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .click('#btn-clear-wordCount');
        browser.elements('css selector', '.v-chip__content', function(chipElement) {
            chipElement.value.forEach((v) => {
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdText(v.ELEMENT, function (chip) {
                    browser.assert.ok(chip.value.search('Word') < 0, "There are not chips for Word filter");
                });
            });
        });
        browser
            .pause(2000)
            .getAttribute('#min-wordCount', 'value', function(v) {
                browser.assert.ok(parseInt(v.value) === 0, "Min value input is 0");
            })
            .getAttribute('#min-wordCount', 'value', function(v) {
                browser.assert.ok(parseInt(v.value) === 0, "Max value input is 0");
            });
    },
};