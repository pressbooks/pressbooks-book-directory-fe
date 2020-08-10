module.exports = {
    'Checking title must contains Pressbooks Directory string' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.titleContains('Pressbooks Directory')
            .end();
    }
};