module.exports = {
    'Sorting by Word Count (desc.)' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-SortBy-select')
            .click('.ais-SortBy-select option[value=test_Pressbooks_directory_sort_by_wordCount]')
            .pause(2000)
            .waitForElementVisible('.ais-Hits__books-book-wordcount')
            .elements('css selector', '.ais-Hits__books-book', function(bookElement) {
                let previousWC = 0, elementId;
                bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books-book-wordcount', function (elem) {
                        if (!elem.value.hasOwnProperty('ELEMENT')) {
                            elem.value.ELEMENT = Object.values(elem.value)[0];
                        }
                        elementId = elem.value.ELEMENT;
                    }).perform((done) => {
                        browser.elementIdText(elementId, function(words) {
                            if (previousWC === 0) {
                                previousWC = parseInt(words.value);
                            } else {
                                browser.assert.ok(previousWC >= parseInt(words.value), "Word Count: " + parseInt(words.value) + " words. Correct Word Count order for this card.");
                                previousWC = parseInt(words.value);
                            }
                        });
                        done();
                    });
                })
            });
    },
    'Sorting by name (asc.)' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-SortBy-select')
            .click('.ais-SortBy-select option[value=test_Pressbooks_directory]')
            .pause(2000)
            .waitForElementVisible('.ais-Hits__books-book')
            .elements('css selector', '.ais-Hits__books-book', function(bookElement) {
                let previousName = '', elementId;
                bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdElement(v.ELEMENT, 'css selector', '.ais-Hits__books .v-card__title', function (elem) {
                        if (!elem.value.hasOwnProperty('ELEMENT')) {
                            elem.value.ELEMENT = Object.values(elem.value)[0];
                        }
                        elementId = elem.value.ELEMENT;
                    }).perform((done) => {
                        browser.elementIdText(elementId, function(words) {
                            words.value = words.value.toLowerCase();
                            if (previousName === '') {
                                previousName = words.value;
                            } else {
                                browser.assert.ok(previousName <= words.value, "Book name: " + words.value + ". Correct name order for this card.");
                                previousName = words.value;
                            }
                        });
                        done();
                    });
                })
            });
    },
    'Sorting by last updated (desc.)' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('.ais-SortBy-select')
            .click('.ais-SortBy-select option[value=test_Pressbooks_directory_sort_by_lastUpdated]')
            .pause(2000)
            .waitForElementVisible('.updated')
            .elements('css selector', '.ais-Hits__books-book', function(bookElement) {
                let previousDate = 0, elementId;
                bookElement.value.forEach((v) => {
                    if (!v.hasOwnProperty('ELEMENT')) {
                        v.ELEMENT = Object.values(v)[0];
                    }
                    browser.elementIdElement(v.ELEMENT, 'css selector', '.updated', function (elem) {
                        if (!elem.value.hasOwnProperty('ELEMENT')) {
                            elem.value.ELEMENT = Object.values(elem.value)[0];
                        }
                        elementId = elem.value.ELEMENT;
                    }).perform((done) => {
                        browser.elementIdText(elementId, function(date) {
                            if (previousDate === 0) {
                                previousDate = new Date(date.value);
                            } else {
                                date.value = new Date(date.value);
                                browser.assert.ok(previousDate >= date.value, "Date: " + date.value + ". Correct last updated order for this card.");
                                previousDate = date.value;
                            }
                        });
                        done();
                    });
                })
            });
    }
};