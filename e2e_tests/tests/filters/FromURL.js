module.exports = {
    'Filter wordCount (between 1300 and 3100 words) from URL' (browser) {
        browser
            .url(process.env.HOST_TEST + '/?words=' + encodeURIComponent('>=1300&&<=3100'))
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-Hits__books-book')
            .pause(3000)
            .elements('css selector', '.ais-Hits__books-book', (bookElement) => {
                bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', (elem) => {
                        browser.assert.ok(elem.status !== '0', 'Book without wordCount field');
                        if (!elem.value.hasOwnProperty('ELEMENT')) {
                            elem.value.ELEMENT = Object.values(elem.value)[0];
                        }
                        browser.elementIdText(elem.value.ELEMENT, (words) => {
                            browser.assert.ok(parseInt(words.value) >= 1300, 'Book with ' + words.value + ' words. It is >= 1300');
                            browser.assert.ok(parseInt(words.value) <= 3100, 'Book with ' + words.value + ' words. It is <= 3100');
                        });
                    });
                });
            });
    },
    'Filtering by subject from an URL' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-Hits__books-book')
            .assert.visible('#filter-about')
            .pause(2000)
            .element('css selector', '#filter-about', (filterElement) => {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (content) => {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT, (nn) => {
                        let aboutName = nn.value.split(' (')[0];
                        browser
                            .url(process.env.HOST_TEST + '/?subj=' + encodeURIComponent(aboutName))
                            .waitForElementVisible('body')
                            .waitForElementVisible('.ais-Hits__books-book')
                            .pause(3000)
                            .elements('css selector', '.subject', (bookElement) => {
                                bookElement.value.forEach((v) => {
                                    if (!v.hasOwnProperty('ELEMENT')) {
                                        v.ELEMENT = Object.values(v)[0];
                                    }
                                    browser.elementIdText(v.ELEMENT, (text) => {
                                        let tx = text.value;
                                        browser.assert.ok(
                                            tx.toLowerCase().search(aboutName.toLowerCase()) >= 0,
                                            'Book contains the subject: ' + aboutName
                                        );
                                    });
                                });
                            });
                    });
                });
            });
    },
    'Filtering by publisher from an URL' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-Hits__books-book')
            .assert.visible('#filter-publisher_name')
            .pause(2000)
            .element('css selector', '#filter-publisher_name', (filterElement) => {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', (content) => {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT, (nn) => {
                        let pubName = nn.value.split(' (')[0];
                        browser
                            .url(process.env.HOST_TEST + '/?pub=' + encodeURIComponent(pubName))
                            .waitForElementVisible('body')
                            .waitForElementVisible('.ais-Hits__books-book')
                            .pause(3000)
                            .elements('css selector', '.publisher', (bookElement) => {
                                bookElement.value.forEach((v) => {
                                    if (!v.hasOwnProperty('ELEMENT')) {
                                        v.ELEMENT = Object.values(v)[0];
                                    }
                                    browser.elementIdText(v.ELEMENT, (text) => {
                                        let tx = text.value;
                                        browser.assert.ok(
                                            tx.toLowerCase().search(pubName.toLowerCase()) >= 0,
                                            'Book with publisher field: ' + pubName
                                        );
                                    });
                                });
                            });
                    });
                });
            });
    }
};