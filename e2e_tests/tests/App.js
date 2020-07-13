module.exports = {
    'Checking title must contains Pressbooks Directory string' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.titleContains('Press3books Di2rectory')
            .end();
    }
};