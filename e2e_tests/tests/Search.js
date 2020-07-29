module.exports = {
    'Searching "chemistry" in searchbox and checking results in cards books' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#search-book')
            .setValue('#search-book', 'chemistry')
            .click('button[id=search-button]')
            .waitForElementVisible('.ais-Hits__books')
            .assert.containsText('.ais-Hits__books', 'chemistry')
            .end();
    }
};