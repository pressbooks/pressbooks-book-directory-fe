# Pressbooks Directory (Front End)

## Environment variables setup
Create an `.env.local` file using the `.env.example` file: `cp .env.example .env.local`  
and set the values for those variables for your local environments.

## Project setup

This Project is a Vue 3 vite project based on https://vitejs.dev/ is backwards compatible with Vue 2.

### Requirements

- Node.js version >=15.14.0.
- NPM version >=7.0.0

### Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```
app will run in port 3001

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/).
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

ex: VITE_APP_ALGOLIA_APP_ID=${VITE_APP_ALGOLIA_APP_ID} NEW_ENV_VAR=${NEW_ENV_VAR_VALUE} npm run build

### SSL Certificates
SSL certificates use AWS's Certification Manager along with CloudFront
to ensure the application uses https. The certification is renewed automatically by AWS.

### Testing
We are using [Cypress](https://www.cypress.io/) with [BrowserStack](https://browserstack.com) for E2E testing, however you can use e2e tests locally as well.  
Tests are located in `e2e/integration` folder.
#### Run E2E tests locally

1. You can run local tests on **Chrome**, **Firefox** and **Edge**. Make sure you have at least one of those browsers installed on your local machine.
1. We use `e2e_pressbooks_directory`, `e2e_pressbooks_sort_by_wordCount` and `e2e_pressbooks_directory_by_lastUpdated` Algolia indexes for run our tests.  
   Make sure you added those to your `.env` file:
   ```
   VITE_ALGOLIA_INDEX=e2e_pressbooks_directory
   VITE_ALGOLIA_INDEX_WORD_COUNT_REPLICA=e2e_pressbooks_sort_by_wordCount
   VITE_ALGOLIA_INDEX_LAST_UPDATED_REPLICA=e2e_pressbooks_directory_by_lastUpdated
   ```
1. The local server should already be running: `npm run dev` before tests are run locally.
1. Tests can be run locally with the following command:  `npm run test`. Cypress app will open, and you would choose in which browser do you want to run your tests
1. You can run E2E tests on headless mode by running: `npm run test:ci`
1. You also can run E2E tests on BrowserStack locally by running: `npm run test:stack` (make sure you have been defined `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` env variables. See next section for more details).

#### Run E2E tests on BrowserStack

Example: `npm run test:stack`.

Running only one spec file

Example: `npm run test:stack --specs=e2e/integration/pagination.spec.js`.

Make sure you declared your BrowserStack credentials in your `.env` file:
```
BROWSERSTACK_USERNAME=<YOUR BROWSERSTACK USERNAME>
BROWSERSTACK_ACCESS_KEY=<YOUR BROWSER STACK ACCESS KEY>
```
For more information see: https://www.browserstack.com/docs/automate/selenium/reset-access-key

All browser matrix is setup on: `browserstack.json`

#### See tests Reports
If you run your tests on BrowserStack, you can see reports in [App Live BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/). 

### Algolia configuration
All tests will run against `e2e_pressbooks_directory` index
The Pressbooks Directory app must be properly configured with an Algolia application and index. See details [here](https://docs.google.com/document/d/1SNf7jIelkXwzzAxEbGSjEL59GMDeh3o3wH7myY3LfBM/edit#).

### Google Analytics integration
In `public/index.html` file you can find the required script for Google Analytics.  
If `VUE_APP_GA_MEASUREMENT_ID` environment variable defined, the Google Analytics script will be added. 
In order to send data to google, only thing needed is to add the environment variable.

### Sentry Integration
You can track errors and monitor performance with Sentry by defining the [Sentry DSN](https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#dsn) in
`VITE_APP_SENTRY_DSN` environment variable. If this variable is defined, Sentry errors
and data performance will be sent to Sentry.  
Defining `VITE_APP_SENTRY_TRACE_RATE` you can set the [Trace Sample Rate](https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#tracesSampleRate) for tracing 
the application in Sentry. If it is not defined, then the default value will be 0.5.
The environment value for Sentry is defined in `VITE_APP_ENVIRONMENT`, if this value is not defined, the default 
value will be `development`.