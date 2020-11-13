module.exports = {
  'Checking title must contains Pressbooks Directory string' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .assert.titleContains('Pressbooks Directory')
      .end();
  },
  'Check additional text in header section contains VUE_APP_HEADER_ADDITIONAL_TEXT env variable' (browser) {
    if (
      process.env.VUE_APP_HEADER_ADDITIONAL_TEXT &&
      process.env.VUE_APP_HEADER_ADDITIONAL_TEXT.length > 0
    ) {
      // Getting header additional text and removing HTML tags
      const additionalText = process.env.VUE_APP_HEADER_ADDITIONAL_TEXT.replace(/(<([^>]+)>)/ig, '');
      browser
        .url(process.env.HOST_TEST)
        .waitForElementVisible('body')
        .pause(3000)
        .expect.element('#v-application__main_content > div > div.container.welcome-header')
        .text.to.contain(additionalText);
    }
  }
};