module.exports = {
    'Filtering books by "All rigths reserved" license and checking only red background color in cards' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .assert.cssClassPresent(".ais-Hits__books-book", "ais-Hits__books--allrights")
            .expect.element('.ais-Hits__books-book').to.not.have.css('background-color').which.contains("#FFFFFF")
    },
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
                console.log(v.ELEMENT);
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
    'Filtering books by Storage Size 100 and 350 MB' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-storageSize')
            .assert.visible('#min-storageSize')
            .setValue('#min-storageSize', '100')
            .setValue('#max-storageSize', '350')
            .click('#btn-storageSize')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
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
                            browser.assert.ok(parseInt(storage) >= 100, "Card with " + storage + " MB. It is >= 100");
                            browser.assert.ok(parseInt(storage) <= 350, "Card with " + storage + " MB. It is <= 350");
                        }
                    })
                })
            })
        });
    },
    'Excluding books with "All rigths reserved" license and checking background color in cards' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-exclude-license_code-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .assert.not.cssClassPresent(".ais-Hits__books-book", "ais-Hits__books--allrights")
            .assert.not.cssClassPresent(".ais-Hits__books-book", "copyright")
    },
};