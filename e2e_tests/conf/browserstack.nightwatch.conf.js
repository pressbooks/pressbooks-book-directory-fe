require('dotenv').config({path: '.env.local'});
process.env.HOST_TEST = process.env.BROWSERSTACK_URL;
nightwatch_config = {
    src_folders: ["e2e_tests/tests"],
    selenium: {
        start_process: false,
        host: "hub-cloud.browserstack.com",
        port: 443,
        log_path: './e2e_tests/log',
        output_folder: "./e2e_tests/output"
    },
    test_settings: {
        default: {
            launch_url: process.env.HOST_TEST,
            screenshots : {
                enabled : true,
                on_failure : true,
                on_error : false,
                path : "./e2e_tests/screenshots"
            },
            log_path: './e2e_tests/log',
            output_folder: "./e2e_tests/output",
            globals: {
                asyncHookTimeout: 20000
            }
        },
        chrome_win10: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'Windows',
                'os_version': '10',
                'browser': 'Chrome',
                'browser_version': (process.env.CHROME_W10_VERSION) ? process.env.CHROME_W10_VERSION : '83.0',
                'browserstack.selenium_version': (process.env.CHROME_W10_SELENIUM_VERSION) ? process.env.CHROME_W10_SELENIUM_VERSION : '3.14.0',
                'resolution': '1280x800'
            },
            webdriver: {
                log_path: './e2e_tests/log'
            },
            log_path: './e2e_tests/log',
            output_folder: "./e2e_tests/output",
            globals: {
                asyncHookTimeout: 20000
            }
        },
        chrome_mojave: {
            desiredCapabilities: {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'OS X',
                'os_version': 'Mojave',
                'browser': 'Chrome',
                'browser_version': (process.env.CHROME_MOJAVE_VERSION) ? process.env.CHROME_MOJAVE_VERSION :  '83.0',
                'browserstack.selenium_version': (process.env.CHROME_MOJAVE_SELENIUM_VERSION) ? process.env.CHROME_MOJAVE_SELENIUM_VERSION : '3.14.0',
                'resolution': '1280x960'
            },
            webdriver: {
                log_path: './e2e_tests/log'
            },
            log_path: './e2e_tests/log',
            output_folder: "./e2e_tests/output",
            globals: {
                asyncHookTimeout: 20000
            }
        },
        firefox_win10: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'Windows',
                'os_version': '10',
                'browser': 'Firefox',
                'browser_version': (process.env.FIREFOX_W10_VERSION) ? process.env.FIREFOX_W10_VERSION : '77.0',
                'browserstack.selenium_version': (process.env.FIREFOX_W10_SELENIUM_VERSION) ? process.env.FIREFOX_W10_SELENIUM_VERSION : '3.10.0',
                'resolution': '1280x800'
            },
            webdriver: {
                log_path: './e2e_tests/log'
            },
            log_path: './e2e_tests/log',
            output_folder: "./e2e_tests/output",
            globals: {
                asyncHookTimeout: 20000
            }
        },
        firefox_mojave: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'OS X',
                'os_version': 'Mojave',
                'browser': 'Firefox',
                'browser_version': (process.env.FIREFOX_MOJAVE_VERSION) ? process.env.FIREFOX_MOJAVE_VERSION : '77.0',
                'browserstack.selenium_version': (process.env.FIREFOX_MOJAVE_SELENIUM_VERSION) ? process.env.FIREFOX_MOJAVE_SELENIUM_VERSION : '3.14.0',
                'resolution': '1280x960'
            },
            webdriver: {
                log_path: './e2e_tests/log'
            },
            log_path: './e2e_tests/log',
            output_folder: "./e2e_tests/output",
            globals: {
                asyncHookTimeout: 20000
            }
        }
    }
};

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;