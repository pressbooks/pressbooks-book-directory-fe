module.exports = {
    'Searching "test" in searchbox and checking results in cards books' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('input[type=search]')
            .setValue('input[type=search]', 'test')
            .click('button[id=search-button]')
            .waitForElementVisible('.ais-Hits__books')
            .assert.containsText('.ais-Hits__books', 'test')
            .end();
    }
};