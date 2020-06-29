module.exports = {
    'Filtering books by "All rigths reserved" license and checking only red background color in cards' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-licenses')
            .assert.visible('#all-rights-reserved')
            .click('#all-rights-reserved')
            .waitForElementVisible('.v-chip--clickable')
            .assert.cssClassPresent(".ais-Hits__books--border", "ais-Hits__books--redbackground")
            .expect.element('.ais-Hits__books--border').to.not.have.css('background-color').which.contains("#FFFFFF")
    },
    'Filtering books by Word Count <= 1200 words' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordcount')
            .assert.visible('#max-wordcount')
            .setValue('#max-wordcount', '1200')
            .waitForElementVisible('.v-chip--clickable');
        browser.elements('css selector', '.ais-Hits__books__book', function(bookElement) {
            bookElement.value.forEach((v) => {
                browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books__book__wordcount', function (elem) {
                    browser.elementIdText(elem.value.ELEMENT, function(words) {
                        browser.assert.ok(parseInt(words.value) <= 1200, "Card with " + words.value + " words. It is <= 1200");
                    })
                })
            })
        });
    },
    'Filtering books by Storage Size >= 350 MB' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordcount')
            .assert.visible('#min-storagesize')
            .setValue('#min-storagesize', '350')
            .waitForElementVisible('.v-chip--clickable');
        browser.elements('css selector', '.ais-Hits__books__book', function(bookElement) {
            bookElement.value.forEach((v) => {
                browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books__book__storagesize', function (elem) {
                    browser.elementIdText(elem.value.ELEMENT, function(size) {
                        let storage = size.value.split(' ');
                        if (storage.length > 0) {
                            storage = storage[0];
                            browser.assert.ok(parseInt(storage) >= 350, "Card with " + storage + " MB. It is >= 350");
                        }
                    })
                })
            })
        });
    }
};