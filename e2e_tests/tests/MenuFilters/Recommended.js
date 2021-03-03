module.exports = {
  async 'Filtering by recommended books and checking in each book cards diagonal banner is present' (browser) {
    await browser
      .url(process.env.HOST_TEST);
    await browser
      .waitForElementVisible('body');
    await browser.pause(4000);
    const isRecommendedVisible = await browser
      .isVisible({
        selector: '#filter-recommended',
        index: 0,
        suppressNotFoundErrors: true
      });
    if (parseInt(isRecommendedVisible.status) !== -1) {
      await browser.click('#filter-recommended');
      await browser.click('#btn-included-recommended');
      await browser.pause(3000);
      const bookCardElements = await browser.elements('css selector', '.ais-Hits__books-book');
      bookCardElements.value.forEach((bookCardElement) => {
        if (!bookCardElement.hasOwnProperty('ELEMENT')) {
          bookCardElement.ELEMENT = Object.values(bookCardElement)[0];
        }
        browser.elementIdElement(
          bookCardElement.ELEMENT,
          'css selector', '.ais-Hits__books__recommended',
          function (recommendedBannerElement) {
            browser.assert.ok(
              parseInt(recommendedBannerElement.status) !== -1,
              'Recommended banner is present within the book card'
            );
          }
        );
      });
    }
  },
  async 'Excluding recommended books and confirming diagonal banner is not visible' (browser) {
    await browser
      .url(process.env.HOST_TEST);
    await browser
      .waitForElementVisible('body');
    await browser.pause(4000);
    const isRecommendedVisible = await browser
      .isVisible({
        selector: '#filter-recommended',
        index: 0,
        suppressNotFoundErrors: true
      });
    if (parseInt(isRecommendedVisible.status) !== -1) {
      await browser.click('#filter-recommended');
      await browser.click('#btn-excluded-recommended');
      await browser.pause(3000);
      browser.expect.element('.ais-Hits__books__recommended').to.not.be.present;
    }
  }
};