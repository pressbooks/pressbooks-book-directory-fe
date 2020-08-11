module.exports = {
    'Apply \'Pubic Domain\' license filter and check quantity of pages' (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-Public-Domain')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .waitForElementVisible('.ais-Pagination-list')
            .waitForElementVisible('.container__results-hits');
        browser.getText('css selector', '.container__results-hits',  (d) => {
            let text = d.value.split(' ');
            let shown = parseInt(text[2]);
            let totalPages = shown / 10;
            if (totalPages > 1) {
                if (totalPages > parseInt(totalPages)) {
                    totalPages = parseInt(totalPages) + 1;
                }
                browser.elements('css selector', '.ais-Pagination-link', function(elem) {
                    let pages = (elem.value.length / 2) - 4;
                    browser.assert.ok(totalPages === pages, 'Pages expected: ' + totalPages + '. Pages shown: ' + pages);
                });
            }
        });
    }
};