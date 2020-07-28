module.exports = {
    "Searching a subject by 'gui' string" : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-about')
            .assert.visible('#search-filter-about')
            .setValue('#search-filter-about', 'gui')
            .pause(700);
        browser.elements('css selector', '#filter-about', function(filterElement) {
            filterElement.value.forEach((v) => {
                // Firefox - Safari exception
                if (!v.hasOwnProperty('ELEMENT')) {
                    v.ELEMENT = Object.values(v)[0];
                }
                browser.elementIdElements(v.ELEMENT, 'css selector', '.v-list-item__content', function (elem) {
                    elem.value.forEach((e) => {
                        if (!e.hasOwnProperty('ELEMENT')) {
                            e.ELEMENT = Object.values(e)[0];
                        }
                        browser.elementIdText(e.ELEMENT, function(s) {
                            let subject = s.value.toLowerCase();
                            if (subject.length > 0) {
                                browser.assert.ok(subject.search('gui') >= 0, "Subject '" + subject + "' contains 'gui' string");
                            }
                        });
                    });
                })
            })
        });
    }
};