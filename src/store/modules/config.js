let config = {
    imagesPath: 'assets/images/',
    logo: 'pressbooks-logo.jpeg',
    twitterUrl: 'https://twitter.com/intent/follow?screen_name=pressbooks',
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
    canFilter: true
};

export default {
    state: config
};
