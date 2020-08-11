module.exports = {
    'Filtering books by "All rigths reserved" license and checking only red background color in cards' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .assert.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
            .expect.element('.ais-Hits__books-book').to.not.have.css('background-color').which.contains('#FFFFFF');
    },
    'Excluding books with "All rigths reserved" license and checking background color in cards' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-exclude-license_code-All-Rights-Reserved')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .assert.not.cssClassPresent('.ais-Hits__books-book', 'ais-Hits__books--allrights')
            .assert.not.cssClassPresent('.ais-Hits__books-book', 'copyright');
    },
    'Filtering by CC BY and CC0' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-CC-BY')
            .click('#btn-include-license_code-CC0')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000);
        browser.elements('css selector', '.copyright', (bookElement) => {
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', (elem) => {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                            let bg = style.value;
                            if (bg.search('background-image') >= 0) {
                                browser.assert.ok(
                                    (bg.search('0.png') >=0 || bg.search('by.png') >=0),
                                    'Book card contains \'CCO\' or \'BY\' license image'
                                );
                            }
                        });
                    });
                });
            });
        });
    },
    'Filtering by CC BY and COO licenses and then excluding ARR license' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-CC-BY')
            .click('#btn-include-license_code-CC0')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .click('#btn-exclude-license_code-All-Rights-Reserved')
            .pause(2000);
        browser.elements('css selector', '.copyright', (bookElement) => {
            bookElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-image__image--contain', (elem) => {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdAttribute(e.ELEMENT, 'style', (style) => {
                            let bg = style.value;
                            if (bg.search('background-image') >= 0) {
                                browser.assert.ok(
                                    bg.search('allrights.png') === -1,
                                    'Book card without \'All Rights Reserved\' license image'
                                );
                            }
                        });
                    });
                });
            });
        });
    }
};