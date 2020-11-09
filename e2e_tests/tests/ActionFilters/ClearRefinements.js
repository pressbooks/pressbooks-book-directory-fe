module.exports = {
  'Excluding by ARR License and then apply clear all refinements button action' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(3000)
      .waitForElementVisible('.container__results-hits')
      .getText('css selector', '.container__results-hits',  (d) => {
        let text = d.value.split(' ');
        let shown = parseInt(text[2]);
        browser.click('#filter-networkName')
          .element('css selector', '#filter-networkName', (filterElement) => {
            // Firefox - Safari exception
            if (!filterElement.hasOwnProperty('ELEMENT')) {
              filterElement.ELEMENT = Object.values(filterElement.value)[0];
            }
            browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
              if (!button.value[0].hasOwnProperty('ELEMENT')) {
                button.value[0].ELEMENT = Object.values(button.value[0])[0];
              }
              browser.elementIdClick(button.value[0].ELEMENT,  () => {
                browser
                  .pause(2000)
                  .click('.ais-ClearRefinements-button')
                  .pause(3000)
                  .getText('css selector', '.container__results-hits',  (d) => {
                    let text2 = d.value.split(' ');
                    let shown2 = parseInt(text2[2]);
                    browser.assert.ok(shown === shown2, 'Books total is the same after clearing all filters');
                  }).end();
              });
            });
          });
      });
  }
};