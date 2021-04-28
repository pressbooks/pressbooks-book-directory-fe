# Pressbooks Directory (Front End)

## Environment variables setup
Create an .env.local file and add the following keys with their respective values:
VITE_ALGOLIA_APP_ID=  
VITE_APP_ALGOLIA_API_READ_KEY=  
VITE_APP_ALGOLIA_INDEX=  

## Project setup

This Project is a Vue 3 vite project based on https://vitejs.dev/ is backwards compatible with Vue 2.

### Requirements

- Node.js version >=12.0.0.

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

1. You can run local tests on **Chrome**, **Firefox** and **Edge**. Make sure you have both browsers installed on your local machine.
1. The local server should already be running: `npm run dev` before tests are run locally.
1. Tests can be run locally with the following command:  `npm run test`. Cypress app will open, and you would choose in which browser do you want to run your tests

#### Run E2E tests on BrowserStack

Example: `npm run test:stack`.

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