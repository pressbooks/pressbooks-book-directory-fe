module.exports = {
    'Filtering book by a Network name' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .waitForElementVisible('#filter-networkName')
            .pause(2000)
            .element('css selector', '#filter-networkName', (filterElement) => {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT,  (nn) => {
                        let networkName = nn.value.split(' (')[0];
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
                            if (!button.value[0].hasOwnProperty('ELEMENT')) {
                                button.value[0].ELEMENT = Object.values(button.value[0])[0];
                            }
                            browser.elementIdClick(button.value[0].ELEMENT,  () => {
                                browser.waitForElementVisible('.v-chip--clickable')
                                    .pause(2000)
                                    .elements('css selector', '.network', (bookElement) => {
                                        bookElement.value.forEach((v) => {
                                            // Firefox - Safari exception
                                            if (!v.hasOwnProperty('ELEMENT')) {
                                                v.ELEMENT = Object.values(v)[0];
                                            }
                                            browser.elementIdText(v.ELEMENT, (text) => {
                                                let tx = text.value;
                                                browser.assert.ok(
                                                    tx.toLowerCase().search(networkName.toLowerCase()) >= 0,
                                                    'Book contains the network: ' + networkName
                                                ).assert.urlContains('?net=' + encodeURIComponent(networkName));
                                            });
                                        });
                                    });
                            });
                        });
                    });
                });
            }).end();
    }
};