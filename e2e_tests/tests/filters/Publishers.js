module.exports = {
    "Searching a publisher by 'uni' string in filter search" : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-publisher_name')
            .assert.visible('#search-filter-publisher_name')
            .pause(2000)
            .setValue('#search-filter-publisher_name', 'uni')
            .pause(1000);
        browser.elements('css selector', '#filter-publisher_name', function(filterElement) {
            filterElement.value.forEach((v) => {
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-list-item__content', function (elem) {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdText(e.ELEMENT, function(s) {
                            let publisher = s.value.toLowerCase();
                            if (publisher.length > 0) {
                                browser.assert.ok(
                                    publisher.search('uni') >= 0,
                                    "Publisher '" + publisher + "' contains 'uni' string"
                                );
                            }
                        });
                    });
                })
            })
        });
    },
    'Filtering by publisher name': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-publisher_name')
            .pause(2000)
            .element('css selector', '#filter-publisher_name', function(filterElement) {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', function (content) {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT, function (nn) {
                        let publisher = nn.value.split(' (')[0];
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', function (button) {
                            if (!button.value[0].hasOwnProperty('ELEMENT')) {
                                button.value[0].ELEMENT = Object.values(button.value[0])[0];
                            }
                            browser.elementIdClick(button.value[0].ELEMENT, function () {
                                browser.waitForElementVisible('.v-chip--clickable')
                                    .pause(2000)
                                    .elements('css selector', '.publisher', function(bookElement) {
                                        bookElement.value.forEach((v) => {
                                            if (!v.hasOwnProperty('ELEMENT')) {
                                                v.ELEMENT = Object.values(v)[0];
                                            }
                                            browser.elementIdText(v.ELEMENT, function(text) {
                                                let tx = text.value;
                                                browser.assert.ok(
                                                    tx.toLowerCase().search(publisher.toLowerCase()) >= 0,
                                                    "Book contains the publisher: " + publisher
                                                );
                                            })
                                        });
                                    });
                            });
                        });
                    });
                });
            });
    }
};