# Pressbooks Directory (Front End)
This Project is a Vue 3 vite project based on https://vitejs.dev/ and is backwards compatible with Vue 2.

## Requirements

- Node.js version >=16.0.0
- NPM version >=6.0.0 & <9.0.0

## Setup environment variables
Create an `.env.local` file using the `.env.example` file: `cp .env.example .env.local` and set appropriate values for those variables for your local environments.

## Customize configuration
See [Configuration Reference](https://vitejs.dev/).

## Install dependencies
```
npm install
```

## Compile and hot-reload for development
```
npm run dev
```
app will run in port 3001

## Compile and minify for production
```
npm run build
```

## Lint and fix files
```
npm run lint
```

## Deployment
Deployment of this application is automatic once the dev or master branch is updated. The pipeline uses AWS's CodePipeline to check periodically for changes in the GitHub repository, build assets using `npm run build`, and put the content in the 'dist' folder to the S3 bucket where it is hosted as a static website.

### Environment Variables
All environment variables needed are set in the CodeBuild's environment variables. To update an environment variable, go to the AWS console in CodePipeline, select the pipeline, and edit the 'Build' stage. Then update the buildspec of the CodeBuild Project configuration in AWS.

ex: VITE_APP_ALGOLIA_APP_ID=${VITE_APP_ALGOLIA_APP_ID} NEW_ENV_VAR=${NEW_ENV_VAR_VALUE} npm run build

### SSL Certificates
SSL certificates use AWS's Certification Manager along with CloudFront to ensure the application uses https. The certification is renewed automatically by AWS.

## Testing
We use [Cypress](https://www.cypress.io/) with [BrowserStack](https://browserstack.com) for E2E testing. Tests are located in `e2e/integration` folder. All tests will run against `e2e_pressbooks_directory` index. The Pressbooks Directory app must be properly configured with a working Algolia application and indices properly defined in the relevant environment variables.

### Run E2E tests on BrowserStack
Make sure to declare your BrowserStack credentials in your `.env` file:
```
BROWSERSTACK_USERNAME=<YOUR BROWSERSTACK USERNAME>
BROWSERSTACK_ACCESS_KEY=<YOUR BROWSER STACK ACCESS KEY>
```
For more information see: https://www.browserstack.com/docs/automate/selenium/reset-access-key

Example: `npm run test:stack`.

Running only one spec file

Example: `npm run test:stack --specs=e2e/integration/pagination.spec.js`.

The browser matrix can be configured locally in: `browserstack.json`

BrowserStack reports can be accessed in [App Live BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/).

### Run E2E tests locally
Tests can also be run locally as well using the instructions below:
1. You can run local tests on **Chrome**, **Firefox** and **Edge**. Make sure you have at least one of those browsers installed on your local machine.
1. Make sure that you have properly configured the Algolia indices to be used by your application. The Pressbooks internal team can find details [here](https://docs.google.com/document/d/1F82PSJKeufpKp8bGrDifjPxGo2x6tKD-HJpTsuadCeg/edit#heading=h.3j6ezaup0nca)
1. The local server should already be running: `npm run dev` before tests are run locally.
1. Tests can be run locally with the following command:  `npm run test`. Cypress app will open, and you would choose in which browser do you want to run your tests
1. You can run E2E tests on headless mode by running: `npm run test:ci`
1. You also can run E2E tests on BrowserStack locally by running: `npm run test:stack` (make sure you have been defined `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` env variables. See next section for more details).

## Google Analytics integration
The required script for Google Analytics can be found in `public/index.html`. To send Google Analytics information, you must define `VITE_APP_GA_MEASUREMENT_ID` environment variable with a working Google Analytics ID.

## Sentry Integration
You can track errors and monitor performance with Sentry by defining the [Sentry DSN](https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#dsn) in the `VITE_APP_SENTRY_DSN` environment variable. If this variable is defined, Sentry errors and data performance will be sent to Sentry.  
You can set the [Trace Sample Rate](https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#tracesSampleRate) by defining the `VITE_APP_SENTRY_TRACE_RATE` enviroment variable. If not defined, the default value will be 0.5.
You can define an environment value for Sentry through the `VITE_APP_ENVIRONMENT` environment variable. If not defined, the default value will be `development`.
