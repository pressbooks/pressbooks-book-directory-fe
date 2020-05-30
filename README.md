# pressbooks-book-directory-fe
Book directory Vue.JS frontend starter

## Environment variables setup

```
Create an .env.local file and add the following keys with it's respective values:

VUE_APP_ALGOLIA_APP_ID=
VUE_APP_ALGOLIA_API_READ_KEY=
VUE_APP_ALGOLIA_INDEX=
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

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

### Deployment
Deployment of this application is automatic once the dev or master branch is updated.
The pipeline uses AWS's CodePipeline to check periodically for changes, 
build assets using `npm run build`, 
and puts the content in the 'dist' folder to the S3 bucket where it is hosted as a static website.

### SSL Certificates
SSL certificates uses AWS's Certification Manager along with CloudFront
to ensure the application uses https. The certification is renewed automatically by AWS.


### Vue references

Full demos code

```https://github.com/algolia/vue-instantsearch```

Working demos

```https://www.algolia.com/doc/guides/building-search-ui/resources/demos/vue```
