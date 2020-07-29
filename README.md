# Pressbook Directory (Front End)

## Environment variables setup
Create an .env.local file and add the following keys with it's respective values:
VUE_APP_ALGOLIA_APP_ID=  
VUE_APP_ALGOLIA_API_READ_KEY=  
VUE_APP_ALGOLIA_INDEX=  

## Project setup
### Requirements
- node v.10.16.3 or higher
- npm v6.9.0 or higher

### Install dependences
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

#### Environments Variables
All environment variables needed are set in the CodeBuild's environment variables.
To update an environment variable, go to the aws console in CodePipeline, select the pipeline, and
edit the 'Build' stage.

Then update the buildspec of the CodeBuild Project configuration in AWS.

ex: VUE_APP_ALGOLIA_APP_ID=${VUE_APP_ALGOLIA_APP_ID} NEW_ENV_VAR=${NEW_ENV_VAR_VALUE} npm run build

### SSL Certificates
SSL certificates uses AWS's Certification Manager along with CloudFront
to ensure the application uses https. The certification is renewed automatically by AWS.

### Testing
We are using [Nighwatch](http://nightwatchjs.org/) with [BrowserStack](https://browserstack.com) interactive cross 
browser for E2E testing, however you can use e2e tests locally as well.  
Tests are located in `e2e_tests/tests` folder. 
#### Run E2E tests locally
Be sure you have **HOST_TEST** environment variable correctly. Normally for local environment is *http://localhost:8080*.  
Those tests run locally and on **Chrome** and **Firefox**, make sure you have both browsers installed in you local machine.  
Before run your E2E tests locally, be sure you already have the local server running: `npm run serve`.

You can run tests locally with the following command:  `npm run e2e -- --env [Browser_OS]`. The *Browser_OS* args available are:  
- firefox
- chrome  

Example: `npm run e2e -- --env firefox`.  
Or you could run in multiple browsers with a single command with environments separated by commas: `npm run e2e:browserstack -- --env firefox,chrome`.

In order to add more Browsers you can add it in `e2e_tests/conf/nightwatch.conf.js` file. Before add a new browser you should install
its corresponding driver: https://nightwatchjs.org/gettingstarted/installation/#install-webdriver.

#### Run E2E tests on BrowserStack
Be sure you have **BROWSERSTACK_URL** and **BROWSERSTACK_ACCESS_KEY** environment variables correctly. Ask to your team mates for BrowserStack access if you don't have it.  
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

#### See tests reports locally
If you run your tests on BrowserStack, you can see reports in [App Live BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/). 
In case you want to see reports locally, you can use [xunit-viewer](https://github.com/lukejpreston/xunit-viewer). After you ran your tests locally, 
just run: `npm run nightwatch:output`, and a `e2e_tests/output/output.html` report file will be generated. You can open that file in any browser to see the report.  
When a test fails, you can see screenshots about the fail in `e2e_tests/screenshots/` folder.

### Vue references

Full demos code

```https://github.com/algolia/vue-instantsearch```

Working demos

```https://www.algolia.com/doc/guides/building-search-ui/resources/demos/vue```

