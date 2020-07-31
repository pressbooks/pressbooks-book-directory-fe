module.exports = {
    'Searching by network URL' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#search-book');
        browser.element('css selector', '.network', function (elem) {
            if (!elem.value.hasOwnProperty('ELEMENT')) {
                elem.value.ELEMENT = Object.values(elem.value)[0];
            }
            browser.elementIdText(elem.value.ELEMENT, function(network) {
                let networkName = network.value;
                browser.setValue('#search-book', networkName)
                    .click('button[id=search-button]')
                    .waitForElementVisible('.ais-Hits__books')
                    .pause(2000)
                    .assert.containsText('.network', networkName)
                    .end();
            })
        });
    }
};