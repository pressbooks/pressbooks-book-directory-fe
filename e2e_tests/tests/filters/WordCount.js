module.exports = {
    'Filtering books by Word Count between 1000 and 2000 words' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordCount')
            .assert.visible('#max-wordCount')
            .setValue('#min-wordCount', '1000')
            .setValue('#max-wordCount', '2000')
            .click('#btn-wordCount')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        browser.elements('css selector', '.ais-Hits__books-book', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', function (elem) {
                    if (!elem.value.hasOwnProperty('ELEMENT')) {
                        elem.value.ELEMENT = Object.values(elem.value)[0];
                    }
                    browser.elementIdText(elem.value.ELEMENT, function(words) {
                        browser.assert.ok(parseInt(words.value) >= 1000, "Card with " + words.value + " words. It is >= 1000");
                        browser.assert.ok(parseInt(words.value) <= 2000, "Card with " + words.value + " words. It is <= 2000");
                    })
                })
            })
        });
    },
};