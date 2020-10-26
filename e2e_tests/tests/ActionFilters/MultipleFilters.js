module.exports = {
  'Apply include language filter and check results / quantities' (browser) {
    browser
      .url(process.env.HOST_TEST)
      .waitForElementVisible('body')
      .pause(3000)
      .getText('css selector', '.container__results-hits',  (d) => {
        let text = d.value.split(' ');
        let shown = parseInt(text[2]);
        browser.element('css selector', '#filter-languageName', (filterElement) => {
          // Firefox - Safari exception
          if (!filterElement.hasOwnProperty('ELEMENT')) {
            filterElement.ELEMENT = Object.values(filterElement.value)[0];
          }
          browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-list-item__content',  (content) => {
            if (!content.value[0].hasOwnProperty('ELEMENT')) {
              content.value[0].ELEMENT = Object.values(content.value[0])[0];
            }
            browser.elementIdText(content.value[0].ELEMENT,  (nn) => {
              let langName = nn.value.split(' (')[0];
              browser.elementIdElements(filterElement.ELEMENT, 'css selector', '.v-btn--icon',  (button) => {
                if (!button.value[0].hasOwnProperty('ELEMENT')) {
                  button.value[0].ELEMENT = Object.values(button.value[0])[0];
                }
                browser.elementIdClick(button.value[0].ELEMENT,  () => {
                  browser.pause(3000)
                    .click('.ais-ClearRefinements-button')
                    .pause(2000)
                    .getText('css selector', '.container__results-hits',  (d) => {
                      let text2 = d.value.split(' ');
                      let shown2 = parseInt(text2[2]);
                      browser.assert.ok(
                        shown === shown2,
                        'Book qty. keeps after filter by ' + langName + ' language: ' + shown
                      );
                    });
                });
              });
            });
          });
        });
      }).end();
  }
};