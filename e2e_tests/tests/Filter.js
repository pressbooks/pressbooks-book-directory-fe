module.exports = {
    'Filtering books by "All rigths reserved" license and checking only red background color in cards' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_name')
            .click('#btn-include-license_name-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .assert.cssClassPresent(".ais-Hits__books-book", "ais-Hits__books--allrights")
            .expect.element('.ais-Hits__books-book').to.not.have.css('background-color').which.contains("#FFFFFF")
    },
    'Filtering books by Word Count <= 1200 words' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-wordcount')
            .assert.visible('#max-wordcount')
            .setValue('5125249718#max-wordcount', '1200')
            .waitForElementVisible('.v-chip--clickable');
        browser.elements('css selector', '.ais-Hits__books-book', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                // Firefox - Safari exception
                browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', function (elem) {
                    if (!elem.value.hasOwnProperty('ELEMENT')) {
                        elem.value.ELEMENT = Object.values(elem.value)[0];
                    }
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
        browser.elements('css selector', '.ais-Hits__books-book', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-storagesize', function (elem) {
                    if (!elem.value.hasOwnProperty('ELEMENT')) {
                        elem.value.ELEMENT = Object.values(elem.value)[0];
                    }
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