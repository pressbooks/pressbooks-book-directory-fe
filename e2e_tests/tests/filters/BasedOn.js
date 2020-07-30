module.exports = {
    "Filter by books based on another books and check image in book card": function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-basedOn')
            .click('#btn-include-based-another')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        browser.elements('css selector', '.isBasedOn', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', function (elem) {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdAttribute(e.ELEMENT, 'style', function(style) {
                            let bg = style.value;
                            if (bg.search('background-image') >= 0) {
                                browser.assert.ok(bg.search('is-child.png') >=0, "Book contains 'child' image");
                            }
                        })
                    });
                })
            })
        });
    },
    "Excluding books based on another books and check image in book card": function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-basedOn')
            .click('#btn-exclude-based-another')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        browser.elements('css selector', '.isBasedOn', function(bookElement) {
            browser.waitForElementVisible('.v-chip--clickable');
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', function (elem) {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdAttribute(e.ELEMENT, 'style', function(style) {
                            let bg = style.value;
                            if (bg.search('background-image') >= 0) {
                                browser.assert.ok(bg.search('is-base.png') >=0, "Book contains 'is-base' image");
                            }
                        })
                    });
                })
            })
        });
    }
};