module.exports = {
    'Checking quantity of books mentioned in filter': function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-about')
            .pause(2000)
            .element('css selector', '#filter-about', function(filterElement) {
                // Firefox - Safari exception
                if (!filterElement.hasOwnProperty('ELEMENT')) {
                    filterElement.ELEMENT = Object.values(filterElement.value)[0];
                }
                browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content', function (content) {
                    if (!content.value[0].hasOwnProperty('ELEMENT')) {
                        content.value[0].ELEMENT = Object.values(content.value[0])[0];
                    }
                    browser.elementIdText(content.value[0].ELEMENT, function (nn) {
                        let aboutName = nn.value.split(' (')[0];
                        let aboutID = aboutName.split(' ').join('-');
                        browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon', function (button) {
                            if (!button.value[0].hasOwnProperty('ELEMENT')) {
                                button.value[0].ELEMENT = Object.values(button.value[0])[0];
                            }
                            browser.elementIdClick(button.value[0].ELEMENT, function () {
                                browser.getText('#filter-item-name-' + aboutID, function (t) {
                                    let eq = t.value.split(' (');
                                    let quantity = parseInt(eq[1].split(')')[0]);
                                    browser.getText('css selector', '.container__results-hits', function (d) {
                                        let text = d.value.split(' ');
                                        let shown = parseInt(text[2]);
                                        browser.assert.ok(
                                            quantity === shown,
                                            "Qty in filter: " + quantity + ". Qty in shown: " + shown
                                        )
                                        .assert.urlContains('?subj=' + encodeURIComponent(aboutName));
                                    })
                                });
                            });
                        });
                    });
                });
            });
    }
};