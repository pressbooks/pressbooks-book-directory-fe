module.exports = {
    'Filtering books by Last Updated field between 2020-08-01 and 2020-09-01 by URL' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('#filter-lastUpdated')
            .setValue('#min-date-lastUpdated', '2020-08-01')
            .setValue('#max-date-lastUpdated', '2020-09-01')
            .click('#btn-date-lastUpdated')
            .pause(3000)
            .waitForElementVisible('.updated')
            .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
                let from = new Date('2020-08-01');
                let to = new Date('2020-09-01');
                bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdElement(v.ELEMENT, 'css selector', '.updated',  (elem) => {
                        browser.assert.ok(elem.status !== '0', 'Book without lastUpdated field');
                        if (!elem.value.hasOwnProperty('ELEMENT')) {
                            elem.value.ELEMENT = Object.values(elem.value)[0];
                        }
                        browser.elementIdText(elem.value.ELEMENT, (updated) => {
                            let u = new Date(updated.value);
                            browser.assert.ok(
                                u >= from,
                                'Book with date: ' + u + '. It is <= ' + from
                            ).assert.ok(
                                u >= to,
                                'Book with date: ' + u + '. It is >= ' + to
                            );
                        });
                    });
                });
            }).end();
    }
};