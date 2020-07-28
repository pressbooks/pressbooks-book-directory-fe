module.exports = {
    "Apply 'Pubic Domain' license filter and test pagination": function (browser) {
        browser
            .url(process.env.HOST_TEST)
            .waitForElementVisible('body')
            .assert.visible('#filter-license_code')
            .click('#btn-include-license_code-Public-Domain')
            .waitForElementVisible('.v-chip--clickable')
            .pause(2000)
            .waitForElementVisible('.ais-Pagination-list')
            .waitForElementVisible('.container__results-hits');
        browser.getText('css selector', '.container__results-hits', function (d) {
            let text = d.split(' ');
            let shown = parseInt(text[2]), currentPage = 1;
            let totalPages = shown / 10;
            if (totalPages > 1) {
                if ((parseInt(totalPages) - totalPages) > 0) {
                    totalPages = parseInt(totalPages) + 1;
                }
                let totalShowing = 10;
                browser.elements('css selector', '.ais-Hits__books__container', function(bookElement) {
                    let inThisPage = bookElement.value.length;
                    while (totalShowing < shown) {
                        totalShowing += 10;
                        browser.elements('css selector', '.ais-Hits__books__container', function(bookElement) {
                            
                        });
                        browser.click('')
                    }
                });
            }
        });
    }
};