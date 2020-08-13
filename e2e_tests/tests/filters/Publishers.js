module.exports = {
    'Searching a publisher by \'uni\' string in filter search' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('#filter-publisher_name')
            .waitForElementVisible('#search-filter-publisher_name')
            .pause(2000)
            .setValue('#search-filter-publisher_name', 'uni')
            .pause(1000);
        browser.elements('css selector', '#filter-publisher_name', (filterElement) => {
            filterElement.value.forEach((v) => {
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-list-item__content',  (elem) => {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdText(e.ELEMENT, (s) => {
                            let publisher = s.value.toLowerCase();
                            if (publisher.length > 0) {
                                browser.assert.ok(
                                    publisher.search('uni') >= 0,
                                    'Publisher \'' + publisher + '\' contains \'uni\' string'
                                );
                            }
                        });
                    });
                });
            });
        }).end();
    },
    'Filtering by publisher name' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('#filter-publisher_name')
            .pause(2000)
            .element('css selector', '#filter-publisher_name', (filterElement) => {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT,  (nn) => {
                        let publisher = nn.value.split(' (')[0];
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
                            if (!button.value[0].hasOwnProperty('ELEMENT')) {
                                button.value[0].ELEMENT = Object.values(button.value[0])[0];
                            }
                            browser.elementIdClick(button.value[0].ELEMENT,  () => {
                                browser.waitForElementVisible('.v-chip--clickable')
                                    .pause(2000)
                                    .elements('css selector', '.publisher', (bookElement) => {
                                        bookElement.value.forEach((v) => {
                                            if (!v.hasOwnProperty('ELEMENT')) {
                                                v.ELEMENT = Object.values(v)[0];
                                            }
                                            browser.elementIdText(v.ELEMENT, (text) => {
                                                let tx = text.value;
                                                browser.assert.ok(
                                                    tx.toLowerCase().search(publisher.toLowerCase()) >= 0,
                                                    'Book contains the publisher: ' + publisher
                                                );
                                            });
                                        });
                                    }).assert.urlContains('?pub=' + encodeURIComponent(publisher));
                            });
                        });
                    });
                });
            }).end();
    }
};