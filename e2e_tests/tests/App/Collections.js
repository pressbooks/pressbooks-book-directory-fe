module.exports = {
  async 'Perform a search by network and confirm collection of books are the same after the search action' (browser) {
    await browser
      .url(process.env.HOST_TEST);
    await browser
      .waitForElementVisible('body');
    await browser.pause(4000);
    await browser.assert.visible('#search-book');
    const isVisible = await browser
      .isVisible({
        selector: '#special-header-collections > div > div.offset-1.ml-auto.specialheader--col.col-lg-2.col > div > div.v-card__title.v-card__title--specialheader > a',
        index: 0,
        suppressNotFoundErrors: true
      });
    if (parseInt(isVisible.status) !== -1) {
      const networkName = await browser.getText('.network');
      let collectionElement = await browser.getText('#special-header-collections > div > div.offset-1.ml-auto.specialheader--col.col-lg-2.col > div > div.v-card__title.v-card__title--specialheader > a');
      if (collectionElement.value) {
        let collectionTitle = collectionElement.value;
        await browser.setValue('#search-book', networkName);
        await browser.click('button[id=search-button]');
        await browser.waitForElementVisible('.ais-Hits__books');
        await browser.pause(2000);
        await browser.assert.containsText(
          '#special-header-collections > div > div.offset-1.ml-auto.specialheader--col.col-lg-2.col > div > div.v-card__title.v-card__title--specialheader > a',
          collectionTitle
        );
        await browser.end();
      }
    }
  }
};