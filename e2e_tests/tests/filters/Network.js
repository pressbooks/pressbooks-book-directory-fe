module.exports = {
    'Filtering book by a Network name': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-networkName')
            .pause(2000)
            .element('css selector', '#filter-networkName', function(filterElement) {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', function (content) {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT, function (nn) {
                        let networkName = nn.value.split(' (')[0];
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', function (button) {
                            if (!button.value[0].hasOwnProperty('ELEMENT')) {
                                button.value[0].ELEMENT = Object.values(button.value[0])[0];
                            }
                            browser.elementIdClick(button.value[0].ELEMENT, function () {
                                browser.waitForElementVisible('.v-chip--clickable')
                                    .pause(2000)
                                    .elements('css selector', '.network', function(bookElement) {
                                        bookElement.value.forEach((v) => {
                                            // Firefox - Safari exception
                                            if (!v.hasOwnProperty('ELEMENT')) {
                                                v.ELEMENT = Object.values(v)[0];
                                            }
                                            browser.elementIdText(v.ELEMENT, function(text) {
                                                let tx = text.value;
                                                browser.assert.ok(
                                                    tx.toLowerCase().search(networkName.toLowerCase()) >= 0,
                                                    "Book contains the network: " + networkName
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