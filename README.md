# Pressbook Directory (Front End)

## Environment variables setup
Create an .env.local file and add the following keys with their respective values:
VUE_APP_ALGOLIA_APP_ID=  
VUE_APP_ALGOLIA_API_READ_KEY=  
VUE_APP_ALGOLIA_INDEX=  

## Project setup
### Requirements
- node v.10.16.3 or higher
- npm v6.9.0 or higher

### Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
app will run in port 8080

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### Deployment
Deployment of this application is automatic once the dev or master branch is updated.
The pipeline uses AWS's CodePipeline to check periodically for changes in the github repository, 
build assets using `npm run build`, 
and puts the content in the 'dist' folder to the S3 bucket where it is hosted as a static website.

#### Environment Variables
All environment variables needed are set in the CodeBuild's environment variables.
To update an environment variable, go to the aws console in CodePipeline, select the pipeline, and
edit the 'Build' stage.

Then update the buildspec of the CodeBuild Project configuration in AWS.

ex: VUE_APP_ALGOLIA_APP_ID=${VUE_APP_ALGOLIA_APP_ID} NEW_ENV_VAR=${NEW_ENV_VAR_VALUE} npm run build

### SSL Certificates
SSL certificates use AWS's Certification Manager along with CloudFront
to ensure the application uses https. The certification is renewed automatically by AWS.

### Testing
We are using [Nightwatch](http://nightwatchjs.org/) with [BrowserStack](https://browserstack.com) for E2E testing, however you can use e2e tests locally as well.  
Tests are located in `e2e_tests/tests` folder.
#### Run E2E tests locally
**Note: [Java JDK >= 7](https://www.oracle.com/java/technologies/javase-downloads.html) is required.**

1. Be sure you have **HOST_TEST** environment variable stored correctly. For local environments, this is typically *http://localhost:8080*.
1. Tests run locally and on **Chrome** and **Firefox**. Make sure you have both browsers installed on your local machine.
1. The local server should already be running: `npm run serve` before tests are run locally.
1. Tests can be run locally with the following command:  `npm run e2e -- --env [Browser_OS]`. The *Browser_OS* args available are:
- firefox
- chrome

Example: `npm run e2e -- --env firefox`.  
You can run tests in multiple browsers with a single command with environments separated by commas: `npm run e2e:browserstack -- --env firefox,chrome`.

Additional browsers can be added to the `e2e_tests/conf/nightwatch.conf.js` file. Before adding a new browser you should install its corresponding driver: https://nightwatchjs.org/gettingstarted/installation/#install-webdriver.

n#### Run E2E tests on BrowserStack
Be sure you have **BROWSERSTACK_URL** (*in AWS Staging pipeline it runs on https://dev.pressbooks.directory*) and **BROWSERSTACK_ACCESS_KEY** environment variables defined correctly. Ask your teammates for BrowserStack access if you don't have it.  
In [App Live BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/) you should see build results in **nightwatch-test-build** build project.

Tests run on [Staging environment](https://staging.pressbooks.directory).  
Nightwatch / BrowserStack configurations are located in `e2e_tests/conf/browserstack.nightwatch.conf.js` file.

You can run tests with the following command:  `npm run e2e:browserstack -- --env [Browser_OS]`. The *Browser_OS* args available are:
- chrome_win10: It runs Google Chrome on Windows 10 OS
- chrome_mojave: It runs Google Chrome on OS X Mojave.
- firefox_win10: It runs Firefox on Windows 10 OS.
- firefox_mojave: It runs Firefox on OS X Mojave.

Example: `npm run e2e:browserstack -- --env chrome_catalina`.  
Or you could run in multiple browsers with a single command with environments separated by commas: `npm run e2e:browserstack -- --env chrome_catalina,firefox_win10,chrome_win10`.

You can add more Browsers / OS in `e2e_tests/conf/browserstack.nightwatch.conf.js` file in test_settings object using [this generator](https://www.browserstack.com/automate/capabilities).  
Optionally, you can specify / overwrite the current browsers version using the following environment variables:
- CHROME_W10_VERSION
- CHROME_MOJAVE_VERSION
- FIREFOX_W10_VERSION
- FIREFOX_MOJAVE_VERSION

**Note:** before running tests, make sure an `e2e_tests/log` folder exists for storing the BrowserStack test log. To create this folder run: `mkdir e2e_tests/log` in the root path.

#### See tests reports locally
If you run your tests on BrowserStack, you can see reports in [App Live BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/). 
In case you want to see reports locally, you can use [xunit-viewer](https://github.com/lukejpreston/xunit-viewer). After running tests locally, `npm run nightwatch:output` will generate an `e2e_tests/output/output.html` report file. This output file can be opened in any browser. When a test fails, screenshots containing more details about the failure can be found in the `e2e_tests/screenshots/` folder.

### Algolia configuration

The Pressbooks Directory app must be properly configured with an Algolia application and index. See details [here](https://docs.google.com/document/d/1SNf7jIelkXwzzAxEbGSjEL59GMDeh3o3wH7myY3LfBM/edit#).