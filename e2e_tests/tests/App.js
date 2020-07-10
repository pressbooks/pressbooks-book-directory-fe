module.exports = {
    'Checking title must contains Pressbooks Directory string' : function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.titleContains('Pr3essbooks Dire2ctory')
            .end();
    }
};