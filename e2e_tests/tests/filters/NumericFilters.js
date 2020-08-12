module.exports = {
    'Clear button for numeric filters' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordCount')
            .setValue('#min-wordCount', '1200')
            .setValue('#max-wordCount', '3000')
            .click('#btn-wordCount')
            .pause(2000)
            .click('#btn-clear-wordCount')
            .pause(3000)
            .elements('css selector', '.v-chip__content', (chipElement) => {
                chipElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdText(v.ELEMENT,  (chip) => {
                        browser.assert.ok(chip.value.search('Word') < 0, 'There are not chips for Word filter');
                    });
                });
            })
            .pause(2000)
            .getAttribute('#min-wordCount', 'value', (v) => {
                browser.assert.ok(parseInt(v.value) === 0, 'Min value input is 0');
            })
            .getAttribute('#min-wordCount', 'value', (v) => {
                browser.assert.ok(parseInt(v.value) === 0, 'Max value input is 0');
            }).assert.not.urlContains('?words=' + encodeURIComponent('>=1200&&<=3000'))
            .end();
    },
};