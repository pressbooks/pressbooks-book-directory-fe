module.exports = {
  async 'Filtering by a single collection and confirm quantity of books in filter with in the results' (browser) {
    await browser
      .url(process.env.HOST_TEST);
    await browser
      .waitForElementVisible('body');
    await browser.pause(4000);
    const isFilterVisible = await browser
      .isVisible({
        selector: '#filter-collections',
        index: 0,
        suppressNotFoundErrors: true
      });
    if (parseInt(isFilterVisible.status) !== -1) {
      await browser.click('#filter-collections');
      let filterText = await browser.getText('#filter-collections > div.v-list-group__items > div:nth-child(1) > div.v-list-item__content');
      let regExpression = /\(([^)]+)\)/;
      filterText = regExpression.exec(filterText.value);
      let quantityOfBooksInCollection = filterText[1];
      await browser.click('#filter-collections > div.v-list-group__items > div:nth-child(1) > div.v-list-item__action > div > button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default.include');
      let booksCountInResults = await browser.getText('#v-application__main_content > div > div:nth-child(2) > div.row.filters > div.col-md-3.col-12 > div.ais-Stats > div > span.container__results-hits');
      booksCountInResults = booksCountInResults.value.split(' / ')[0];
      await browser.assert.ok(
        parseInt(booksCountInResults) === parseInt(quantityOfBooksInCollection),
        'Books qty. in collection filter: ' + quantityOfBooksInCollection + '. Books qty. in results: ' + booksCountInResults
      );
    }
  }
};