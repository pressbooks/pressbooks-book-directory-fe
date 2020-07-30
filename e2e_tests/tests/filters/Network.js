module.exports = {
    'Filtering book by Kwantlen Polytechnic University Network': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-networkName')
            .click('#btn-include-networkName-Kwantlen-Polytechnic-University-Publishing-Sites')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        let nUrl = 'kpu.pressbooks.pub';
        browser.elements('css selector', '.network', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdText(v.ELEMENT, function(text) {
                    let tx = text.value;
                    browser.assert.ok(tx.toLowerCase() === nUrl, "Book have Network URL: " + nUrl);
                })
            })
        });
    },
    'Excluding book by Kwantlen Polytechnic University Network': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-networkName')
            .click('#btn-exclude-networkName-Kwantlen-Polytechnic-University-Publishing-Sites')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        let nUrl = 'kpu.pressbooks.pub';
        browser.elements('css selector', '.network', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdText(v.ELEMENT, function(text) {
                    let tx = text.value;
                    browser.assert.ok(tx.toLowerCase() !== nUrl, "Book doesn't have Network URL: " + nUrl);
                })
            })
        });
    }
};