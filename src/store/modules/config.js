let config = {
  imagesPath: 'assets/images/',
  logo: 'pressbooks-logo.jpeg',
  urls: {
    guide: 'https://networkmanagerguide.pressbooks.com/chapter/how-to-use-the-pressbooks-directory',
    linkedin: 'https://www.linkedin.com/company/pressbooks',
    pressbooks: 'https://pressbooks.com',
    twitter: 'https://twitter.com/pressbooks',
    youtube: 'https://www.youtube.com/channel/UCyMeJ5C4p6AxF9QXg6Bgzjg',
    blog: 'https://pressbooks.com/blog',
    opensource: 'https://pressbooks.org',
    contact: 'https://pressbooks.com/contact-pressbooks/',
    jobs: 'https://pressbooks.com/about/#work-with-us',
    accessibility: 'https://pressbooks.com/accessibility/',
    procurement: 'https://pressbooks.com/edu-procurement-helpers/'
  },
  h5pLogo: 'h5p.png',
  basedOnImg: 'is-child.png',
  originalImg: 'is-base.png',
  defaultBookCover: 'default-book-cover.jpg',
  licenseIcons: {
    'cc-by-sa-(attribution-sharealike)': {
      image: 'by-sa.png',
      alt: 'Attribution - ShareAlike (SA)'
    },
    'cc-by-nd-(attribution-noderivatives)': {
      image: 'by-nd.png',
      alt: 'Attribution - No Derivative Work (ND)'
    },
    'cc-by-nc-sa-(attribution-noncommercial-sharealike)': {
      image: 'by-nc-sa.png',
      alt: 'Attribution - Non Commercial - ShareAlike'
    },
    'cc-by-nc-nd-(attribution-noncommercial-noderivatives)': {
      image: 'by-nc-nd.png',
      alt: 'Attribution - Noncommercial - NoDerivatives'
    },
    'cc-by-nc-(attribution-noncommercial)': {
      image: 'by-nc.png',
      alt: 'Attribution - Non Commercial (NC)'
    },
    'cc-by-(attribution)': {
      image: 'by.png',
      alt: 'Attribution Alone (BY)'
    },
    'all-rights-reserved': {
      image: 'allrights.png',
      alt: 'All Rights Reserved'
    },
    'cc0-(creative-commons-zero)': {
      image: '0.png',
      alt: 'Zero - Public Domain'
    },
    'public-domain': {
      image: 'public-domain.png',
      alt: 'Public Domain'
    }
  },
  canFilter: true,
  showTour: false
};

export default {
  state: config,
  mutations: {
    showTour(state) {
      state.showTour = !state.showTour;
    }
  }
};
