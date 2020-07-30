module.exports = {
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
    }
};