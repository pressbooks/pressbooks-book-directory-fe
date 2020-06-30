nightwatch_config = {
    src_folders: ["e2e_tests/tests"],
    selenium : {
        "start_process" : false,
        "host" : "hub-cloud.browserstack.com",
        "port" : 80
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
            output_folder: "./e2e_tests/output"
        },
        chrome_win10: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'Windows',
                'os_version': '10',
                'browser': 'Chrome',
                'browser_version': (process.env.CHROME_W10_VERSION) ? process.env.CHROME_W10_VERSION : '83.0',
                'resolution': '1280x960',
                log_path: './e2e_tests/log'
            },
            output_folder: "./e2e_tests/output"
        },
        chrome_catalina: {
            desiredCapabilities: {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'OS X',
                'os_version': 'Catalina',
                'browser': 'Chrome',
                'browser_version': (process.env.CHROME_CATALINA_VERSION) ? process.env.CHROME_CATALINA_VERSION :  '83.0',
                'resolution': '1280x960',
                log_path: './e2e_tests/log'
            },
            output_folder: "./e2e_tests/output"
        },
        firefox_win10: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'Windows',
                'os_version': '10',
                'browser': 'Firefox',
                'browser_version': (process.env.FIREFOX_W10_VERSION) ? process.env.FIREFOX_W10_VERSION : '77.0',
                'resolution': '1280x960',
                log_path: './e2e_tests/log'
            },
            output_folder: "./e2e_tests/output"
        },
        firefox_catalina: {
            desiredCapabilities : {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'OS X',
                'os_version': 'Catalina',
                'browser': 'Firefox',
                'browser_version': (process.env.FIREFOX_CATALINA_VERSION) ? process.env.FIREFOX_CATALINA_VERSION : '77.0',
                'resolution': '1280x960',
                log_path: './e2e_tests/log'
            },
            output_folder: "./e2e_tests/output"
        },
        safari_catalina: {
            desiredCapabilities: {
                'browserstack.user': process.env.BROWSERSTACK_USER,
                'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
                'os': 'OS X',
                'os_version': 'Catalina',
                'browser': 'Safari',
                'browser_version': (process.env.SAFARI_CATALINA_VERSION) ? process.env.SAFARI_CATALINA_VERSION : '13.0',
                'resolution': '1280x960',
                log_path: './e2e_tests/log'
            },
            output_folder: "./e2e_tests/output"
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